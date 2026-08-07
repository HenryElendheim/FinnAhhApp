<template>
    <section class="view-card">
        <h1>Registreringsside</h1>
        <form>
            <label>
                Navn
                <input v-model="loggingInUser.email" type="text" placeholder="Skriv inn navnet ditt" />
            </label>
            <label>
                E-post
                <input v-model="loggingInUser.email" type="email" placeholder="Skriv inn e-posten din" />
            </label>
            <label>
                Password
                <input v-model="loggingInUser.password" type="password" placeholder="Skriv inn passordet ditt" />
            </label>
            <label>
                Bekreft Password
                <input v-model="loggingInUser.password" type="password" placeholder="Bekreft passordet ditt" />
            </label>
        </form>
    </section>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { defineStore } from 'pinia'
import type { User } from '@/types/models';
import { load, save } from '../lib/storage.ts';
import { createCollection } from '@/lib/storage';
import { v7 as uuidv7 } from "uuid";

const loggingInUser: User = reactive({
    userId: "x9",
    name: "",
    email: "",
    createdAt: "",
    password: "",
    ads: []
});

const users = createCollection<User>("users");

const register = () => {
    console.log("registerings!");
    // users.push(loggingInUser);
    // save<User>("USERS", users);
}

const useUsersStore = defineStore('users', () => {
    const items = ref<User[]>([]);

    function load () { items.value = users.getAll() };
    function create(data: Omit<User, 'userId' | 'createdAt'>) {
        users.add({ ...data, userId: uuidv7(), createdAt: new Date().toISOString() })
        load()
    }

    // Removes a user by id and refreshes state.
  function remove(id: string) {
    users.remove(id)
    load()
  }

  return { items, load, create, remove }
})

</script>

<style scoped>
.view-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
</style>
