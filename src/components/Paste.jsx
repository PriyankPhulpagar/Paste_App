import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/PasteSlice';
import toast from 'react-hot-toast';
import { FormatDate } from '../utlis/Formatdate'; 
import {Calendar} from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion';


const Paste = () => {

  const pastes= useSelector((state)=>state.paste.pastes);

  const[searchTerm,setsearchTerm]=useState('');

  const dispatch=useDispatch();

  const filteredData=pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()));


  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }


  return (
    <div className="w-full h-full py-10 max-w-[1500px] mx-auto px-5 lg:px-0" style={{ backgroundColor: "#003854" }}>
      <input
        className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(98,93,93,0.3)]  mt-6 text-blue-50"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-4 mt-5'>
        <h2 className="px-4 text-4xl font-bold border-b border-[rgba(211,168,168,0.3)] pb-4 text-cyan-300">
          All Pastes
        </h2>
        <AnimatePresence>
          {filteredData.length > 0 &&
            filteredData.map((paste) => (
              <motion.div
                className="bg-gray-900 text-blue-50 font-semibold p-6 rounded-3xl border border-gray-400 min-w-[1000px] mt-4 flex flex-col items-center justify-center"
                key={paste?._id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <div className="w-full flex flex-col items-center">
                  <p className="text-2xl text-cyan-200 font-semibold text-center">{paste?.title}</p>
                </div>

                <div className="w-full flex flex-col items-center">
                  <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070] text-center mt-3">
                    {paste?.content}
                  </p>
                </div>

                <div className="flex flex-row gap-4 justify-center text-black mt-6">
                  <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>

                  <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>

                  <button
                    className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500"
                    onClick={() => handleDelete(paste?._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    Copy
                  </button>

                  <button
                    className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500"
                    onClick={() => {
                      const url = `${window.location.origin}/pastes/${paste?._id}`;
                      navigator.clipboard.writeText(url);
                      toast.success("Share URL copied!");
                    }}
                  >
                    Share
                  </button>
                </div>

                <div className="gap-x-2 flex items-center justify-center mt-4">
                  <Calendar className="text-black" size={20} />
                  <span className="text-center">{FormatDate(paste?.createdAt)}</span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Paste
