import omdbService from '@/omdbService';
import { createStore } from 'vuex'
import type { Movie } from '@/interfaces';

const state = {
  isLoading: false,
  error: "",
  movies: new Array<Movie>(),
  currentPage: 1,
  searchQuery: ""
};

export type State = typeof state;

export default createStore({
  state,
  mutations: {
    setLoading: (state) => state.isLoading = true,
    clearBusy: (state) => state.isLoading = false,
    setError: (state, value) => state.error = value,
    setMovies(state, movies) {
      state.movies.splice(0, state.movies.length, ...movies);
    },
    setSearchQuery: (state, searchQuery: string) => state.searchQuery = searchQuery,
    setPage: (state, page: number) => state.currentPage = page
  },
  actions: {
    async loadMovies({ state, commit }) {
      try {
        commit("setLoading");
        const response = await omdbService.getMovies(state.searchQuery, state.currentPage);
        if (response.status === 200) {
          commit("setMovies", response.data.Search);
        }
      } catch {
        commit("setError", "Failed to load movies");
      } finally {
        commit("clearBusy");
      }
    }
  },
  getters: {
    findBook: (state: State) => (imdbID: string): Movie | undefined => {
      return state.movies.find(b => b.imdbID === imdbID);
    }
  }
});

