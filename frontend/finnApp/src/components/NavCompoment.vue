<template>
  <div class="navbar">
    <header class="navbarHeader">
      <router-link to="/" class="brand">Finn</router-link>

      <nav class="nav-links">
        <router-link to="/new-ad" class="nav-link">Ny annonse</router-link>
        <router-link to="/messages" class="nav-link">Meldinger</router-link>
        <router-link to="/profile" class="nav-link">Min Finn</router-link>
      </nav>
    </header>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.navbar {
  width: 100%;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbarHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.brand {
  font-size: 1.25rem;
  font-weight: 800;
  color: #2563eb;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  max-width: 500px;
  justify-content: flex-end;
}

.nav-link {
  color: #334155;
  text-decoration: none;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: #eff6ff;
  color: #2563eb;
}

.nav-link.router-link-active {
  background: #2563eb;
  color: #ffffff;
}

@media (max-width: 640px) {
  .navbarHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .nav-links {
    width: 100%;
  }
}
</style>
