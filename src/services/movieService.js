import http from '../services/httpService';

export async function getMovies() {
  const movies = await http.get(process.env.REACT_APP_REMOTE_URL + "/api/movies");
  return movies.data;
}

export async function getMovie(id) {
  try{
    const movie = await http.get(process.env.REACT_APP_REMOTE_URL + "/api/movies/"+id);
    return movie.data;
  }catch (err) {
    return null;
  }
}

export async function saveMovie(movie) {

  let movieInDb = {};
  if(movie._id){
    movieInDb = (await http.get(process.env.REACT_APP_REMOTE_URL + "/api/movies/"+movie._id)).data;
  }

  movieInDb.title = movie.title;
  movieInDb.genre = movie.genre;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  movieInDb.likedState = movie.likedState;

  let updatedMovie = {};
  if(movie._id){
    updatedMovie = await http.put(process.env.REACT_APP_REMOTE_URL + "/api/movies/"+movie._id,movieInDb);
  } else {
    updatedMovie = await http.post(process.env.REACT_APP_REMOTE_URL + "/api/movies/",movieInDb);
  }
 
  return updatedMovie;
}

export async function deleteMovie(id) {
  await http.delete(process.env.REACT_APP_REMOTE_URL + "/api/movies/"+id);
}
