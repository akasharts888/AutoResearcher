from memory.hybrid_memory import HybridMemoryManager

memory_manager = HybridMemoryManager()

def memory_checker_node(state:dict) -> dict:
    query = state["topic"]
    memory_hit = memory_manager.check_similiarity(query)

    if memory_hit:
        print("✅ Memory hit – using cached research.")
        return {
            "topic": query,
            "objectives": [],
            "research_results": [],
            "summary": memory_hit["summary"],
            "review": "Memory-based result. Skipped live research.",
            "reused": True
        }
    print("❌ No memory found – proceeding to research.")
    return {
        **state,
        "reused": False
    }