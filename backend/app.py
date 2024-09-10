import os
import sys
import json
import hashlib
import pandas as pd
import google.generativeai as genai
from flask import session
from bson import json_util
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify, send_file, Response
from sentence_transformers import SentenceTransformer, util

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# Importing models
from model.recommend import recommend_courses, suggest_queries

aspiration_model = SentenceTransformer('distilbert-base-nli-stsb-mean-tokens')
df = pd.read_csv("../assets/data/modified_courses.csv")

GEMINI_API_KEY = 'AIzaSyD7c4ZO6Y91WpU7VxOrjtejItUTrmYxScM'
# GOOGLE_GEMINI_ENDPOINT = 'https://gemini.googleapis.com/v1beta/'
genai.configure(api_key=GEMINI_API_KEY)
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

id = ""

app = Flask(__name__)

app.secret_key = b'0392d5f96b458978e5597c44daaa3817bc0124424e2eab1e9024e182bade4b28'
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

cors = CORS(app, resources={r"/*": {"origins": "http://localhost/*"}})

uri = "mongodb+srv://vedantnimjed:fRycEHrkwwWDlrQM@cluster0.jmmjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(e)
    
db = client.job_recommend
    
@app.route('/api/register', methods=["POST"])
def register():
    json_string = request.get_data(as_text=True)
    user_details = json.loads(json_string)
    print(user_details["email"])
    
    if db.Users.find_one({'email': user_details["email"]}):
        res = {'message': 'Username already exists'}
        response = app.response_class(
            response=json.dumps(res),
            status=400,
            mimetype='application/json'
        )
        return response
    
    new_user = {
        'email': user_details["email"],
        'name': user_details["name"],
        'password': hashlib.sha256(user_details["password"].encode('utf-8')).hexdigest(),
        'skills': user_details["skills"] if "skills" in user_details else [],
        'work_ex': user_details["work_ex"] if "work_ex" in user_details else [],
        'projects': user_details["projects"] if "projects" in user_details else [],
    }
    
    _id = db.Users.insert_one(new_user)
    # session['id'] = _id.inserted_id
    
    response = app.response_class(
        response=json.dumps({"message": "Registered successfully"}),
        status=200,
        mimetype='application/json'
    )
    return response
    
@app.route('/api/login', methods=["POST"])
def login():
    user_details = json.loads(request.get_data())
    print(user_details)
    
    if not user_details["email"] or not user_details["password"]:
        return Response(json.dumps({'message': 'Username and password are required'}),status=400)
    
    user = db.Users.find_one({'email': user_details["email"]})
    
    if user and hashlib.sha256(user_details["password"].encode('utf-8')).hexdigest() == user["password"]:
        response = app.response_class(
            response=json.dumps(json.dumps({'message': 'Login successful'})),
            status=200,
            mimetype='application/json'
        )
        # session['id'] = str(user["_id"])
        # print(session['id'])
        global id
        id = user["email"]
        print(id)
        return response
    else:
        # return Response(, status=400) 
        response = app.response_class(
            response=json.dumps({'message': 'Incorrect user name or password'}),
            status=400,
            mimetype='application/json'
        )
        return response
    
@app.route('/api/jobs', methods=["GET"])
def list_jobs():
    jobs = json.loads(json_util.dumps(db.Jobs.find({})))
    
    def sorter(job):
        try:
            # pprint(job)
            return len(set(job["skills_req"]).intersection(set(user_skills)))
        except:
            return 0
    
    user_skills = db.Users.find_one({"email": id})["skills"]
    
    jobs.sort(key=sorter, reverse=True)
    
    print(user_skills)
    print([job["skills_req"] for job in jobs])
    
    return jsonify({"jobs": jobs, "user_skills": user_skills})

@app.route('/api/profile/<string:email>', methods=["GET"])
def get_user_profile(email):
    # Query the database for the user with the specified email
    user = db.Users.find_one({"email": email})  # Exclude sensitive data like password

    if user:
        return json.loads(json_util.dumps(user)), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/api/save-profile', methods=["POST"])
def add_user_skills():
    profile_info = json.loads(request.get_data())
    print(profile_info)
    global id
    print(id)
    
    project_descriptions = [proj.get('description', '') for proj in profile_info['projects']]
    work_descriptions = [work.get('description', '') for work in profile_info['work_ex']]
    combined_data = "Projects: " + " ".join(project_descriptions) + " Work Experience: " + " ".join(work_descriptions)
    prompt = combined_data + " " + "\n" + "Give a list of core skills used in these projects. Do not go overboard with it. Output in format like {skills: [python, cpp]}"
    response = model.generate_content(prompt)
    res = json.loads(response.text)
    skills =  list(set(profile_info['skills']['skills'].split(",") + res['skills']))
    print(skills)
    
    db.Users.update_one({"email": id}, {"$set":{"skills": skills, "work_ex": profile_info['work_ex'],"projects":profile_info['projects']}})
    
    response = app.response_class(
        response=json.dumps({"message": "Skills added"}),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/api/recommend-course', methods=["GET"])
def getCourses():
    skills = request.args.getlist('skills')
    res = []

    for s in skills:
        c = db.Courses.find({"skill": s.lower()})
        res.append(json.loads(json_util.dumps(c)))

    print(res)

    response = app.response_class(
        response=json.dumps({"recommendation": res}),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/api/aspirations', methods=["POST"])
def get_courses_from_aspirations():
    user_aspiration = json.loads(request.get_data())['aspiration']

    # Get recommendations
    recommended_courses = recommend_courses(user_aspiration, aspiration_model, df)

    # Print recommendations
    return jsonify({"courses": recommended_courses})

@app.route('/api/similar-questions', methods=["POST"])
def get_similar_questions():
    pass
    # TO DO


if __name__ == '__main__':
    app.run(debug=True)