let games = [
  { id: 1, title: 'The Legend of Zelda', genreId: 1 },
  { id: 2, title: 'Super Mario Bros', genreId: 2 },
];

let genres = [
  { id: 1, name: 'Action-Adventure' },
  { id: 2, name: 'Platformer' },
];

// function to get all games
function getGames(){
  return games;
}

// function to get game by Id
function getGameById(id){
  return games.find(game => game.id === id);
}

// function to get all genres
function getGenres(){
  return genres;
}

// function to get genre by Id
function getGenreById(id){
  return genres.find(genre.id === id);
}

module.exports = {
  getGames,
  getGameById,
  getGenres,
  getGenreById
};