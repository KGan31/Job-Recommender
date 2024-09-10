import ast
import pandas as pd
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity

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

def suggest_queries():
    pass
    # TO DO