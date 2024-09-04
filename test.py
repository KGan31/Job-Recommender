from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import json
from bson import json_util

from pprint import pprint

uri = "mongodb+srv://vedantnimjed:fRycEHrkwwWDlrQM@cluster0.jmmjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(e)
    
db = client.job_recommend

jobs = json.loads(json_util.dumps(db.Jobs.find({})))

# ()


def sorter(job):
    try:
        # pprint(job)
        return len(set(job["skills_req"]).intersection(set(user_skills)))
    except:
        return 0
    
user_skills = db.Users.find_one({"_id": ObjectId('66d2b636202af6a28ddc2d5a')})['skills']

pprint(user_skills)
# pprint([job["skills_req"] for job in jobs])

jobs.sort(key=sorter, reverse=True)

pprint([job["skills_req"] for job in jobs])