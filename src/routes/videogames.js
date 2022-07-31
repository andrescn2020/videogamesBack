const { Router } = require('express');
const router = Router();
const getVideogames = require("../controllers/videogames.js")

router.get("/", getVideogames);

module.exports = router;
