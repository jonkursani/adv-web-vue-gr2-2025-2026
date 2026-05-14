<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function goToUser(id) {
    router.push({
        name: 'edit-user',
        // params: { id: id }
        params: { id }
    })
}
</script>

<template>
    <h1>Home</h1>
    <!-- <a href=""></a> -->
    <!-- <RouterLink to="/about">About</RouterLink> -->
    <RouterLink :to="{ name: 'about' }">About</RouterLink>
    <!-- $router perdoret vetem ne template -->
    <button @click="$router.push({ name: 'about' })">Go to about</button>
    <br>
    <RouterLink to="/users/1">Edit user with path 1</RouterLink>
    <br>
    <RouterLink :to="{ 
        name: 'edit-user', 
        params: { id: 2 }
    }">
        Edit user 2 with params
    </RouterLink>
    <br>
    <button @click="goToUser(3)">Edit user 3 with button</button>
</template>

<style scoped></style>