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

    axios.get(`${BASE_URL}/${id}`)
      .then(res => {

        setTitle(res.data.Title);
        setContent(res.data.Content);

      });

  }, [id]);


  const updatePaste = async () => {

    await axios.put(`${BASE_URL}/update/${id}`, {

      Title: title,
      Content: content

    });

    alert("Updated");

    navigate("/pastes");

  };


  return (

    <div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={updatePaste}>
        Update
      </button>

    </div>

  );

};

export default EditPaste;