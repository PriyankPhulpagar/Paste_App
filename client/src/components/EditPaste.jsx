import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css'; // Reuse Home page CSS

const EditPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const BASE_URL = 'https://paste-app1.onrender.com/api';

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${id}`);
        if (res.data.success) {
          setTitle(res.data.paste.Title);
          setContent(res.data.paste.Content);
        } else {
          alert('Paste not found');
          navigate('/pastes');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to load paste');
        navigate('/pastes');
      }
    };

    fetchPaste();
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/update/${id}`, {
        Title: title,
        Content: content,
      });

      if (res.data.success) {
        alert('Paste updated successfully!');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update paste');
    }
  };

  return (
    <div className="home-wrapper">
      <nav className="nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/pastes" className="nav-link">Pastes</a>
      </nav>

      <div className="input-row">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-box"
        />
      </div>

      <div className="input-row">
        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-box"
        />
      </div>

      <div className="input-row">
        <button className="create-button" onClick={handleUpdate}>
          Update Paste
        </button>
      </div>
    </div>
  );
};

export default EditPaste;
