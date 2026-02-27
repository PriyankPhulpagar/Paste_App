import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api/config';
import { useParams, useNavigate } from 'react-router-dom';

const Pasteview = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [paste, setPaste] = useState(null);

  // ✅ FIXED: correct backend response handling
  useEffect(() => {

    const fetchPaste = async () => {

      try {

        const res = await axios.get(`${BASE_URL}/${id}`);

        if (res.data.success) {

          setPaste(res.data.paste);

        } else {

          alert("Paste not found");
          navigate("/pastes");

        }

      } catch (error) {

        console.log("Fetch error:", error);
        alert("Failed to load paste");
        navigate("/pastes");

      }

    };

    fetchPaste();

  }, [id, navigate]);


  if (!paste) {

    return <div>Loading...</div>;

  }


  return (

    <div style={{ padding: "20px" }}>

      <h1>{paste.Title}</h1>

      <hr />

      <p style={{ whiteSpace: "pre-wrap" }}>
        {paste.Content}
      </p>

    </div>

  );

};

export default Pasteview;