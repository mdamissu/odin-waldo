const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/characters.json");

// Load character positions
const loadCharacters = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Validate user click
router.post("/check", (req, res) => {
    const { character, x, y } = req.body;
    const characters = loadCharacters();

    if (!characters[character]) {
        return res.json({ correct: false, message: "Character not found" });
    }

    const char = characters[character];
    const tolerance = 50; // pixels

    // Check if click is within tolerance
    const isCorrect = Math.abs(char.x - x) <= tolerance && Math.abs(char.y - y) <= tolerance;

    res.json({ correct: isCorrect, character });
});

module.exports = router;
