import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "./interfaces";

export default {
  async getMovies(searchQuery: string, page = 0): Promise<AxiosResponse<any>> {
    return axios.get<Movie>(`http://www.omdbapi.com/?apikey=d2e9bfa0&s=${searchQuery}&page=${page}`);
  },

  async getMovie(id: string): Promise<AxiosResponse<Movie>> {
    return axios.get<Movie>(`https://openlibrary.org${id}.json`);
  }
}