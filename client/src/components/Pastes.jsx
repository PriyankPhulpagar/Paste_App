import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pastes.css';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCopy, FaShareAlt } from 'react-icons/fa';
import BASE_URL from '../api/config';

const Pastes = () => {

  const [pastes, setPastes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetchPastes();

  }, []);


  const fetchPastes = async () => {

    try {

      const res = await axios.get(`${BASE_URL}/pastes`);

      if (res.data.success) {

        setPastes(res.data.pastes);

      }

    } catch (err) {

      console.log(err);

    }

  };


  const handleDelete = async (id) => {

    try {

     await axios.delete(`${BASE_URL}/pastes/${id}`);

      alert("Deleted");

      fetchPastes();

    } catch (err) {

      console.log(err);

      alert("Delete failed");

    }

  };


  const handleEdit = (id) => {

    navigate(`/edit/${id}`);

  };


  const handleCopy = (content) => {

    navigator.clipboard.writeText(content);

    alert("Copied");

  };


  const handleShare = (id) => {

    const link = `${window.location.origin}/view/${id}`;

    navigator.clipboard.writeText(link);

    alert("Link copied");

  };


  return (

    <div className="pastes-wrapper">

      <h1>All Pastes</h1>

      {

        pastes.map(paste => (

          <div key={paste._id} className="paste-card">

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

        ))

      }

    </div>

  );

};

export default Pastes;