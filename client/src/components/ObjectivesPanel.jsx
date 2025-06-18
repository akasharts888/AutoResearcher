import React from 'react';
import { motion } from 'framer-motion';

const dummyObjectives = [
  "Understand the applications of LLMs in healthcare.",
  "Identify key benefits and limitations.",
  "Explore future trends in medical research using LLMs."
];
const ObjectivesPanel = ({ objectives }) => {
  const displayObjectives = objectives?.length > 0 ? objectives : dummyObjectives;

  return (
    <motion.div
      className="bg-[#fdfaf6] rounded-xl p-6 shadow-md mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-[#4b3f35] mb-4 text-center">Research Objectives</h2>
      <ul className="list-disc list-inside text-[#5f5244] space-y-2 pl-4">
        {displayObjectives.map((obj, idx) => (
          <li key={idx} className="text-base">{obj}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ObjectivesPanel;
