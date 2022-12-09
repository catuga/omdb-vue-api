<template>
  <div class="container">
    <div v-if="currentView === 'search' || currentView === 'list'" class="search">
      <b-input-group class="mt-3">
        <b-form-input placeholder="Find your favorite movie..." v-model="search"></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" @click="fetchMovies(search)">Search</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <div v-if="currentView === 'list'" class="list">
      <h1>
        <span>Search Results</span>
        <b-button variant="outline-primary" @click="fetchMovies(search, 'back')" class="prev">Back</b-button>
        <b-button @click="fetchMovies(search, 'next')" variant="outline-primary" class="next">Next</b-button></h1>
      <b-list-group>
        <b-list-group-item v-for="(movie, index) in list" :key="index" href="#" @click="searchDetail(movie.imdbID)">
          <span>{{ movie.Title }} ({{ movie.Year }})</span>
        </b-list-group-item>
      </b-list-group>
      <p class="page">Page: {{ searchPage }}</p>
    </div>

    <div v-if="currentView === 'detail'" class="detail">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img :src="selectedMovie.Poster" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body :title="selectedMovie.Title">
              <b-card-text>
                <b-list-group horizontal>
                  <b-list-group-item>{{ selectedMovie.Year }}</b-list-group-item>
                  <b-list-group-item>{{ capitalized(selectedMovie.Type) }}</b-list-group-item>
                  <b-list-group-item>{{ selectedMovie.Runtime }}</b-list-group-item>
                </b-list-group>
                {{ selectedMovie.Plot }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-button class="back-btn" @click="back">Back</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MoviesComponent',
  data() {
    return {
      currentView: 'search',
      selectedMovie: {},
      list: [],
      search: '',
      searchPage: 1
    }
  },
  methods: {
    back() {
      this.currentView = 'list';
    },
    capitalized(name) {
      const capitalizedFirst = name[0].toUpperCase();
      const rest = name.slice(1);

      return capitalizedFirst + rest;
    },
    fetchMovies(search, nextOrBack) {
      if (nextOrBack === 'next') {
        this.searchPage = this.searchPage + 1;
      } else if (nextOrBack === 'prev' && this.searchPage - 1 < 1) {
        this.searchPage = this.searchPage - 1;
      } else {
        this.searchPage = 1;
      }
      axios
        .get(`http://www.omdbapi.com/?apikey=d2e9bfa0&s=${search}&page=${this.searchPage}`)
        .then(response => {
          if (response && response.data && response.data.Search) {
            this.list = response.data.Search
          }
        })
        .then(() => (this.currentView = 'list'))
    },
    searchDetail(id) {
      axios
        .get(`http://www.omdbapi.com/?apikey=d2e9bfa0&i=${id}`)
        .then(response => {
          if (response && response.data) {
            this.selectedMovie = response.data;
          }
        })
        .then(() => (this.currentView = 'detail'))
    }
  }
}
</script>

<style>
.container {
  margin-bottom: 100px;
}

.list .list-group-item,
.list h1,
.list-group-item,
.detail .card-title,
.detail .card-text {
  text-align: left;
}

.list h1 {
  margin-top: 50px;
  margin-bottom: 70px;
  font-weight: 700;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
}

.list h1 .prev {
  margin-right: 5px;
}

.list h1 .next {
  margin-left: 5px;
}

.list .list-group-item {
  border-top: none;
  border-left: none;
  border-right: none;
  padding-left: 0;
}

.list .page {
  text-align: left;
  margin-top: 10px;
}

.detail .card-title {
  margin-bottom: 0;
}

.detail .list-group {
  margin-bottom: 10px;
  justify-content: start;
}

.detail .list-group .list-group-item {
  border: none;
}

.detail .list-group .list-group-item:first-of-type {
  padding-left: 0;
}

.detail .back-btn {
  float: left;
  margin-top: 10px;
  width: 100px;
}
</style>