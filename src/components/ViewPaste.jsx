
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const ViewPaste = () => {
  const allPastes = useSelector((state) => state.paste.pastes);
  const { pasteID } = useParams();

  const paste = allPastes.find((item) => item._id === pasteID);

  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Paste not found
      </div>
    );
  }

  function handleCopy() {
    navigator.clipboard.writeText(paste.content);
    toast.success("Content copied to clipboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center px-3 sm:px-6 py-6">

      <div className="w-full max-w-4xl space-y-6">

        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold">View Paste</h1>

          <button
            onClick={handleCopy}
            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 active:scale-95 transition"
          >
            Copy
          </button>
        </div>

        
        <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-4 sm:p-6 space-y-5">

          
          <input
            className="w-full p-3 rounded-lg border border-gray-600 bg-transparent text-white opacity-80"
            type="text"
            value={paste.title}
            disabled
          />

          
          <textarea
            className="w-full min-h-[250px] sm:min-h-[500px] p-4 rounded-xl border border-gray-600 bg-transparent text-white opacity-80 resize-none"
            value={paste.content}
            disabled
          />

          
          <div className="flex justify-between text-xs text-gray-400">
            <span>{paste.content.length} characters</span>
            <span>Read only</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewPaste