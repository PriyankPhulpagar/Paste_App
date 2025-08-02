const Paste = require("../models/pasteModel"); // renamed model

// Get all pastes
const getAllPastes = async (req, res) => {
  try {
    console.log("GET /api/all received");
    const allPastes = await Paste.find();
    if (!allPastes.length) {
      return res.json({ message: "No pastes found" });
    }

    res.status(200).json({
      success: true,
      pastes: allPastes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get paste by ID
const getPasteById = async (req, res) => {
  const { id } = req.params;
  try {
    const paste = await Paste.findById(id);
    if (!paste) {
      return res.status(404).json({ success: false, message: "Paste not found" });
    }

    res.status(200).json({ success: true, paste });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create paste
const createPaste = async (req, res) => {
  const { Title, Content } = req.body;
  try {
    const existing = await Paste.findOne({ Title });
    if (existing) {
      return res.status(400).json({ success: false, message: "Title already exists" });
    }

    const newPaste = new Paste({ Title, Content });
    await newPaste.save();

    res.status(201).json({ success: true, paste: newPaste });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update paste
const updatePaste = async (req, res) => {
  const { id } = req.params;
  const { Title, Content } = req.body;

  try {
    const updatedPaste = await Paste.findByIdAndUpdate(
      id,
      { Title, Content },
      { new: true }
    );
    if (!updatedPaste) {
      return res.status(404).json({ success: false, message: "Paste not found" });
    }

    res.status(200).json({ success: true, paste: updatedPaste });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete paste
const deletePaste = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPaste = await Paste.findByIdAndDelete(id);
    if (!deletedPaste) {
      return res.status(404).json({ success: false, message: "Paste not found" });
    }

    res.status(200).json({ success: true, paste: deletedPaste });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllPastes,
  getPasteById,
  createPaste,
  updatePaste,
  deletePaste,
};
