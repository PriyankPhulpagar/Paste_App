import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './pasteview.css';

const Pasteview = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'https://paste-app1.onrender.com/api';

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${id}`);
        if (res.data.success) {
          setPaste(res.data.paste);
        } else {
          setError('Paste not found');
        }
      } catch (err) {
        console.error('Error fetching paste:', err);
        setError('Failed to fetch paste. It may not exist or the server is unreachable.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  if (loading) {
    return <div className="pasteview-wrapper">Loading...</div>;
  }

  if (error) {
    return <div className="pasteview-wrapper error">{error}</div>;
  }

  return (
    <div className="pasteview-wrapper">
      <h1 className="paste-title">{paste.Title}</h1>
      <div className="paste-content">{paste.Content}</div>
      <div className="paste-date">
        Created: {new Date(paste.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default Pasteview;
