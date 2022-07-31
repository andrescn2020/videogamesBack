const { Router } = require('express');
const videogameRoute = require("./videogame");
const videogamesRoute = require("./videogames");
const genresRoute = require("./genres");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogame", videogameRoute);
router.use("/videogames", videogamesRoute);
router.use("/genres", genresRoute);

module.exports = router;
