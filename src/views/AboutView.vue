<script setup>
import AppCard from '@/components/ui/AppCard.vue';
import { useCounterStore } from '@/stores/counterStore';

const counterStore = useCounterStore()
</script>

<template>
    <AppCard>
        <template #header>
            <h5>About</h5>
        </template>
        
        <RouterLink to="/">Home</RouterLink>

        <!-- Store -->
        <p>Count: {{ counterStore.count }}</p>
        <p>Double count: {{ counterStore.doubleCount }}</p>
        <p>Message: {{ counterStore.message }}</p>
        <button @click="counterStore.increment">Increment</button>
    </AppCard>
</template>

<style scoped></style>