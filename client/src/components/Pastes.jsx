import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pastes.css';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCopy, FaShareAlt } from 'react-icons/fa';

const Pastes = () => {
  const [pastes, setPastes] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const BASE_URL = 'https://paste-app1.onrender.com/api';

  useEffect(() => {
    fetchPastes();
  }, []);

  const fetchPastes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all`);
      if (res.data.success) {
        setPastes(res.data.pastes);
      }
    } catch (error) {
      console.error('Error fetching pastes:', error);
      alert('Failed to load pastes');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      alert('Paste deleted');
      fetchPastes(); // refresh list
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => alert('Copied to clipboard'))
      .catch((err) => alert('Copy failed'));
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/pastes/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => alert(`Link copied: ${url}`))
      .catch(() => alert('Failed to copy link'));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pastes-wrapper">
      <nav className="nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/pastes" className="nav-link">Pastes</a>
      </nav>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="pastes-container">
        {filteredPastes.length === 0 ? (
          <p>No pastes found.</p>
        ) : (
          filteredPastes.map((paste) => (
            <div className="paste-card" key={paste._id}>
              <div className="paste-title">{paste.Title}</div>
              <div className="paste-content">{paste.Content}</div>

              <div className="button-row">
                <button className="action-btn edit" onClick={() => handleEdit(paste._id)}>
                  <FaEdit /> Edit
                </button>
                <button className="action-btn delete" onClick={() => handleDelete(paste._id)}>
                  <FaTrash /> Delete
                </button>
                <button className="action-btn copy" onClick={() => handleCopy(paste.Content)}>
                  <FaCopy /> Copy
                </button>
                <button className="action-btn share" onClick={() => handleShare(paste._id)}>
                  <FaShareAlt /> Share
                </button>
              </div>

              <div className="paste-date">
                Created: {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pastes;
