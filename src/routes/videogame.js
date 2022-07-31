const { Router } = require('express');
const router = Router();
const { getVideogameById, createVideogame } = require("../controllers/videogame.js")

router.post("/", createVideogame);
router.get("/:id", getVideogameById);

module.exports = router;