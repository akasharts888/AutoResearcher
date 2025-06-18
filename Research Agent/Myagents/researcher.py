from tavily import TavilyClient
from dotenv import load_dotenv
import os

load_dotenv()

client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
WEB_SEARCH_TOP_K = 2

def researcher_node(state: dict) -> dict:
    topic = state["topic"]
    objectives = state.get("objectives",[])
    print(f"Planner made this : {objectives}")
    research_results = []

    for objective in objectives:
        query = f"{topic} - {objective}"
        print(f"\n Searching for: {query}")

        try:
            result = client.search(query=query, search_depth="advanced")
            top_results = result.get("results", [])[:WEB_SEARCH_TOP_K]
            if not top_results:
                print(f"⚠️ No results found for query: {query}")
            for r in top_results:
                title = r.get("title", "").strip()
                content = r.get("content", "").strip()
                url = r.get('url',"").strip()

                if title and content:
                    formatted = f"- {title}: {content} source : {url}"
                    # print(f"This is what we have got :: {formatted}")
                    research_results.append(formatted)
        except Exception as e:
            print(f"❌ Error while searching '{query}': {e}")
    return {"research_results": research_results}
