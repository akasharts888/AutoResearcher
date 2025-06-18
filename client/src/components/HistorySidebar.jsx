import React from 'react';

const HistorySidebar = ({ history, onSelectTopic }) => {
  return (
    <div className="w-64 bg-[#e0d6c3] p-4 rounded-xl shadow-lg h-full overflow-y-auto">
      <h2 className="text-xl font-semibold text-[#4b3f35] mb-4">Research History</h2>
      <ul className="space-y-2">
        {history.length === 0 && <li className="text-gray-500">No history yet.</li>}
        {history.map((item, idx) => (
          <li
            key={idx}
            className="cursor-pointer text-[#4b3f35] hover:underline"
            onClick={() => onSelectTopic(item)}
          >
            {item.query}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorySidebar;
