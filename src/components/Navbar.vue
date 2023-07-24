<script>
import menuIcon from "./icons/menuIcon.vue";
import Sidebar from "../components/Sidebar.vue";
import closeIcon from "../components/icons/closeIcon.vue";

export default {
    name: "Navbar",

    components: {
        Sidebar,
        menuIcon,
        closeIcon,
    },

    data() {
        return {
            isOpen: false,
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
        ToggleMenu() {
            this.isOpen = !this.isOpen;

            if (this.isOpen) {
                document.documentElement.style.overflow = 'hidden';
            } else {
                document.documentElement.style.overflow = 'auto';
            }
        },

        CheckIsMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
    },
}
</script>

<template>
    <nav class="bg-white h-[10vh]">
        <div class="flex justify-between md:justify-end items-center h-full">
            <img class="w-7 ml-4 md:mr-4" src="../assets/images/acLogo.svg" alt="AvacaduLogo">

            <menu-icon v-if="!isOpen" @click="ToggleMenu"
                class="mr-4 cursor-pointer md:hidden text-ava-gray hover:text-ava-black transition" />

            <close-icon v-else @click="ToggleMenu"
                class="mr-4 cursor-pointer md:hidden text-ava-gray hover:text-ava-black transition" />
        </div>
    </nav>

    <div v-if="isOpen && isMobile" class="flex justify-end w-[100vw] h-[100vh] bg-white">
        <Sidebar />
    </div>
</template>

