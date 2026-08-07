<template>
    <div class=forms-container v-if="!loggedInState">


        <section class="view-card" v-if="loginPageActive">

            <h1>Logg inn</h1>

            <form>
                <div>
                    <label>E-post</label>
                    <input type="text" placeholder="E-post" v-model="loggingInUser.name"/>
                    <br />
                    <label>Passord</label>
                    <input type="text" placeholder="Passord" v-model="loggingInUser.password"/>
                </div>
                <button type="submit" @click.prevent="login">Logg inn</button>
            </form>

            <p>Ikke bruker? <button type="button" @click="loginPageActive = !loginPageActive">Registrer deg nå!</button>
            </p>
        </section>
        <section class="view-card" v-else> <!--REGISTRERING-->
            <h1>Registrer</h1>

            <form>
                <label>
                    Navn
                    <input v-model="loggingInUser.name" type="text" placeholder="Skriv inn navnet ditt" />
                </label>
                <label>
                    E-post
                    <input v-model="loggingInUser.email" type="text" placeholder="Skriv inn e-posten din" />
                </label>
                <label>
                    Password
                    <input v-model="loggingInUser.password" type="text" placeholder="Skriv inn passordet ditt" />
                </label>
                <label>
                    Bekreft Password
                    <input v-model="loggingInUser.confirmPassword" type="text"
                        placeholder="Bekreft passordet ditt" />
                </label>
                <button type="submit" @click.prevent="submit">
                    Registrer
                </button>
            </form>
            <p>har du bruker? <button type="button" @click="loginPageActive = !loginPageActive">Logg inn!</button></p>

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

const loginPageActive = ref<boolean>(true);
const loggedInState = ref<boolean>(false);

const loggingInUser = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});

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
        router.push('/profile')
        return;
    }
    console.log("Passordene passer ikke sammen :( y would u do that...");
}
const login = () => {
    console.log('login');
    const localUsers = localStorage.getItem("users");
    let users: User[];
    if (localUsers === null) users = [];
    else users = JSON.parse(localUsers);

    const yy = users.filter(savedUser =>
        loggingInUser.email === savedUser.email
        && loggingInUser.password === savedUser.password
    );

    console.log(loggingInUser.email, " === ", users[4]?.email, " ? => ", loggingInUser.email === users[4]?.email)

    console.log(loggedInState.value);
    console.log(yy);
    router.push('/profile')
}

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
