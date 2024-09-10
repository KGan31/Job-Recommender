# This script precomputes the embeddings of all the courses based on their title and description. This allows us to easily recommend courses, which earler took almost 1.5 minutes.

import pandas as pd
from sentence_transformers import SentenceTransformer

def clean_texts(texts):
    """
    Ensure all texts are strings and handle missing values.
    """
    return [str(text) if text is not None and not pd.isna(text) else '' for text in texts]

def get_embeddings(model, texts):
    """
    Compute embeddings for a list of texts.
    """
    return model.encode(texts, convert_to_tensor=True, show_progress_bar=True)

def precompute_embeddings(model, df):
    df["Course Name"] = clean_texts(df["Course Name"].tolist())
    df["Course Description"] = clean_texts(df["Course Description"].tolist())
    
    df = df.drop_duplicates().reset_index(drop=True)

    course_names = df["Course Name"].tolist()
    course_descriptions = df["Course Description"].tolist()
    
    # Computing embeddings for course names and descriptions
    course_name_embeddings = get_embeddings(model, course_names)
    course_description_embeddings = get_embeddings(model, course_descriptions)
    
    # We consider the average of embeddings of course names and descriptions
    embeddings = 0.25*course_name_embeddings + 0.75*course_description_embeddings

    embeddings_list = [embedding.cpu().tolist() for embedding in embeddings]
    df["embeddings"] = embeddings_list
    
    df.to_csv("../data/modified_courses.csv", index=False)

# Load the model and data
model = SentenceTransformer('distilbert-base-nli-stsb-mean-tokens')
df = pd.read_csv("../data/courses.csv")

# Precompute embeddings
precompute_embeddings(model, df)
