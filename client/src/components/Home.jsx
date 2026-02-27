import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { useParams, useNavigate } from 'react-router-dom';
import BASE_URL from '../api/config';

const Home = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPaste = async () => {

      if (id) {

        try {

          setIsEdit(true);

          const res = await axios.get(`${BASE_URL}/pastes/${id}`);

          if (res.data.success) {

            setTitle(res.data.paste.Title);
            setContent(res.data.paste.Content);

          }

        } catch (err) {

          console.log(err);
          alert("Failed to fetch paste");

        }

      }

    };

    fetchPaste();

  }, [id]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title || !content) {

      alert("Fill all fields");
      return;

    }

    try {

      if (isEdit) {

        await axios.put(`${BASE_URL}/pastes/${id}`, {

          Title: title,
          Content: content

        });

        alert("Updated successfully");

      } else {

        await axios.post(`${BASE_URL}/pastes`, {

          Title: title,
          Content: content

        });

        alert("Created successfully");

      }

      setTitle('');
      setContent('');
      navigate("/pastes");

    } catch (err) {

      console.log(err.response?.data || err.message);
      alert("Operation failed");

    }

  };


  return (

    <div className="home-wrapper">

      <nav className="nav">

        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/pastes")}>Pastes</button>

      </nav>

      <form onSubmit={handleSubmit}>

        <input
          className="title-box"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="content-box"
          value={content}
          placeholder="Enter content"
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="create-button">

          {isEdit ? "Update Paste" : "Create Paste"}

        </button>

      </form>

    </div>

  );

};

export default Home;