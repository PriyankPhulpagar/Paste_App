import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api/config';
import { useParams, useNavigate } from 'react-router-dom';

const EditPaste = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  useEffect(() => {

    const fetchPaste = async () => {

      try {

        const res = await axios.get(`${BASE_URL}/pastes/${id}`);

        if (res.data.success) {

          setTitle(res.data.paste.Title);
          setContent(res.data.paste.Content);

        }

      } catch (err) {

        console.log(err);

      }

    };

    fetchPaste();

  }, [id]);


  const updatePaste = async () => {

    try {

      await axios.put(`${BASE_URL}/pastes/update/${id}`, {

        Title: title,
        Content: content

      });

      alert("Updated");

      navigate("/pastes");

    } catch (err) {

      alert("Update failed");

    }

  };


  return (

    <div>

      <input value={title} onChange={(e)=>setTitle(e.target.value)} />

      <textarea value={content} onChange={(e)=>setContent(e.target.value)} />

      <button onClick={updatePaste}>
        Update
      </button>

    </div>

  );

};

export default EditPaste;