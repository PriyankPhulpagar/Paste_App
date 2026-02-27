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

  // ✅ FIXED: correct endpoint and correct data extraction
  const fetchPastes = async () => {
    try {

      const res = await axios.get(`${BASE_URL}/pastes`);

      if (res.data.success) {
        setPastes(res.data.pastes);
      } else {
        setPastes([]);
      }

    } catch (error) {
      console.log("Fetch error:", error);
      setPastes([]);
    }
  };

  // ✅ DELETE FIXED
  const handleDelete = async (id) => {
    try {

      await axios.delete(`${BASE_URL}/delete/${id}`);

      alert("Deleted successfully");

      fetchPastes();

    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
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
    p.Title?.toLowerCase().includes(search.toLowerCase())
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

      {filtered.length === 0 ? (
        <p style={{textAlign:'center'}}>No pastes found</p>
      ) : (

        filtered.map(paste => (

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

        ))

      )}

    </div>

  );
};

export default Pastes;