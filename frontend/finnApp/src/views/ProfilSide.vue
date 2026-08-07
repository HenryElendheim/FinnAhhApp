<template>
  <section class="view-card">
    <h1>Profil</h1>
    <p>Her finner du innstillinger og informasjon om profilen din.</p>
    <button @click="router.push('/login')">Logg inn</button>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
</style>
