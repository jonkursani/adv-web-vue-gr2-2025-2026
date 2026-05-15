<script setup>
import AppCard from '@/components/ui/AppCard.vue';
import { useCounterStore } from '@/stores/counterStore';
import { useRouter } from 'vue-router';

const router = useRouter()

function goToUser(id) {
    router.push({
        name: 'edit-user',
        // params: { id: id }
        params: { id }
    })
}

const counterStore = useCounterStore()
</script>

<template>
    <AppCard>
        <template #header>
            <h5>Home</h5>
        </template>

        <!-- <a href=""></a> -->
        <!-- <RouterLink to="/about">About</RouterLink> -->
        <RouterLink :to="{ name: 'about' }"
            class="btn btn-outline-secondary"
        >
            About
        </RouterLink>
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
        <button class="btn btn-primary" @click="goToUser(3)">Edit user 3 with button</button>

        <!-- Store -->
        <p>Count: {{ counterStore.count }}</p>
        <p>Double count: {{ counterStore.doubleCount }}</p>
        <p>Message: {{ counterStore.message }}</p>
        <button class="btn btn-outline-primary" @click="counterStore.increment">Increment</button>
    </AppCard>
</template>

<style scoped></style>