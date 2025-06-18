import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';

const SaveToMemory = () => {
  const [tags, setTags] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[#f6f4ef] rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-2xl font-bold text-[#4b3f35] mb-4">Save to Memory</h2>
      <form onSubmit={handleSave} className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Add optional tags (comma-separated)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#cc7351] hover:bg-[#b36244] text-white px-6 py-2 rounded flex items-center gap-2"
        >
          <FaSave /> Save
        </button>
      </form>
      {saved && (
        <p className="text-green-600 mt-4 text-sm">Saved to memory successfully!</p>
      )}
    </div>
  );
};

export default SaveToMemory;
