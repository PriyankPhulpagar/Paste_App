const express = require('express');
const router = express.Router();
const {
  getAllPastes,
  getPasteById,
  createPaste,
  updatePaste,
  deletePaste,
} = require('../controller/pasteController');

// Base path: /api

// GET all pastes
router.get('/pastes', getAllPastes);

// GET single paste by ID
router.get('/:id', getPasteById);

// POST new paste
router.post('/create', createPaste);

// PUT update paste
router.put('/update/:id', updatePaste);

// DELETE paste
router.delete('/delete/:id', deletePaste);

module.exports = router;
