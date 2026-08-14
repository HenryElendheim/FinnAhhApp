<template>
  <section class="view-card">
    <h1>Profil</h1>
    <p>Her finner du innstillinger og informasjon om profilen din.</p>
    <div v-if="userStore.isLoggedIn">
      <img src="/public/user.png" alt="profile picture" />
      <p>Velkommen, {{ capitalizedName }}!</p>

      <h2>Mine annonser</h2>
      <p v-if="myAds.length === 0">Du har ingen annonser.</p>
      <ul v-else class="ads-list">
        <li v-for="ad in myAds" :key="ad.adId">
          <RouterLink :to="`/ad/${ad.adId}`">{{ ad.title }}</RouterLink>
          <span>{{ ad.price }} kr</span>
        </li>
      </ul>
      <button @click="userStore.logout()">Logg ut</button>
    </div>
    <div v-else>
      <p>Du er ikke logget inn.</p>
      <button @click="router.push('/login')">Logg inn</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { useAdsStore } from '@/stores/ads';

const userStore = useUsersStore();
const adsStore = useAdsStore();

const router = useRouter();

const myAds = computed(() =>
  adsStore.items.filter((ad) => ad.userId === userStore.user?.userId),
);

const capitalizedName = userStore.user?.name
  ? userStore.user.name.charAt(0).toUpperCase() + userStore.user.name.slice(1)
  : '';

onMounted(() => {
  adsStore.load();
});
</script>

<style scoped>
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.ads-list {
  padding: 0;
  list-style: none;
}

.ads-list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}
</style>
