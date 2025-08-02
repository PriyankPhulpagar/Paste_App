import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = 'https://paste-app1.onrender.com/api';

  // Detect mode on mount or when location changes
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`${BASE_URL}/paste/${id}`)
        .then(res => {
          if (res.data.success) {
            setTitle(res.data.paste.Title);
            setContent(res.data.paste.Content);
          } else {
            alert('Paste not found');
          }
        })
        .catch(err => {
          console.error('Error fetching paste:', err);
          alert('Server error');
        });
    } else {
      setIsEdit(false);
      setTitle('');
      setContent('');
    }
  }, [id, location.key]); // <- use location.key to re-run when route changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const response = await axios.put(`${BASE_URL}/update/${id}`, {
          Title: title,
          Content: content,
        });

        if (response.data.success) {
          alert('Paste updated!');
          navigate('/'); // Return to create mode
        } else {
          alert('Failed to update');
        }
      } else {
        const response = await axios.post(`${BASE_URL}/create`, {
          Title: title,
          Content: content,
        });

        if (response.data.success) {
          alert('Paste created!');
          setTitle('');
          setContent('');
        } else {
          alert('Failed to create');
        }
      }
    } catch (err) {
      console.error('Error submitting:', err);
      alert('Server error');
    }
  };

  return (
    <div className="home-wrapper">
      <nav className="nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/pastes" className="nav-link">Pastes</a>
      </nav>

      <form onSubmit={handleSubmit} className="input-row">
        <input
          className="title-box"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <button type="submit" className="create-button">
          {isEdit ? 'Update Paste' : 'Create Paste'}
        </button>
      </form>

      <textarea
        className="content-box"
        rows={20}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter content here"
      />
    </div>
  );
};

export default Home;
