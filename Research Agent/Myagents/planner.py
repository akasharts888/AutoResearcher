from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

GROQ_MODEL = os.getenv("GROQ_MODEL")
GROQ_API = os.getenv("GROQ_API_KEY")
llm = ChatGroq(api_key=GROQ_API,model=GROQ_MODEL)

template = PromptTemplate.from_template(
    "You are a research planner.\n"
    "Your task is to return exactly 3 concise research objectives for the topic: '{topic}'.\n"
    "Do not include any introductory or closing text. Only return the 3 objectives, each on a new line, with no numbering or bullet points.\n"
    "Output format:\n"
    "Objective 1\n"
    "Objective 2\n"
    "Objective 3"
)


def planner_node(input):
    topic = input["topic"]
    prompt = template.format(topic=topic)
    response = llm.invoke(prompt)
    raw_text = response.content.strip()

    # Split and clean objectives
    lines = [line.strip("•-123. ") for line in raw_text.split("\n") if line.strip()]

    objectives = lines[:3]
    return {"objectives": objectives}
