const express = require('express');
const router = express.Router();
const {
  getAllPastes,
  getPasteById,
  createPaste,
  updatePaste,
  deletePaste,
} = require('../controller/pasteController');

// CRUD Routes
router.get('/pastes', getAllPastes);        // GET all
router.get('/pastes/:id', getPasteById);    // GET one
router.post('/pastes', createPaste);        // POST new
router.put('/pastes/:id', updatePaste);     // PUT update
router.delete('/pastes/:id', deletePaste);  // DELETE


module.exports = router;
