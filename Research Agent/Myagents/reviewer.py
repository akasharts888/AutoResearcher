from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os
from memory.hybrid_memory import HybridMemoryManager


load_dotenv()

GROQ_MODEL = os.getenv("GROQ_MODEL")
GROQ_API = os.getenv("GROQ_API_KEY")
llm = ChatGroq(api_key=GROQ_API,model=GROQ_MODEL)

memory_manager = HybridMemoryManager()

critic_template = PromptTemplate.from_template(
    "You are a research reviewer.\n"
    "Review the following summary critically:\n\n{summary}\n\n"
    "Give your response in the following format:\n"
    "Strengths:\n- ...\n\nWeaknesses:\n- ...\n\nSuggestions:\n- ..."
)

def critic_node(state: dict) -> dict:
    summary = state["summary"]
    # print("This is the summary we get :: ",summary)
    prompt = critic_template.format(summary=summary)
    review = llm.invoke(prompt).content.strip()

    # Mark as satisfactory if no suggestions found
    is_satisfactory = "suggest" not in review.lower() and "improve" not in review.lower()
    
    is_final_iteration = state["iteration"] >= 2
    
    if (is_satisfactory or is_final_iteration) and not state.get("reused", False):
        metadata = {
            "objectives": state.get("objectives", []),
            "user_id": state["user_id"],
            "user_name": state["user_name"],
            "sources": state["research_results"]
        }
        memory_manager.store_result(
            query=state["topic"],
            summary=summary,
            metadata=metadata
        )
    return {
        **state,
        "review": review,
        "is_satisfactory": is_satisfactory
    }