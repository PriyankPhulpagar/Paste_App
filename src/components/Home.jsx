import React, { use, useEffect, useState } from 'react'
import { useSearchParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/PasteSlice';



const Home = () => {
const[title,setTitle]= useState("");
const[value,setValue]=useState("");
const[searchParams,setSearchParam]=useSearchParams();
const pasteId=searchParams.get("pasteId");
const dispatch=useDispatch();
const allPastes= useSelector((state)=>state.paste.pastes);

useEffect(() => {
    if (pasteId) {
        const paste = allPastes.find((p) => p._id === pasteId);
        if (paste) {
            setTitle(paste.title);
            setValue(paste.content);
        } else {
            setTitle("");
            setValue("");
        }
    }
}, [pasteId]);



function createPaste(){
    const paste = {
        title:title,
        content:value,
        _id: pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString(),
    }

    if(pasteId){
        //update
        dispatch(updateToPastes(paste));
    }
    else{
        //create
        dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParam({});


}

return (
    <div
        className="w-full h-full flex items-center justify-center py-10"
        style={{
            animation: 'slideFromLeft 0.7s ease',
            minHeight: '100vh'
        }}
    >
        <style>
            {`
                @keyframes slideFromLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-100%);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @media (max-width: 1024px) {
                    .responsive-textarea {
                        min-width: 120%;
                        min-height: 400px;
                    }
                }
                @media (max-width: 600px) {
                    .responsive-textarea {
                        min-width: 120%;
                        min-height: 200px;
                    }
                    .responsive-input {
                        width: 100% !important;
                    }
                    .responsive-row {
                        flex-direction: column !important;
                        gap: 1rem !important;
                    }
                }
            `}
        </style>
        <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center">
            <div className="w-full flex flex-row gap-x-4 justify-between items-center responsive-row"
                style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <input
                    className="p-2 rounded-2xl mt-4 border-2 border-black text-amber-50 bg-black w-[63%] pl-4 responsive-input"
                    type="text"
                    placeholder="Enter text here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    onClick={createPaste}
                    className="p-2 mt-4 border-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm bg-blue-400"
                    style={{ flexShrink: 0 }}
                >
                    {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>

            <div className='mt-8 w-full flex justify-center'>
                <textarea
                    className='rounded-2xl mt-4 min-w-[800px] min-h-[600px] p-4 bg-black text-blue-50 responsive-textarea'
                    value={value}
                    placeholder='Enter Content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    </div>
)
}

export default Home

