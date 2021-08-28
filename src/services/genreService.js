import http from "./httpService";

export async function getGenres() {
  const genres = await http.get(process.env.REACT_APP_REMOTE_URL + "/api/genres");
  return genres.data;
}