import React from 'react';
import { motion } from 'framer-motion';

const TopicInput = ({ topic, setTopic, handleSearch }) => {
  return (
    <motion.div
      className="bg-[#f5f3ef] rounded-xl p-6 shadow-lg mb-8 border border-[#e5dfd5]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-2xl font-semibold text-[#4b3f35] mb-4 text-center">
        What do you want to research today?
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Large Language Models in Healthcare"
          className="flex-1 px-4 py-3 rounded-lg border border-[#d1cfc9] 
            bg-white text-[#4b3f35] placeholder-[#a09486]
            focus:outline-none focus:ring-2 focus:ring-[#cc7351] 
            focus:shadow-md transition-all duration-300 ease-in-out"
        />
        <button
          onClick={handleSearch}
          className="bg-[#cc7351] hover:bg-[#b36244] text-white px-6 py-3 
            rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Start Research
        </button>
      </div>
    </motion.div>
  );
};

export default TopicInput;
