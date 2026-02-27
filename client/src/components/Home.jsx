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

  useEffect(() => {

    if (id) {
      setIsEdit(true);

      axios.get(`${BASE_URL}/${id}`)
        .then(res => {
          setTitle(res.data.Title);
          setContent(res.data.Content);
        })
        .catch(err => console.log(err));

    } else {
      setIsEdit(false);
      setTitle('');
      setContent('');
    }

  }, [id, location.key]);



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isEdit) {

        await axios.put(`${BASE_URL}/update/${id}`, {
          Title: title,
          Content: content
        });

        alert("Paste Updated");

        navigate("/pastes");

      } else {

        await axios.post(`${BASE_URL}/create`, {
          Title: title,
          Content: content
        });

        alert("Paste Created");

        setTitle('');
        setContent('');
      }

    } catch (error) {
      console.log(error);
      alert("Error");
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

        <button className="create-button">
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