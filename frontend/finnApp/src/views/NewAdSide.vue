<template>
  <section class="view-card" v-if="usersStore.isLoggedIn">
    <h1>Lag annonse</h1>
    <p>Opprett en ny annonse og del den med andre.</p>

    <!-- @submit.prevent stops the browser from reloading the page on submit. -->
    <form @submit.prevent="submit">
      <label for="title">Tittel</label>
      <input id="title" v-model="form.title" type="text" required />

      <label for="price">Pris (kr)</label>
      <input
        id="price"
        v-model.number="form.price"
        type="number"
        min="0"
        required
      />

      <label name="category"> Kategori </label>
      <select v-model="form.category" name="categories" id="">
        <option value="" selected disabled>Velg Kategori</option>
        <option value="Fartøy">Fartøy</option>
        <option value="Elektronikk">Elektronikk</option>
        <option value="Klær">Klær</option>
        <option value="Møbler">Møbler</option>
        <option value="Fritid">Fritid</option>
        <option value="Sport">Sport</option>
      </select>

      <label>
        Sted
        <input v-model="form.location" type="text" required />
      </label>
      <label>
        Bilde-URL
        <input v-model="form.imageUrl" type="text" required />
      </label>

      <label>
        Beskrivelse
        <textarea
          v-model="form.description"
          required
          maxlength="500"
        ></textarea>
      </label>

      <button type="submit">Publiser annonse</button>
    </form>
  </section>
  <section v-else>Du må logge deg inn eller skape ny bruker</section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAdsStore } from '@/stores/ads';
import { v7 as uuidv7 } from 'uuid';
import { useUsersStore } from '@/stores/users';

const router = useRouter();
const adsStore = useAdsStore();
const usersStore = useUsersStore();

// Holds what the user types. Starts empty each time the page opens.
const form = reactive({
  title: '',
  price: 0,
  category: "",
  location: '',
  description: '',
  imageUrl: '',
});

// Saves the ad, then sends the user to the home page to see it in the list.
function submit() {
  adsStore.create({
    title: form.title,
    price: form.price,
    category: form.category,
    location: form.location,
    description: form.description,
    imageUrl: form.imageUrl, // use the image URL from the form
    userId: usersStore.user!.userId,
    adId: uuidv7(),
  });

  console.log("FØR ENDRING: ", usersStore.user!.ads, "\n", usersStore.user!.userId);
  usersStore.user!.ads = adsStore.items.filter(item => item.userId === usersStore.user!.userId);
  console.log("ETTER ENDRING: ", usersStore.user!.ads, "\n", usersStore.user!.userId);
  router.push('/');
}
</script>

<style scoped>
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

/* Stack the fields so each label and its input sit on their own line. */
form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
button {
  background-color: #1d4ed8;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
textarea {
  resize: none;
  min-height: 150px;
}
input,
textarea,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
