<template>
    <div class=forms-container v-if="!areLoggedIn">


        <section class="view-card" v-if="loginActive">

            <h1>Logg inn</h1>

            <form>
                <div>
                    <label>E-post</label>
                    <input type="email" placeholder="E-post" />
                    <br />
                    <label>Passord</label>
                    <input type="password" placeholder="Passord" />
                </div>
                <button type="submit" @click.prevent="login">Logg inn</button>
            </form>

            <p>Ikke bruker? <button type="button" @click="loginActive = !loginActive">Registrer deg nå!</button></p>
        </section>
        <section class="view-card" v-else>
            <h1>Registrer</h1>

            <form>
                <label>
                    Navn
                    <input v-model="loggingInUser.name" type="text" placeholder="Skriv inn navnet ditt" />
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
                    <input v-model="loggingInUser.confirmPassword" type="password"
                        placeholder="Bekreft passordet ditt" />
                </label>
                <button type="submit" @click.prevent="submit">
                    Registrer
                </button>
            </form>
            <p>har du bruker? <button type="button" @click="loginActive = !loginActive">Logg inn!</button></p>

        </section>
    </div>
    <div v-else>
        <h1>Du er logget inn!</h1>
        <h2>Hei! pa deg</h2>
        <!-- <h3>{{ loggingInUser.name }}</h3> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { User } from '@/types/models';
import { load } from '../lib/storage.ts';
import { v7 as uuidv7 } from "uuid";
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users.ts';

const loggingInUser = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});

// const loggingInUser: User = reactive({
//     userId: "x9",
//     name: "",
//     email: "",
//     createdAt: "",
//     password: "",
//     ads: []
// });

const users: User[] = load<User>("USERS") ?? [];

const router = useRouter();
const usersStore = useUsersStore();

function submit() {
    console.log("registerings!");
    // const currentUsers = usersStore.load();
    if (loggingInUser.password === loggingInUser.confirmPassword) {
        usersStore.create({
            name: loggingInUser.name,
            email: loggingInUser.email,
            password: loggingInUser.password,
            ads: []
        })
        router.push('/')
        return;
    }
    console.log("Passordene passer ikke sammen :( y would u do that...");
}
const login = () => {
    console.log('login');
    // const sjekkings = JSON.parse(localStorage.getItem("users"));
    // const matchingUsers = users.filter(user => user.email === loggingInUser.email);
    // const onlyOne = () => {
    //     if (matchingUsers.length > 1) {
    //         console.log("Flere enn en bruker har denne mailen, dette er feil.");
    //         return;
    //     }
    //     return matchingUsers[0];
    // };
}
const loginActive = ref<boolean>(true);
const areLoggedIn = ref<boolean>(false);
</script>

<style scoped>
.view-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.view-card h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    align-self: center;
    align-items: center;
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

p {
    text-align: center;
}

p button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
}
</style>
