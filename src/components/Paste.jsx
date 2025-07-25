import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/PasteSlice';
import toast from 'react-hot-toast';
import { FormatDate } from '../utlis/Formatdate';
import { Calendar } from 'lucide-react';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setsearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="w-full h-full py-10 max-w-[1500px] mx-auto px-5 lg:px-0" style={{ backgroundColor: '#003854' }}>
      <input
        className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(98,93,93,0.3)]  mt-6 text-blue-50"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-4 mt-5">
        <h2 className="px-4 text-4xl font-bold border-b border-[rgba(211,168,168,0.3)] pb-4 text-cyan-300">
          All Pastes
        </h2>
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div
              className="bg-gray-900 text-blue-50 font-semibold p-6 rounded-3xl border border-gray-400 min-w-[1000px] mt-4 flex flex-col items-center justify-center"
              key={paste?._id}
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
                <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V17h4" />
                  </svg>
                  <a href={`/Paste_App/?pasteId=${paste?._id}`}> Edit & View</a>
                </button>

                <button
                  className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500 flex items-center gap-2"
                  onClick={() => handleDelete(paste?._id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10" />
                  </svg>
                  Delete
                </button>

                <button
                  className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500 flex items-center gap-2"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success('Copied to Clipboard');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth={2} fill="none" />
                    <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth={2} fill="none" />
                  </svg>
                  Copy
                </button>

                <button
                  className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500 flex items-center gap-2"
                  onClick={() => {
                    const url = `${window.location.origin}/Paste_App/pastes/${paste?._id}`;
                    navigator.clipboard.writeText(url);
                    toast.success('Share URL copied!');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M8.59 16.59a2 2 0 002.83 0l4.24-4.24a2 2 0 000-2.83l-4.24-4.24a2 2 0 00-2.83 0l-4.24 4.24a2 2 0 000 2.83l4.24 4.24z" />
                  </svg>
                  Share
                </button>
              </div>

              <div className="gap-x-2 flex items-center justify-center mt-4">
                <Calendar className="text-black" size={20} />
                <span className="text-center">{FormatDate(paste?.createdAt)}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
