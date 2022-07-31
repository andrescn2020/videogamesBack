//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const { loadApiGenres, loadApiGames } = require('./precharge.js');
const server = require('./src/app.js');
const { conn, Videogame, Genre } = require('./src/db.js');
const PORT = process.env.PORT || 3001;
// const { loadApiGenres, loadApiGames } = require('./src/precharge.js');
// const axios = require('axios');

// const { DB_APY_KEY } = process.env;

// const loadApiGenres = async function () {

//   try {

//     let genresData = await axios.get(`https://api.rawg.io/api/genres?key=${DB_APY_KEY}`);

//     const filterApiGenres = genresData.data.results.map((e) => {

//       return {

//         name: e.name,

//       }
      
//     });

//     await Genre.bulkCreate(filterApiGenres);

//      loadApiGames();

//   } catch (err) {

//     console.log(err);

//   }

// }

// const loadApiGames = async function () {

//   try {

//     let apiData = await axios.get(`https://api.rawg.io/api/games?key=${DB_APY_KEY}`);

//     let info = [];

//     for (let i = 2; i <= 11; i++) {

//       info = await axios.get(`https://api.rawg.io/api/games?key=${DB_APY_KEY}&page=${i}`);

//       info = info.data;

//       apiData.data.results = apiData.data.results.concat(info.results);

//     }

//     let filterApiGames = apiData.data.results.map(async (e) => {

//       let genres = await Genre.findAll();

//       try {

//         let gameDescription = await axios.get(`https://api.rawg.io/api/games/${e.id}?key=${DB_APY_KEY}`);

//         let game = {

//           name: e.name,
//           image: e.background_image,
//           description: e.description === undefined ? e.description = gameDescription.data.description : e.description,
//           released: e.released,
//           rating: e.rating,
//           platforms: e.platforms.map((platform) => platform.platform.name),

//         }

//         let gameCreated = await Videogame.create(game);

//         e.genres.map( async (c) => {

//           try {
            
//             let info = genres.filter(a => a.name === c.name);

//             let id = info[0].dataValues.id;

//             await gameCreated.addGenres(id);

//           } catch (err) {

//             console.log(err);
            
//           }

//         })

//       }

//       catch (err) {

//         console.log(err);

//       }

//     });

//     // await Videogame.bulkCreate(filterApiGames);

//   } catch (err) {

//     console.log(err);

//   }
// }

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {

  loadApiGenres();

  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
