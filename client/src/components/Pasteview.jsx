import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './pasteview.css';

const PasteView = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPaste();
  }, []);

  const fetchPaste = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/paste/${id}`);
      if (res.data.success) {
        setPaste(res.data.paste);
      } else {
        setError('Paste not found');
      }
    } catch (err) {
      setError('Paste not found or error occurred');
      console.error(err);
    }
  };

  if (error) return <div className="paste-view-wrapper"><h2>{error}</h2></div>;
  if (!paste) return <div className="paste-view-wrapper"><h2>Loading...</h2></div>;

  return (
    <div className="paste-view-wrapper">
      <h1 className="paste-heading">{paste.Title}</h1>
      <p className="paste-content">{paste.Content}</p>
      <p className="paste-date">Created: {new Date(paste.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PasteView;
