const Genre = require('./Genre');
const Actor = require('./Actor');
const Director = require('./Director');
const Movie = require('./Movie');

Movie.belongsToMany(Actor, { through: "MoviesActors" });
Movie.belongsToMany(Director, { through: "MoviesDirectors" });
Movie.belongsToMany(Genre, { through: "MoviesGenres" });



