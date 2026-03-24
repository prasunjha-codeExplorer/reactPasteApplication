// import React, { useEffect, useState} from 'react'
// import { useSearchParams } from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux"
// import './Home.css';
// import { addToPastes, updateToPastes } from '../redux/pasteSlice';

// const Home = () => {
//     const [title,setTitle] = useState("");
//     const [value,setValue] = useState("");
//     const [searchParams,setSearchParams] = useSearchParams();
//     const pasteId = searchParams.get("pasteId");
//     const allPastes = useSelector((state) => state.paste.pastes)

//     const dispatch = useDispatch();

//     const updatePaste = useEffect(() => {
//         if(pasteId){
//           const paste = allPastes.find((item) => item._id === pasteId);
//           setTitle(paste.title);
//           setValue(paste.content);
//         }
//     },[pasteId])


//     function createPaste(){
//       const paste = {
//          title: title,
//          content: value,
//          _id : pasteId || Date.now().toString(),
//          createAt: new Date().toISOString()
//       }

//       if(pasteId){
//          // Updating an existing paste
//          dispatch(updateToPastes(paste));
//       }else{
//         //Creating a new paste
//         dispatch(addToPastes(paste));
//       }

//       setTitle('');
//       setValue('');
//       setSearchParams();
//     }

//   return (
//     <>
//     {/* <div className='flex flex-row gap-7 pl-45'>
//         <input 
//         id='input'
//         className='p-2 rounded place-content-evenly mt-2 min-w-[600px]'
//         type='text'
//         placeholder='Enter your title here'
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         />

//         <button className='p-2 rounded place-content-evenly mt-2 min-w-[100px]' id="btn" onClick={createPaste}>
//             {pasteId === null ? "create" : "update"}
//         </button>
//     </div>

//     <div className='mt-8'>
//        <textarea 
//        className='rounded-2xl mt-4, min-w-[1100px] p-4' id='txt'
//        value={value}
//        placeholder='Enter content'
//        onChange={(e) => setValue(e.target.value)}
//        />
//     </div> */}

//     <div className="min-h-screen flex flex-col items-center px-4 py-6">

//   {/* Title + Button */}
//   <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4">
    
//     <input
//       className="w-full p-3 rounded-lg border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//       type="text"
//       placeholder="Enter your title here"
//       value={title}
//       onChange={(e) => setTitle(e.target.value)}
//     />

//     <button
//       className="w-full sm:w-auto px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 transition-all cursor:pointer"
//       id='btn'
//       onClick={createPaste}
//     >
//       {pasteId === null ? "Create" : "Update"}
//     </button>
//   </div>

//   {/* Textarea */}
//   <div className="w-full max-w-3xl mt-6">
//     <textarea
//       className="w-full min-h-[300px] sm:min-h-[800px] p-4 rounded-xl border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
//       placeholder="Enter content..."
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     />
//   </div>

// </div>
//     </>
//   )
// }

// export default Home

import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((item) => item._id === pasteId); // returns the first element which satifies the condition ,otherwise undefined
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } 
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(),
      createAt: new Date().toISOString()
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center px-3 sm:px-6 py-6">

      <div className="w-full max-w-4xl space-y-6">

        
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
            Paste Manager
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Save and manage your snippets effortlessly
          </p>
        </div>

        
        <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-4 sm:p-6 space-y-5">

          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 p-3 rounded-lg border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              type="text"
              placeholder="Enter your title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              className="px-6 py-3 rounded-lg font-medium bg-green-500 hover:bg-green-600 active:scale-95 transition-all"
              onClick={createPaste}
            >
              {pasteId ? "Update" : "Create"}
            </button>
          </div>

          
          <textarea
            className="w-full min-h-[250px] sm:min-h-[500px] p-4 rounded-xl border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-400 resize-none transition"
            placeholder="Write your content here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

         
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{value.length} characters</span>
            <span>{pasteId ? "Editing mode" : "New paste"}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
