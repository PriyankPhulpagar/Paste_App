
import React, { use, useEffect, useState } from 'react'
import { useParams, useSearchParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/PasteSlice';

const Viewpaste = () => {
    const params = useParams();
  const[searchParams,setSearchParam]=useSearchParams();
  const id=params.id;
  const allpastes = useSelector((state) => state.paste.pastes);

  const paste = allpastes.find((p) => p._id === id);
  console.log("Final Paste:", paste);



return (
    <div
        style={{
            animation: 'slideFromLeft 0.7s ease'
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
                @media screen and (max-width: 900px) {
                    .responsive-textarea {
                        min-width: 140%;
                        min-height: 300px;
                    }
                    .responsive-title {
                        width: 100%;
                        min-width: 0;
                    }
                }
                @media screen and (max-width: 600px) {
                    .responsive-textarea {
                        min-width: 120%;
                        min-height: 150px;
                    }
                    .responsive-title {
                        width: 100%;
                        min-width: 0;
                        font-size: 1rem;
                    }
                }
                @media screen and (min-width: 901px) {
                    .responsive-textarea {
                        min-width: 800px;
                        min-height: 600px;
                    }
                    .responsive-title {
                        width: 66%;
                        min-width: 400px;
                        font-size: 1.25rem;
                    }
                }
            `}
        </style>
        <div className="flex flex-row gap-6 mt-3 place-content-between">
            <input
                className="responsive-title p-2 rounded-2xl mt-4 border-2 border-black text-amber-50 bg-black pl-4"
                type="text"
                placeholder="Enter text here"
                value={paste ? paste.title : ""}
                disabled
                readOnly
            />
        </div>
        <div className="mt-8">
            <textarea
                className="responsive-textarea rounded-2xl mt-4 p-4 bg-black text-cyan-50"
                value={paste ? paste.content : ""}
                placeholder="Enter Content here"
                disabled
                readOnly
                rows={20}
            />
        </div>
    </div>
)
}

export default Viewpaste

