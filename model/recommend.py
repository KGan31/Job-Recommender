import ast
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity

def clean_texts(text):
    """
    Ensure all texts are strings and handle missing values.
    """
    if (text == None or text == pd.isna(text)):
        return ""
    
    return str(text)

def get_similarity(model, aspiration, course_embeddings):
    """
    Calculates the cosine similarity between a prompt and courses
    """
    prompt_embedding = model.encode(aspiration, convert_to_tensor=True)
    similarity_scores = cosine_similarity([prompt_embedding], course_embeddings).flatten()
    return similarity_scores

def recommend_courses(user_aspiration, model, df):
    """
    Recommends the top 5 courses based on the user's aspiration.
    """
    embeddings = df["embeddings"].apply(lambda x: ast.literal_eval(x) if pd.notna(x) else []).tolist()
    similarity_scores = get_similarity(model, user_aspiration, embeddings)
    df["Similarity Score"] = similarity_scores

    # Sort by similarity score and course rating
    df_sorted = df.sort_values(by=["Similarity Score", "Course Rating"], ascending=[False, False])

    # Initialize the set to keep track of recommended courses
    courses = set()
    recommendations = []

    # Iterate over the sorted DataFrame and collect recommendations
    for index, row in df_sorted.iterrows():
        query_str = row['Course Name'] + row['University / Industry Partner Name']
        
        if query_str not in courses:
            recommendations.append({
                'Course Name': row['Course Name'],
                'University': row['University / Industry Partner Name'],
                'URL': row['Course URL']
            })
            courses.add(query_str)

        # Stop once we have collected 5 recommendations
        if len(recommendations) >= 5:
            break
    
    return recommendations

# Uncomment the below lines for standalone model
# model = SentenceTransformer('distilbert-base-nli-stsb-mean-tokens')
# df = pd.read_csv("../assets/data/modified_courses.csv")

# user_aspiration = "I want to learn history about religion"
# recommended_courses = recommend_courses(user_aspiration, model, df)

# for course in recommended_courses:
#     print(f"'{course['Course Name']}' by '{course['University']}'")
#     # We also get URLs here, but not printing them

def suggest_queries(curr_query, prev_queries, model):
    """
    Suggests top 3 previous queries similar to the current query based on cosine similarity.
    
    Parameters:
    - curr_query (dict): Dictionary containing 'title' and 'description' for the current query.
    - prev_queries (list of dicts): List of previous queries, each containing 'title' and 'description'.
    - model: The model used for encoding the text.

    Returns:
    - list of dicts: Top 3 previous queries with highest similarity scores.
    """
    # Clean and encode current query
    curr_title = clean_texts(curr_query["title"])
    curr_description = clean_texts(curr_query["description"])
    curr_embeddings = model.encode(curr_title + curr_description).reshape(1, -1)
    
    similarity_scores = []
    prev_embeddings_list = []
    
    # Clean, encode previous queries, and compute similarity
    for prev_query in prev_queries:
        prev_title = clean_texts(prev_query["title"])
        prev_description = clean_texts(prev_query["description"])
        prev_content = prev_title + prev_description
        prev_embeddings = model.encode(prev_content)
        prev_embeddings_list.append(prev_embeddings)
        
    prev_embeddings_array = np.array(prev_embeddings_list)
    similarity_scores = cosine_similarity(curr_embeddings, prev_embeddings_array).flatten()
    
    # Get indices of top 3 highest similarity scores
    top_indices = np.argsort(similarity_scores)[-3:][::-1]
    
    # Retrieve top 3 queries
    top_queries = [prev_queries[i] for i in top_indices]
    
    return top_queries

# model = SentenceTransformer('distilbert-base-nli-stsb-mean-tokens')

# curr_query = {
#     "title": "Doubt in memory management",
#     "description": "What is segmentation in Operating systems?"
# }

# prev_queries = [
#     {
#         "title": "Paging conceptual doubt",
#         "description": "I do not understand the concept of paging in linux operating systems."
#     },
#     {
#         "title": "Data Analyst pathway",
#         "description": "Could anyone help me in becoming a data analyst?"
#     },
#     {
#         "title": "How to center a button in webpage",
#         "description": "Facing issue in designing and implementing user interfaces."
#     },
#     {
#         "title": "Deep Learning vs Machine Learning",
#         "description": "What are the key differences between deep learning and machine learning?"
#     },
#     {
#         "title": "What is an operating system?",
#         "description": "Seeking a basic understanding of what constitutes an operating system."
#     },
#     {
#         "title": "Understanding CPU vs GPU",
#         "description": "What are the differences and use cases of CPU and GPU?"
#     },
#     {
#         "title": "Software Development Lifecycle",
#         "description": "Can someone explain the phases of the software development lifecycle?"
#     },
#     {
#         "title": "Database normalization",
#         "description": "How does database normalization improve the database design?"
#     },
#     {
#         "title": "Understanding APIs",
#         "description": "What are APIs and how are they used in software development?"
#     }
# ]

# top_queries = suggest_queries(curr_query, prev_queries, model)

# for i, query in enumerate(top_queries):
#     print(f"Top Query {i + 1}:")
#     print(f"Title: {query['title']}")
#     print(f"Description: {query['description']}")
#     print()