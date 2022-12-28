<template>
  <b-input-group class="mt-3">
    <b-form-input placeholder="Find your favorite movie..." v-model="searchQuery"></b-form-input>
    <b-input-group-append>
      <b-button variant="primary" @click="fetchMovies()">Search</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const searchQuery = computed({
      get() {
        return store.state.searchQuery
      },
      set(value) {
        store.commit('setSearchQuery', value);
      },
    });

    function fetchMovies() {
      store.dispatch("loadMovies");
    }

    return {
      fetchMovies,
      searchQuery
    }
  }
})
</script>