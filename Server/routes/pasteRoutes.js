const express = require('express');
const router = express.Router();

const {
  getAllPastes,
  getPasteById,
  createPaste,
  updatePaste,
  deletePaste,
} = require('../controller/pasteController');


// ✅ GET all pastes
router.get('/pastes', getAllPastes);

// ✅ GET paste by ID (make path clear)
router.get('/pastes/:id', getPasteById);

// ✅ CREATE paste
router.post('/pastes', createPaste);

// ✅ UPDATE paste
router.put('/pastes/:id', updatePaste);

// ✅ DELETE paste
router.delete('/pastes/:id', deletePaste);

module.exports = router;