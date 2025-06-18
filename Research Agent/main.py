from typing import TypedDict, List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langgraph.graph import StateGraph
from Myagents.planner import planner_node
from Myagents.researcher import researcher_node
from Myagents.summarizer import summarizer_node
from Myagents.reviewer import critic_node
from Myagents.memory_checker import memory_checker_node
from Myagents.rewriter import rewriter_node
import uvicorn

app = FastAPI()

# Define state schema using TypedDict
class ResearchState(TypedDict):
    topic: str
    objectives: List[str]
    research_results: List[str]
    summary: str
    review: str
    reused: bool
    iteration: int
    user_id:str
    user_name:str
    sources:str
    is_satisfactory: bool

# Create the graph
graph = StateGraph(ResearchState)

# Add nodes
graph.add_node("planner", planner_node)
graph.add_node("memory_checker", memory_checker_node)
graph.add_node("researcher", researcher_node)
graph.add_node("summarizer", summarizer_node)
graph.add_node("reviewer", critic_node)
graph.add_node("rewriter", rewriter_node)

# Edges 
graph.set_entry_point("planner")
graph.add_edge("planner", "memory_checker")

# Self-reflection condition
def self_reflection_condition(state):
    if state["is_satisfactory"]:
        return "end"
    print("iteration number is :",state["iteration"])
    if state["iteration"] >= 2:
        print("Max iterations reached.")
        return "end"
    return "rewriter"

def branch_condition(state):
    return "reviewer" if state.get("reused") else "researcher"

graph.add_conditional_edges("memory_checker",branch_condition)
graph.add_edge("researcher","summarizer")
graph.add_edge("summarizer","reviewer")
graph.add_conditional_edges("reviewer", self_reflection_condition)
graph.add_edge("rewriter", "reviewer")

graph.set_finish_point("reviewer")

# Final output
app_graph = graph.compile()

# FastAPI App
app = FastAPI()

class ResearchRequest(BaseModel):
    topic: str
    user_id: str
    user_name: str

class ResearchResponse(BaseModel):
    summary: str
    sources: List[str]
    Objectives : List[str]

@app.post("/run-research", response_model=ResearchResponse)
async def run_research(request: ResearchRequest):
    try:
        print(f"User details are :: {request.user_id} \n {request.user_name} \n")
        result = app_graph.invoke({
            "topic": request.topic,
            "user_id": request.user_id,
            "user_name": request.user_name,
            "is_satisfactory": False,
            "iteration": 0
        })
        return ResearchResponse(
            summary=result["summary"],
            Objectives=result['objectives'],
            sources=result['research_results']
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


