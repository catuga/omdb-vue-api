<template>
  <SearchBar />
  <div class="list">
    <h1>
      <span>Search Results</span>
      <b-button variant="outline-primary" @click="fetchMovies(search, 'back')" class="prev">Back</b-button>
      <b-button @click="fetchMovies(search, 'next')" variant="outline-primary" class="next">Next</b-button>
    </h1>
    <b-list-group>
      <b-list-group-item v-for="(movie, index) in list" :key="index" href="#"
        @click="searchDetail(movie.imdbID as string)">
        <span>{{ movie.Title }} ({{ movie.Year }})</span>
      </b-list-group-item>
    </b-list-group>
    <p class="page">Page: {{ searchPage }}</p>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import SearchBar from './SearchBar.vue'
import type { Movie } from '../interfaces'

export default {
  name: 'MoviesList',
  data() {
    return {
      currentView: 'search',
      list: [] as Movie[],
      search: '',
      searchPage: 1,
      selectedMovie: ''
    }
  },
  components: {
    SearchBar: SearchBar
  },
  methods: {
    fetchMovies(search: string, nextOrBack: string) {
      if (nextOrBack === 'next') {
        this.searchPage = this.searchPage + 1;
      } else if (nextOrBack === 'prev' && this.searchPage - 1 < 1) {
        this.searchPage = this.searchPage - 1;
      } else {
        this.searchPage = 1;
      }
      axios
        .get(`http://www.omdbapi.com/?apikey=d2e9bfa0&s=${search}&page=${this.searchPage}`)
        .then((response: any) => {
          if (response && response.data && response.data.Search) {
            this.list = response.data.Search
          }
        })
        .then(() => (this.currentView = 'list'))
    },
    searchDetail(id: string) {
      axios
        .get(`http://www.omdbapi.com/?apikey=d2e9bfa0&i=${id}`)
        .then((response: any) => {
          if (response && response.data) {
            this.selectedMovie = response.data;
          }
        })
        .then(() => (this.currentView = 'detail'))
    }
  }
}
</script>