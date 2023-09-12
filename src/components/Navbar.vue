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

            breakpoint: 935,
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
            this.isMobile = window.innerWidth <= this.breakpoint;
        },
    },

    watch: {
        $route(to, from) {
            if (this.isMobile) {
                this.isOpen = false;
            };
        }
    }
}
</script>

<template>
    <nav class="h-[10vh] pb-px">
        <div class="bg-white nav-shadow flex justify-between 2md:justify-end items-center h-full">
            <a href="/home">
                <img class="w-7 ml-4 2md:mr-4" src="../assets/images/acLogo.svg" alt="AvacaduLogo">
            </a>

            <menu-icon v-if="!isOpen" @click="ToggleMenu"
                class="mr-4 cursor-pointer 2md:hidden text-ava-gray hover:text-ava-black transition" />

            <close-icon v-else @click="ToggleMenu"
                class="mr-4 cursor-pointer 2md:hidden text-ava-gray hover:text-ava-black transition" />
        </div>
    </nav>

    <div v-if="isOpen && isMobile" class="flex justify-end w-[100vw] h-[100vh] bg-white">
        <Sidebar />
    </div>
</template>

<style scoped>
.nav-shadow {
    box-shadow: 0px 1px 2px 0px rgba(184, 184, 184, 0.25);
}
</style>
