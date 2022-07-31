const { Router } = require('express');
const router = Router();
const getGenres = require("../controllers/genres.js");

router.get("/", getGenres);

module.exports = router;