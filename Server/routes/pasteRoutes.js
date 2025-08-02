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
router.get('/all', getAllPastes);
router.get('/paste/:id', getPasteById);
router.post('/create', createPaste);
router.put('/update/:id', updatePaste);
router.delete('/delete/:id', deletePaste);

module.exports = router;
