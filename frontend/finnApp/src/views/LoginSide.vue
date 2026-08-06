<template>
    <section class="view-card">
        <h1>Log inn</h1>

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
        <p>Ikke bruker? <button>Registrer deg nå!</button></p>
    </section>
    <h1>Regitrer</h1>

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
        <p>Ikke bruker? <button>Registrer deg nå!</button></p>
    <section>

    </section>
</template>

<script lang="ts" setup>
const login = () => {
    console.log('login');
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
