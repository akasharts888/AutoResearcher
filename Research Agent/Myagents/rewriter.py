from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model=os.getenv("GROQ_MODEL")
)

rewrite_prompt = PromptTemplate.from_template(
    "You are a helpful rewriting assistant.\n"
    "Here is a flawed summary:\n\n{summary}\n\n"
    "Here is a critique of the summary:\n\n{review}\n\n"
    "Please rewrite the summary to address the weaknesses and suggestions."
)

def rewriter_node(state: dict) -> dict:
    prompt = rewrite_prompt.format(
        summary=state["summary"],
        review=state["review"]
    )
    new_summary = llm.invoke(prompt).content.strip()
    state["summary"] = new_summary
    state["iteration"] += 1
    return state
