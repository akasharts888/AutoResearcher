from dotenv import load_dotenv
import os
from typing import List
from pinecone import Pinecone,ServerlessSpec
from pymongo import MongoClient
from uuid import uuid4
# from sentence_transformers import SentenceTransformer
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

class HybridMemoryManager:
    def __init__(self):
        self.mongo = MongoClient("mongodb://localhost:27017/")
        self.db = self.mongo["research_agentic_db"]
        self.collection = self.db["research_memory"]

        # Embedding model
        self.model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

        pinecone_api_key = os.getenv("PineCone_API")
        pinecone_environment = os.getenv("PINECONE_ENVIRONMENT")
        index_name = os.getenv("PINECONE_INDEX_NAME")

        pc = Pinecone(api_key=pinecone_api_key)

        if index_name not in pc.list_indexes().names():
            pc.create_index(
                name=index_name,
                dimension=384,
                metric='cosine',
                spec=ServerlessSpec(
                    cloud='aws',
                    region=pinecone_environment
                )
            )
        self.pinecone_index = pc.Index(index_name)
    
    def embed_text(self,text:str) -> List[float]:
        return self.model.embed_query(text)
    
    def check_similiarity(self, query:str,threshold:float = 0.75):
        vector = self.embed_text(query)
        results = self.pinecone_index.query(vector=vector,top_k=3,include_metadata=True)

        # print(f"matches: {results['matches']}")
        for match in results["matches"]:
            # print(f"match score : {match['score']}")
            if match["score"]>threshold:
                return match["metadata"]
        return None
        
    def store_result(self,query:str, summary:str,metadata:dict):
        vector = self.embed_text(query)
        uid = str(uuid4())

        self.pinecone_index.upsert([
            {
                "id":uid,
                "values":vector,
                "metadata":{"query":query,"summary":summary}
            }
        ])
        
        self.collection.insert_one({
            "query":query,
            "summary":summary,
            "embedding_id":uid,
            **metadata
        })