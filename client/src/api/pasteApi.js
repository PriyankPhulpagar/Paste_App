import axios from 'axios';
import BASE_URL from './config';


// ✅ Create Paste
export const createPaste = async (title, content) => {
  const res = await axios.post(`${BASE_URL}/create`, {
    Title: title,
    Content: content
  });

  return res.data.paste;
};



// ✅ Fetch all Pastes
export const fetchPastes = async () => {

  const res = await axios.get(BASE_URL);

  return res.data.pastes || [];

};



// ✅ Fetch single paste
export const fetchPasteById = async (id) => {

  const res = await axios.get(`${BASE_URL}/${id}`);

  return res.data.paste;

};



// ✅ Update paste
export const updatePaste = async (id, updatedData) => {

  const res = await axios.put(`${BASE_URL}/update/${id}`, updatedData);

  return res.data.paste;

};



// ✅ Delete paste
export const deletePaste = async (id) => {

  const res = await axios.delete(`${BASE_URL}/delete/${id}`);

  return res.data;

};