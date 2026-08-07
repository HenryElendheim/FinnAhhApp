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
import { useRouter } from 'vue-router'
import type { User } from '@/types/models';
import { load, save } from '../lib/storage.ts';
import { createCollection } from '@/lib/storage';
import { v7 as uuidv7 } from "uuid";
import { useUsersStore } from '@/stores/users.ts';

const router = useRouter();
const usersStore = useUsersStore();
const loggingInUser = reactive({
    email: "",
    password: ""
});

const users = createCollection<User>("users");


function submit() {
    console.log("registerings!");
    // const currentUsers = usersStore.load();
    usersStore.create({
        name: "loggingInUser.name",
        email: loggingInUser.email,
        password: loggingInUser.password,
        ads: []
    })
    router.push('/')
}

</script>

<style scoped>
.view-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
</style>
