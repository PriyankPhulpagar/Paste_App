import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BASE_URL from '../api/config';

const Home = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIXED: correct response handling
  useEffect(() => {

    const fetchPaste = async () => {

      if (id) {

        try {

          setIsEdit(true);

          const res = await axios.get(`${BASE_URL}/${id}`);

          if (res.data.success) {

            setTitle(res.data.paste.Title);
            setContent(res.data.paste.Content);

          }

        } catch (error) {

          console.log("Fetch error:", error);
          alert("Failed to load paste");

        }

      } else {

        setIsEdit(false);
        setTitle('');
        setContent('');

      }

    };

    fetchPaste();

  }, [id, location.key]);


  // ✅ FIXED submit logic
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (!title || !content) {

        alert("Please fill all fields");
        return;

      }

      if (isEdit) {

        await axios.put(`${BASE_URL}/update/${id}`, {
          Title: title,
          Content: content
        });

        alert("Paste Updated Successfully");

        navigate("/pastes");

      } else {

        await axios.post(`${BASE_URL}/create`, {
          Title: title,
          Content: content
        });

        alert("Paste Created Successfully");

        setTitle('');
        setContent('');

      }

    } catch (error) {

      console.log("Submit error:", error);
      alert("Operation failed");

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
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit" className="create-button">
          {isEdit ? "Update Paste" : "Create Paste"}
        </button>

      </form>

      <textarea
        className="content-box"
        rows={15}
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

    </div>

  );

};

export default Home;