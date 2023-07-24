<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

</script>

<script>
export default {

    data() {
        return {
            isMobile: false,
        };
    },

    mounted() {
        // Check if we are in mobile mode when the component is mounted
        this.CheckIsMobile();

        // Add an event listener to update isMobile when the window is resized
        window.addEventListener('resize', this.CheckIsMobile);
    },
    beforeUnmount() {
        // Remove the event listener when the component is unmounted
        window.removeEventListener('resize', this.CheckIsMobile);
    },

    methods: {
        CheckIsMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
    },
}
</script>

<template>
    <div v-if="$route.name === 'login'">
        <RouterView />
    </div>

    <div v-else>
        <div class="flex flex-col">

            <Navbar />

            <div class="flex justify-between">
                <div class="bg-ava-panel-bg-gray p-4 w-full h-[90vh]">
                    <RouterView />
                </div>

                <Sidebar v-show="!isMobile" />
            </div>
        </div>
    </div>
</template>

<style>
body {
    @apply bg-ava-bg-gray
}
</style>
