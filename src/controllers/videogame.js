const { Videogame, Genre } = require("../db");

const createVideogame = async (req, res, next) => {

    const { name, description, released, rating, platforms, image, genre } = req.body;

    let genresDb = await Genre.findAll();

    try {

        const newGame = await Videogame.create({

            name,
            description,
            released,
            rating,
            image,
            platforms

        });

        let data = []

        let filterGenre = [];

        let idGenres = [];

        for (let i = 0; i < genre.length; i++) {

            filterGenre = genresDb.filter((elem) => elem.dataValues.name === genre[i])

            data.push(filterGenre[0]);

        }

        data.map((element) => idGenres.push(element.dataValues.id))

        await newGame.addGenre(idGenres);

        return res.status(201).json(newGame);

    } catch (err) {

        next(err);

    }

}

const getVideogameById = async (req, res, next) => {

    try {

        const { id } = req.params;

            let videogamesDb = await Videogame.findOne({

                where: {

                    id: id

                },

                include: Genre

            });

            return res.json(videogamesDb);

    } catch (err) {

        next(err);

    }

}

module.exports = {

    getVideogameById,
    createVideogame,

}
