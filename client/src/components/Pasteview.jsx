import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api/config';
import { useParams } from 'react-router-dom';

const PasteView = () => {

  const { id } = useParams();

  const [paste, setPaste] = useState(null);


  useEffect(() => {

    const fetchPaste = async () => {

      try {

        const res = await axios.get(`${BASE_URL}/pastes/${id}`);

        if (res.data.success) {

          setPaste(res.data.paste);

        }

      } catch (err) {

        console.log(err);

      }

    };

    fetchPaste();

  }, [id]);


  if (!paste) return <h2>Loading...</h2>;


  return (

    <div>

      <h1>{paste.Title}</h1>

      <p>{paste.Content}</p>

    </div>

  );

};

export default PasteView;