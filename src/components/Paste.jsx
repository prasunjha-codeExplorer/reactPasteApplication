import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import './Paste.css'
import { removeFromPastes, resetAllPastes } from '../redux/pasteSlice';
import { Link, NavLink, useNavigate } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));


  function handleDelete(paste) {
    dispatch(removeFromPastes(paste));
  }

  function handleCopy(paste) {
    navigator.clipboard.writeText(paste.content);
    toast.success("content copied to clipboard");
  }

  function handleReset() {
    dispatch(resetAllPastes());
    toast.success("All pastes got resets successfully");
  }
  return (

    <>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center text-white mt-4">

        <div className="w-full max-w-3xl">
          <input
            className="w-full p-3 rounded-xl border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="text"
            value={searchTerm}
            placeholder="Search pastes..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full max-w-3xl flex flex-col gap-6 mt-7">
          {
            filteredData.length > 0 ? (
              filteredData.map((paste) => (

                <div
                  key={paste?._id}
                  className="p-5 rounded-2xl border border-gray-700 bg-[#111827] shadow-md"
                >

                  <h2 className="text-lg font-semibold mb-2 break-words">
                    TITLE: {paste.title}
                  </h2>

                  <p className="text-gray-300 text-sm mb-4 break-words line-clamp-3 ">
                    {paste.content}
                  </p>

                  <div className="flex flex-wrap gap-3 justify-between mt-4">

                    <Link
                      to={`/?pasteId=${paste?._id}`}
                      className="flex-1 text-center px-4 py-2 rounded-lg border border-green-500 hover:bg-green-500 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(paste)}
                      className="flex-1 px-4 py-2 rounded-lg border border-red-500 hover:bg-red-500 transition"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleCopy(paste)}
                      className="flex-1 px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 transition"
                    >
                      Copy
                    </button>


                    <Link
                      to={`/pastes/${paste?._id}`}
                      className="flex-1 text-center px-4 py-2 rounded-lg border border-yellow-500 hover:bg-yellow-500 transition"
                    >
                      View
                    </Link>

                  </div>

                  <div className="text-xs text-gray-500 mt-4 text-right">
                    {new Date(paste.createAt).toLocaleString()}
                  </div>

                </div>
              ))
            ) : (
              []
            )
          }
          <button
            onClick={() => {filteredData.length > 0 ? handleReset() : navigate("/") }}
            className="flex-1 px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 transition"
          >
            {filteredData.length > 0 ? "reset all pastes" : "create a paste that you wanted to make"}
          </button>
        </div>
      </div>
    </>
  )
}

export default Paste
