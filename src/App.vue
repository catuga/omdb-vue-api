<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header>
      <div>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/results">Listado</RouterLink>
          <RouterLink to="/detail">Detalle</RouterLink>
        </nav>
      </div>
    </header>
  
    <RouterView />
  </div>
</template>

<style></style>