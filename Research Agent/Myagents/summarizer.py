from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os
import time

load_dotenv()

GROQ_MODEL = os.getenv("GROQ_MODEL")
GROQ_API = os.getenv("GROQ_API_KEY")


llm = ChatGroq(api_key=GROQ_API,model=GROQ_MODEL)

# Prompt template for summarizing a single chunk
chunk_template = PromptTemplate.from_template(
    "You are a helpful summarizer.\nSummarize the following research findings:\n\n{chunk}"
)

# Prompt template for combining partial summaries
final_template = PromptTemplate.from_template(
    "You are a helpful AI.\n"
    "Combine and polish the following partial research summaries into one coherent summary.\n"
    "Format the entire response using Markdown syntax, including headings, lists, emphasis, and other Markdown elements where appropriate:\n\n"
    "{partials}"
)


def chunk_list(texts, max_chars=3000):
    chunks = []
    current_chunk = ""

    for text in texts:
        if len(current_chunk) + len(text) <=max_chars:
            current_chunk += "\n"+text
        else:
            chunks.append(current_chunk.strip())
            current_chunk = text
    
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks

# def safe_combine_summaries(partial_summaries, llm, max_chars=3000):
#     print("partials summaries are :: ",partial_summaries)
#     if len("\n\n".join(partial_summaries)) <= max_chars:
#         final_prompt = final_template.format(partials="\n\n".join(partial_summaries))
#         return llm.invoke(final_prompt).content.strip()

#     # If too large, break into smaller chunks and summarize recursively
#     chunked_partials = chunk_list(partial_summaries, max_chars=max_chars)
    
#     condensed = []
#     for chunk in chunked_partials:
#         prompt = final_template.format(partials=chunk)
#         result = llm.invoke(prompt).content.strip()
#         condensed.append(result)

#     # Recursive call to combine again
#     return safe_combine_summaries(condensed, llm, max_chars=max_chars)

def safe_combine_summaries(partial_summaries, llm, max_chars=3000, max_iterations=3):
    iteration = 0

    while len("\n\n".join(partial_summaries)) > max_chars and iteration < max_iterations:
        chunked = chunk_list(partial_summaries, max_chars=max_chars)
        condensed = []

        for chunk in chunked:
            prompt = final_template.format(partials=chunk)
            result = llm.invoke(prompt).content.strip()
            condensed.append(result)

        partial_summaries = condensed
        iteration += 1
        time.sleep(2)

    # Final combination, whether shortened or not
    final_prompt = final_template.format(partials="\n\n".join(partial_summaries))
    return llm.invoke(final_prompt).content.strip()

def summarizer_node(input):
    results = input.get("research_results", [])

    chunks = chunk_list(results)
    print("chunks are :: ",chunks)
    partial_summaries = []
    for chunk in chunks:
        prompt = chunk_template.format(chunk=chunk)
        partial = llm.invoke(prompt)
        partial_summaries.append(partial.content.strip())
    
    final_summary = safe_combine_summaries(partial_summaries, llm)


    return {"summary": final_summary}
