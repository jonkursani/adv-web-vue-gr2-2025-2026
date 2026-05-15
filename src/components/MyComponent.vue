<!-- Komponenta osht ni .vue file -->
<!-- SFC -->
<!-- Composition API -->
<script setup>
// const props = defineProps(['title', 'description']);
// const props = defineProps({
//     title: String,
//     description: String,
//     age: Number
// });
const props = defineProps({
    // title: {
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    // age: {
    //     type: Number,
    //     default: 20
    // }
    post: {
        type: Object,
        required: true
    }
})
// dergimi i te dhenave prej prindit tek femija behet me props
// ndersa dergimi i te dhenave prej femijes tek prindi behet me events
const emit = defineEmits(['readMore', 'anotherEvent'])

function readMore() {
    console.log('Read more clicked');
    const mesazhi = "Test"
    emit('readMore', mesazhi)
}
</script>

<!-- Html -->
<template>
    <!-- <h1>My Component</h1> -->
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
    <p>Created at: {{ post.createdAt }}</p>
    <!-- <button @click="emit('readMore', 'Test')">Read more</button> -->
    <button @click="readMore">Read more</button>

    <!-- named slots -->
    <slot name="butonat"></slot>

    <!-- placeholder per content qe ka mu renderu -->
    <slot />

    <hr>

    <slot name="emriSlotit" />
</template>

<!-- Style -->
<style scoped></style>