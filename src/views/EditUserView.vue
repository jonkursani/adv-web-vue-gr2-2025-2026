<script setup>
import AppCard from '@/components/ui/AppCard.vue';
import UserForm from '@/components/UserForm.vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
// const { push } = useRouter();

const route = useRoute();
const userId = route.params.id;

function loadUser() {
    console.log('loadUser', userId);
    // try catch
    // nese se gjen
    // navigo te home (ose lista me usera)
    // $router
    router.push({ name: 'home' })
}

</script>

<template>
    <AppCard>
        <template #header>
            <h5>Edit user {{ userId }}</h5>
        </template>

        <!-- $route perdoret vetem ne template, useRoute() ne script -->
        <!-- <h1>UserId: {{ $route.params.id  }}</h1> -->
        <!-- <h1>UserId: {{ userId }}</h1> -->
        <UserForm is-edit />
        <button @click="$router.go(-1)">Go back</button>
    </AppCard>
</template>

<style scoped></style>