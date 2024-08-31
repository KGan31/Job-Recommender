from flask import Flask, request, jsonify, send_file, Response
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from flask_cors import CORS, cross_origin
import json
import hashlib
from bson import json_util
# from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required -- later
from flask import session

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
    jobs = db.Jobs.find({})
    return json.loads(json_util.dumps(jobs))

@app.route('/api/profile/<string:email>', methods=["GET"])
def get_user_profile(email):
    # Query the database for the user with the specified email
    user = db.Users.find_one({"email": email}, {"_id": 0, "password": 0})  # Exclude sensitive data like password

    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/api/save-profile', methods=["POST"])
def add_user_skills():
    profile_info = json.loads(request.get_data())
    print(profile_info)
    global id
    print(id)
    db.Users.update_one({"email": id}, {"$set":{"skills": profile_info['skills']['skills'].split(","), "work_ex": profile_info['work_ex'],"projects":profile_info['projects']}})
    
    response = app.response_class(
        response=json.dumps({"message": "Skills added"}),
        status=200,
        mimetype='application/json'
    )
    return response
if __name__ == '__main__':
    app.run(debug=True)