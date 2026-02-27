import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api/config';
import { useParams } from 'react-router-dom';

const Pasteview = () => {

  const { id } = useParams();

  const [paste, setPaste] = useState(null);


  useEffect(() => {

    axios.get(`${BASE_URL}/${id}`)
      .then(res => setPaste(res.data))
      .catch(err => console.log(err));

  }, [id]);


  if (!paste) return <div>Loading...</div>;


  return (

    <div>

      <h1>{paste.Title}</h1>

      <p>{paste.Content}</p>

    </div>

  );

};

export default Pasteview;