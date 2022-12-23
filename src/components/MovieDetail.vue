<template>
  <div class="detail">
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img :src="(selectedMovie.Poster as string) || 'https://m.media-amazon.com/images/M/MV5BMTMxMjQ1MjA5Ml5BMl5BanBnXkFtZTcwNjIzNjg1Mw@@._V1_SX300.jpg'" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body :title="(selectedMovie.Title as string)">
            <b-card-text>
              <b-list-group horizontal>
                <b-list-group-item>{{ selectedMovie.Year }}</b-list-group-item>
                <!-- <b-list-group-item>{{ capitalized(selectedMovie.Type) }}</b-list-group-item> -->
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
</template>

<script lang="ts">
import type { MovieDetail } from '../interfaces'

export default {
  name: 'MovieDetail',
  data() {
    return {
      currentView: '',
      selectedMovie: {} as MovieDetail
    }
  },
  methods: {
    back() {
      this.currentView = 'list';
    },
    capitalized(name: string) {
      const capitalizedFirst = name[0].toUpperCase();
      const rest = name.slice(1);
      return capitalizedFirst + rest;
    }
  }
}
</script>