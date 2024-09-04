import pandas as pd
from sentence_transformers import SentenceTransformer, util

def get_similarity(model, prompt, essays):
    """
    Calculates the cosine similarity between a prompt and multiple essays using a pre-trained sentence transformer model.

    Args:
    - model (SentenceTransformer): The pre-trained sentence transformer model.
    - prompt (str): The prompt text.
    - essays (list of str): The list of essay texts.

    Returns:
    - list of float: The cosine similarity scores for each essay.
    """
    prompt_embedding = model.encode(prompt, convert_to_tensor=True)
    essay_embeddings = model.encode(essays, convert_to_tensor=True)

    similarity_scores = util.pytorch_cos_sim(prompt_embedding, essay_embeddings).cpu().numpy().flatten()

    return similarity_scores

def recommend_courses(user_aspiration, model, df):
    """
    Recommends the top 5 courses based on the user's aspiration.

    Args:
    - user_aspiration (str): The user's aspiration text.
    - model (SentenceTransformer): The pre-trained sentence transformer model.
    - df (pd.DataFrame): DataFrame containing course data.

    Returns:
    - list of dict: List of dictionaries containing course name, university, and URL.
    """
    # Drop the 'Course Description' column and remove duplicates
    df = df.drop(columns=["Course Description"])
    df = df.drop_duplicates()

    # Get similarity scores for all course names
    similarity_scores = get_similarity(model, user_aspiration, df["Course Name"].tolist())

    # Add similarity scores to the DataFrame
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

# Load the model once
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Load data
df = pd.read_csv("../assets/data/courses.csv")

# Example user aspiration
user_aspiration = "I want to learn communication skills"

# Get recommendations
recommended_courses = recommend_courses(user_aspiration, model, df)

# Print recommendations
for course in recommended_courses:
    print(f"'{course['Course Name']}' by '{course['University']}'")
    # We also get URLs here, but not printing them
