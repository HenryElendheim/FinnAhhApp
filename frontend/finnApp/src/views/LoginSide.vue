<template>
  <div class="forms-container" v-if="!loggedInState">
    <section class="view-card" v-if="loginPageActive">
      <h1>Logg deg inn</h1>

      <form>
        <div>
          <label for="login">E-post</label>
          <input
            v-model="loggingInUser.email"
            type="text"
            placeholder="E-post"
          />
          <br />
          <label for="password">Passord</label>
          <input
            v-model="loggingInUser.password"
            type="text"
            placeholder="Passord"
          />
        </div>
        <p
          v-if="errorMessage.message.length > 5"
          class="errorMessage"
          v-html="errorMessage.message"
        ></p>
        <button type="submit" @click.prevent="login">Logg inn</button>
      </form>

      <p>
        Ikke bruker?
        <button
          type="button"
          @click="
            loginPageActive = !loginPageActive;
            errorMessage.message = '';
          "
        >
          Registrer deg nå!
        </button>
      </p>
    </section>
    <section class="view-card" v-else>
      <!--REGISTRERING-->
      <h1>Registrer</h1>
      <p
        v-if="errorMessage.message.length > 5"
        class="errorMessage"
        v-html="errorMessage.message"
      ></p>

      <form class="register-form">
        <div>
          <label for="name"> Navn </label>
          <input
            v-model="loggingInUser.name"
            type="text"
            placeholder="Skriv inn navnet ditt"
          />
          <br />
          <label for="email"> E-post </label>
          <input
            v-model="loggingInUser.email"
            type="text"
            placeholder="Skriv inn e-posten din"
          />
          <br />
          <label for="password"> Password </label>
          <input
            v-model="loggingInUser.password"
            type="text"
            placeholder="Skriv inn passordet ditt"
          />
          <br />

          <label for="confirmPassword"> Bekreft Password </label>
          <input
            v-model="loggingInUser.confirmPassword"
            type="text"
            placeholder="Bekreft passordet ditt"
          />
        </div>
        <button for="register" type="submit" @click.prevent="submit">
          Registrer
        </button>
      </form>
      <p>
        har du bruker?
        <button
          for="login"
          type="button"
          @click="
            loginPageActive = !loginPageActive;
            errorMessage.message = '';
          "
        >
          Logg inn!
        </button>
      </p>
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
import { v7 as uuidv7 } from 'uuid';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users.ts';
import type { _ } from 'vue-router/dist/index-BN0B0y8a.js';

const loginPageActive = ref<boolean>(true);
const loggedInState = ref<boolean>(false);
// const emit = defineEmits<{
//     (e: 'login', user: User): void;
// }>();

const errorMessage = reactive({
  message: '',
});

const loggingInUser = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const router = useRouter();
const usersStore = useUsersStore();

function submit() {
  console.log('registerings!');
  // const currentUsers = usersStore.load();
  errorMessage.message = ``;
  const users = getLocalUsers();

  if (
    users
      .map((user) => {
        return user.name === loggingInUser.name &&
          user.email === loggingInUser.email
          ? true
          : false;
      })
      .some((existAlready) => existAlready === true)
  ) {
    setErrorMessage(`Bruker med samme navn og mail finnes allerede.`);
    return;
  }
  if (loggingInUser.password !== loggingInUser.confirmPassword) {
    setErrorMessage(`Passord er ikke riktig.`);
  }

  if (loggingInUser.password === loggingInUser.confirmPassword) {
    usersStore.create({
      name: loggingInUser.name,
      email: loggingInUser.email,
      password: loggingInUser.password,
      ads: [],
    });
    const registeredUser = usersStore.items.find(
      (user) => user.email === loggingInUser.email,
    );
    if (registeredUser !== undefined) {
      usersStore.user = registeredUser;
      usersStore.setLoggedIn(true);
    }
    router.push('/profile');
    return;
  }
  errorMessage.message = `Passord og bekreftelse må staves likt.`;
  console.log('Passordene passer ikke sammen :( y would u do that...');
}

const login = () => {
  console.log('login');
  errorMessage.message = ``;
  const users = getLocalUsers();

  const doTheyExist = users.map(
    (user) =>
      user.email === loggingInUser.email &&
      user.password === loggingInUser.password,
  );

  console.log(
    users.map(
      (user) =>
        user.email +
        ' === ' +
        loggingInUser.email +
        ' ? ' +
        (user.email === loggingInUser.email),
    ),
  );

  if (doTheyExist.some((f) => f === true) === false) {
    errorMessage.message = `Denne brukeren er ikke registrert fra før av. Lag en ny bruker?`;
    console.log('They dont fucking exist!!!');
    return;
  }
  const checkedUser = users.filter(
    (user) =>
      user.email === loggingInUser.email &&
      user.password === loggingInUser.password,
  )[0];
  if (checkedUser === undefined) return;
  console.log('Sjekk ferdig! Ikke endret ennå...', usersStore.user);
  usersStore.user = checkedUser;
  console.log('Sjekk ferdig! Endring???...', usersStore.user);
  router.push('/profile');
  usersStore.setLoggedIn(true);
};

const getLocalUsers = (): User[] => {
  return load<User>('users');
};

const setErrorMessage = (newMessage: string) => {
  errorMessage.message = newMessage;
};
</script>

<style scoped>
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px #0f172a0f;
}

.errorMessage {
  padding: 0;
  margin: 0;
  color: #007bff;
  filter: hue-rotate(-30deg) brightness(1.4) saturate(0.7);
  font-family: monospace;
  /* filter: hue-rotate(105deg) saturate(0.7); */
  /* font-family: Arial, Helvetica, sans-serif; */
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
  align-content: center;
  justify-content: center;
}
form div {
  display: flex;
  flex-direction: column;
  gap: 0.01rem;
}
.register-form {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
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
