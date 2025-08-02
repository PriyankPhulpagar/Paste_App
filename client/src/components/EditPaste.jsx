// src/components/Edit.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import 'home.css'; // Reuse same styles

const EditPaste = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pasteappserver.vercel.app/api/pastes/${id}`)
      .then(res => {
        setTitle(res.data.Title);
        setValue(res.data.Content);
      })
      .catch(err => {
        console.error("Failed to fetch paste:", err);
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://pasteappserver.vercel.app/api/pastes/${id}`, {
        Title: title,
        Content: value
      });
      setTitle('');
      setValue('');
      navigate('/'); // Go back to Home after update
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="home-wrapper">
      <div className="nav">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/pastes">All Pastes</NavLink>
      </div>

      <div className="input-row">
        <input
          type="text"
          className="title-box"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="create-button" onClick={handleUpdate}>Update Paste</button>
      </div>

      <textarea
        className="content-box"
        placeholder="Enter content"
        rows={10}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default EditPaste;
