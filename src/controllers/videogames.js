const { Videogame, Genre } = require("../db");
const { Op } = require('sequelize');

const getVideogames = async (req, res, next) => {

    try {

        const { name } = req.query;

        if(name){

            let videogamesDb = await Videogame.findAll({

                where: { name: { [Op.iLike]: `%${name}%` } },
                limit: 15,
                include: Genre

            })

            if(videogamesDb.length === 0) {

                res.json("Doesnt exist a game with this name")

            } else {

                return res.json(videogamesDb);

            }

        } else {

            let videogamesDb = await Videogame.findAll({

                include: Genre

            });

            res.json(videogamesDb);
    
        }

    } catch (err) {

        next(err);

    }

}

module.exports = getVideogames;