# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# uri = "mongodb+srv://root:jobrecommender123@cluster0.t50zc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))
# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi

# Use a .env file or environment variable for sensitive information in a real application
USERNAME = "root"
PASSWORD = "jobrecommender123"
CLUSTER = "cluster0.t50zc.mongodb.net"

# Construct the connection string
uri = f"mongodb+srv://{USERNAME}:{PASSWORD}@{CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    
    # If you want to access a specific database
    db = client.get_database('test')
    
    # Example: List all collections in the database
    collections = db.list_collection_names()
    print("Collections in the database:", collections)

    new_user = {
            'username': 'username',
            'fname':'fname',
            'lname':'lname',
            'password': ''
        }
    db.users.insert_one(new_user)

except Exception as e:
    print("An error occurred:", e)

finally:
    # Always close the connection
    client.close()

