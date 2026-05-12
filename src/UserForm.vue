<script setup>
import { reactive } from 'vue';

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['submitForm'])

const user = reactive({
    name: '',
    email: '',
    isActive: true
})

function handleSubmit() {
    const userData = {
        name: user.name,
        email: user.email
    }
    // objektin dergoje te prindi
    emit('submitForm', userData)
}
</script>

<template>
    <!-- <h1>User Form</h1> -->
    <h1>{{ isEdit ? 'Edit User' : 'Add User' }}</h1>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="user.name" required />
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" required />
        </div>
        <div v-if="isEdit">
            <input type="checkbox" id="checkbox" v-model="user.isActive" />
            <label for="checkbox">Is Active</label>
        </div>

        <button type="submit">Submit</button>
    </form>
</template>

<style scoped></style>