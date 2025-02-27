<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <nav class="text-center text-xl my-20 font-bold gap">
      <RouterLink class="mx-10" to="/">Login</RouterLink>
      |
      <RouterLink class="mx-10" to="/register">Register</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.router-link-active, .router-link-active {
  color: green
}
</style>
