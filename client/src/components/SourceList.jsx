import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const dummySources = [
  "- LLMs in Healthcare: Large Language Models are transforming healthcare with capabilities like documentation, summarization, and patient communication. source : https://www.ncbi.nlm.nih.gov/",
  "- OpenAI’s GPT in Medical Research: GPT-4 shows promising results in clinical trial summarization, aiding researcher efficiency with caution around accuracy. source : https://openai.com/research",
];


const parseSourceString = (rawString) => {
  try {
    // console.log("it is:: ",rawString);
    const [titleAndSnippet, urlPart] = rawString.split("source :");
    const title = titleAndSnippet.split(":")[0];
    const snippetParts = titleAndSnippet.split(":")[1];
    console.log("tile and snippet : ",title,snippetParts);
    return {
      title: title || "",
      snippet: snippetParts || "",
      url: urlPart?.trim(),
    };
  } catch (e) {
    return null;
  }
};

const SourceList = ({ sources }) => {
  const sourceData = sources?.length ? sources : dummySources;
  
  const parsedSources = sourceData
    .map((src) => (typeof src === "string" ? parseSourceString(src) : src))
    .filter((src) => src !== null);
  
  console.log("Parsed sources are :: ",parsedSources);
  return (
    <motion.div
      className="bg-[#fdfaf6] rounded-xl p-6 shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-[#4b3f35] mb-4 text-center">Sources</h2>
      <div className="space-y-4">
        {parsedSources.map((src, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-[#4b3f35]">{src.title}</h3>
            <p className="text-sm text-[#5f5244] my-2">{src.snippet}</p>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#cc7351] font-medium inline-flex items-center hover:underline"
            >
              View Source <FaExternalLinkAlt className="ml-2" size={14} />
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SourceList;
