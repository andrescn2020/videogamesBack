require('dotenv').config();
const { conn, Videogame, Genre } = require('./src/db.js');
const axios = require('axios');

const loadApiGenres = async function () {

  try {

    let genresData = await axios.get(`https://api.rawg.io/api/genres?key=1dde428b4a6847308b2ef80845ceab91`);


    const filterApiGenres = genresData.data.results.map((e) => {

      return {

        name: e.name,

      }
      
    });

    await Genre.bulkCreate(filterApiGenres);


     loadApiGames();

  } catch (err) {

    console.log(err);

  }

}

 const loadApiGames = async function () {

  try {

    let apiData = await axios.get(`https://api.rawg.io/api/games?key=1dde428b4a6847308b2ef80845ceab91`);

    let info = [];

    for (let i = 2; i <= 11; i++) {

      info = await axios.get(`https://api.rawg.io/api/games?key=1dde428b4a6847308b2ef80845ceab91&page=${i}`);

      info = info.data;

      apiData.data.results = apiData.data.results.concat(info.results);

    }

    let filterApiGames = apiData.data.results.map(async (e) => {

      let genres = await Genre.findAll();

      try {

        let gameDescription = await axios.get(`https://api.rawg.io/api/games/${e.id}?key=1dde428b4a6847308b2ef80845ceab91`);

        let game = {

          name: e.name,
          image: e.background_image,
          description: e.description === undefined ? e.description = gameDescription.data.description : e.description,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map((platform) => platform.platform.name),

        }
   
        let gameCreated = await Videogame.create(game);

        e.genres.map( async (c) => {

          try {
            
            let info = genres.filter(a => a.name === c.name);

            let id = info[0].dataValues.id;

            await gameCreated.addGenres(id);

          } catch (err) {

            console.log(err);
            
          }

        })

      }

      catch (err) {

        console.log(err);

      }

    });

    // await Videogame.bulkCreate(filterApiGames);

  } catch (err) {

    console.log(err);

  }
}

module.exports = {
    loadApiGenres,
    loadApiGames
} 