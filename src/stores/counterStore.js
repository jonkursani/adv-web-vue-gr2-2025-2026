import { defineStore } from "pinia";
import { computed, ref } from "vue";

// defineStore accepts a unique name as the first argument and a function that returns the state, actions, and getters as the second argument.
export const useCounterStore = defineStore('counter', () => {
    // State - reactive data that can be shared across components
    const count = ref(0)
    const message = ref("Hello, Pinia!")

    // Actions - functions that can modify the state
    function increment() {
        count.value++;
    }

    // Getters - computed properties that derive state
    const doubleCount = computed(() => count.value * 2)

    return {
        count,
        message,
        increment,
        doubleCount
    }
})