<script setup lang="ts">
import HelloWorld from '@components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="flex justify-between items-center">
      <HelloWorld msg="You did it!" />
      <nav class="flex justify-between gap-x-10 items-center border-2 border-gray-200 rounded-md">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
