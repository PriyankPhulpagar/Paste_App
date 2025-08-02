import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Create Paste
export const createPaste = async (title, content) => {
  const res = await axios.post(`${BASE_URL}/create`, { title, content });
  return res.data;
};

// Fetch all Pastes
export const fetchPastes = async () => {
  const res = await axios.get(`${BASE_URL}/all`);
  return res.data;
};

// ✅ Fetch a single paste by ID
export const fetchPasteById = async (id) => {
  const res = await axios.get(`${BASE_URL}/paste/${id}`);
  return res.data;
};

// Update Paste
export const updatePaste = async (id, updatedData) => {
  const res = await axios.put(`${BASE_URL}/update/${id}`, updatedData);
  return res.data;
};

// Delete Paste
export const deletePaste = async (id) => {
  const res = await axios.delete(`${BASE_URL}/delete/${id}`);
  return res.data;
};
