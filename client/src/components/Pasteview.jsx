import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          background-color: #021f3f;
          color: white;
          font-family: 'Segoe UI', sans-serif;
        }

        .pasteview-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
          padding: 20px;
        }

        .paste-title {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1.2rem;
        }

        .paste-content {
          font-size: 1.7rem;
          max-width: 1000px;
          white-space: pre-wrap;
          margin-bottom: 1rem;
        }

        .paste-date {
          font-size: 1.2rem;
          color: #cccccc;
        }

        .error {
          color: red;
        }
      `}</style>

      <div className="pasteview-wrapper">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <h1 className="paste-title">{paste.Title}</h1>
            <div className="paste-content">{paste.Content}</div>
            <div className="paste-date">
              Created: {new Date(paste.createdAt).toLocaleString()}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pasteview;
