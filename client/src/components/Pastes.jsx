import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pastes.css';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCopy, FaShareAlt } from 'react-icons/fa';
import BASE_URL from '../api/config';

const Pastes = () => {

  const [pastes, setPastes] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchPastes();
  }, []);


  const fetchPastes = async () => {

    try {

      const res = await axios.get(BASE_URL);

      setPastes(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  const handleDelete = async (id) => {

    await axios.delete(`${BASE_URL}/delete/${id}`);

    alert("Deleted");

    fetchPastes();

  };


  const handleCopy = (content) => {

    navigator.clipboard.writeText(content);

    alert("Copied");

  };


  const handleShare = (id) => {

    const link = `${window.location.origin}/pastes/${id}`;

    navigator.clipboard.writeText(link);

    alert("Link Copied");

  };


  const handleEdit = (id) => {

    navigate(`/edit/${id}`);

  };


  const filtered = pastes.filter(p =>
    p.Title.toLowerCase().includes(search.toLowerCase())
  );


  return (

    <div className="pastes-wrapper">

      <nav className="nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/pastes" className="nav-link">Pastes</a>
      </nav>


      <input
        className="search-bar"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {filtered.map(paste => (

        <div className="paste-card" key={paste._id}>

          <h3>{paste.Title}</h3>

          <p>{paste.Content}</p>


          <div className="button-row">

            <button onClick={() => handleEdit(paste._id)}>
              <FaEdit /> Edit
            </button>

            <button onClick={() => handleDelete(paste._id)}>
              <FaTrash /> Delete
            </button>

            <button onClick={() => handleCopy(paste.Content)}>
              <FaCopy /> Copy
            </button>

            <button onClick={() => handleShare(paste._id)}>
              <FaShareAlt /> Share
            </button>

          </div>


        </div>

      ))}

    </div>

  );
};

export default Pastes;