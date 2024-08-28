
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from pprint import pprint

uri = "mongodb+srv://vedantnimjed:fRycEHrkwwWDlrQM@cluster0.jmmjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    
except Exception as e:
    print(e)
    
db = client['job_recommend']

# new_user = {
#     'email': 'johndoe@kmail.com',
#     'name':'John Doe',
#     'password': 'johnisok',
#     'skills': ['C', 'C++', 'Python', 'React.js', 'Node.js', 'PyTorch'],
#     'work_ex': [
#         {
#             'title': 'SDE Intern',
#             'company': 'Spirit systems',
#             'from': datetime.strptime('Mar 1 2024', '%b %d %Y'),
#             'to': datetime.strptime('May 30 2024', '%b %d %Y'),
#             'description': "Added support for using mongodb atlas clusters"
#         },
#     ],
#     'projects': [
#         {
#             'title': 'E-Comm website',
#             'from': datetime.strptime('Mar 1 2024', '%b %d %Y'),
#             'to': datetime.strptime('May 30 2024', '%b %d %Y'),
#             'description': "Created MERN stack based E commerce website"
#         },
#     ]
# }

new_user = {
    'email': 'janedoe@kmail.com',
    'name':'Jane Doe',
    'password': 'jane@123',
    'skills': ['Python', 'React.js', 'Node.js'],
    'work_ex': [
        {
            'title': 'SDE Intern',
            'company': 'Karma',
            'from': datetime.strptime('Mar 1 2024', '%b %d %Y'),
            'to': datetime.strptime('May 30 2024', '%b %d %Y'),
            'description': "Refactored UI to React.js"
        },
    ],
}

# db.Users.insert_one(new_user)

# data = db.Users.find({})

new_job = {
    'job_ref_id': 'R4098110',
    'title': 'SDE - I',
    'company': 'Zeta',
    'skills_req': ['C++', 'Next.js', 'Node.js', 'TailwindCSS'],
    'years_of_exp_min': 2,
    'cgpa_min': 6.75,
    'location': 'Mumbai, India',
    'annual_salary': '10LPA',
    'hiring_link': 'https://jobs.lever.co/zeta/8ffbeadb-6d01-47f9-bc78-d87b44a29d61/apply?source=LinkedIn',
    'Description': """About Zeta

Zeta is a Next-Gen Banking Tech company that empowers banks and fintechs to launch banking products for the future. It was founded by Bhavin Turakhia and Ramki Gaddipati in 2015.

Our flagship processing platform - Zeta Tachyon - is the industry’s first modern, cloud-native, and fully API-enabled stack that brings together issuance, processing, lending, core banking, fraud & risk, and many more capabilities as a single-vendor stack. 20M+ cards have been issued on our platform globally.

Zeta is actively working with the largest Banks and Fintechs in multiple global markets transforming customer experience for multi-million card portfolios.

Zeta has over 1700+ employees - with over 70% roles in R&D - across locations in the US , EMEA , and Asia . We raised $280 million at a $1.5 billion valuation from Softbank, Mastercard, and other investors in 2021.

Learn more @ www.zeta.tech , careers.zeta.tech , Linkedin , Twitter

About The Role

Looking for a creative coding enthusiast, Imagine a role where your passion for programming and design collide to shape captivating user experiences across platforms. Welcome to Zeta, where innovation meets creativity, and we're seeking a Frontend Developer to be the driving force behind our digital dreams.

Responsibilities

Design Sensibility: Demonstrated awareness of various product design, functional design, and usability factors in the development process.
Visual Proficiency: Well-versed in the nuances of visuals, typography, and fonts to create visually appealing interfaces.
Cross-Browser Compatibility: A pro at ensuring cross-browser compatibility for a consistent user experience.

Skills

Strong command: JavaScript
Experience in working React JS / Vue JS 
Proficiency: HTML5 and CSS3 for modern and responsive designs. 
Experience handling: UI integration with REST APIs, showcasing your ability to connect frontend with backend seamlessly.

Experience And Qualifications

2-4 years of hands-on experience in front-end development.
Passion for Programming.
If you love turning code into creative solutions and enjoy programming challenges.

Equal Opportunity

Zeta is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We encourage applicants from all backgrounds, cultures, and communities to apply and believe that a diverse workforce is key to our success"""
}

db.Jobs.insert_one(new_job)

data = db.Jobs.find({})

for doc in data:
    print(pprint(doc))

