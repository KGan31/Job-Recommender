from flask import Flask, request, jsonify, send_file, Response
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from flask_cors import CORS
import json
import hashlib
from bson import json_util

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

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
    user_details = json.loads(request.get_json())
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
        'skills': user_details["skills"],
        'work_ex': user_details["work_ex"],
        'projects': user_details["projects"],
    }
    
    db.Users.insert_one(new_user)
    response = app.response_class(
        response=json.dumps({"message": "Registered successfully"}),
        status=200,
        mimetype='application/json'
    )
    return response
    
@app.route('/api/login', methods=["POST"])
def login():
    user_details = json.loads(request.get_json())
    
    if not user_details["email"] or not user_details["password"]:
        return Response(json.dumps({'message': 'Username and password are required'}),status=400)
    
    user = db.Users.find_one({'email': user_details["email"]})
    
    if user and hashlib.sha256(user_details["password"].encode('utf-8')).hexdigest() == user["password"]:
        response = app.response_class(
            response=json.dumps(json.dumps({'message': 'Login successful'})),
            status=200,
            mimetype='application/json'
        )
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

if __name__ == '__main__':
    app.run(debug=True)