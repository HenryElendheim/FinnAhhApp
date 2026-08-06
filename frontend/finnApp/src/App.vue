<script setup lang="ts">
import NavCompoments from './components/NavCompoments.vue';
</script>

<template>
  <div class="app-shell">
    <NavCompoments />

    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f8fafc;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>
