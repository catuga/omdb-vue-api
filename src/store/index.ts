import omdbService from '@/omdbService';
import { createStore } from 'vuex'
import type { Movie } from '@/interfaces';
import router from '@/router';

const state = {
  isLoading: false,
  error: "",
  movies: new Array<Movie>(),
  currentPage: 1,
  searchQuery: "",
  route: null
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
    setPage: (state, page: number) => state.currentPage = page,
    setRoute: (state: any, route: any) => state.route = route
  },
  actions: {
    async loadMovies({ state, commit }) {
      try {
        commit("setLoading");
        const response = await omdbService.getMovies(state.searchQuery, state.currentPage);
        if (response.status === 200) {
          commit("setMovies", response.data.Search);
          if (state.route !== '/results') router.push('/results');
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
    },
    getRoute(state, getters, rootState) {
      return rootState.route;
    }
  }
});

