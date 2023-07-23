<script>
import Sidebar from "../components/Sidebar.vue";

export default {
    name: "Navbar",

    components: {
        Sidebar,
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

            <svg v-if="!isOpen" @click="ToggleMenu" class="mr-4 cursor-pointer md:hidden" xmlns="http://www.w3.org/2000/svg"
                width="22" height="20" viewBox="0 0 14 12" fill="none">
                <path d="M1 11H13M1 6H13M1 1H13" stroke="#80848F" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>

            <svg v-else @click="ToggleMenu" class="mr-4 cursor-pointer md:hidden" xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" viewBox="0 0 11 11" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M10.7915 1.21427C10.8575 1.1483 10.9099 1.06997 10.9457 0.983744C10.9815 0.89752 10.9999 0.805093 11 0.71174C11.0001 0.618388 10.9817 0.525939 10.9461 0.43967C10.9104 0.353402 10.8581 0.275004 10.7921 0.208954C10.7261 0.142903 10.6478 0.0904931 10.5616 0.0547157C10.4754 0.0189383 10.3829 0.000494322 10.2896 0.000436945C10.1962 0.000379568 10.1038 0.0187099 10.0175 0.0543812C9.93125 0.0900526 9.85285 0.142366 9.7868 0.208336L5.49991 4.4953L1.21425 0.208336C1.08086 0.0749406 0.899938 -1.40555e-09 0.711292 0C0.522646 1.40555e-09 0.341726 0.0749406 0.208332 0.208336C0.0749393 0.341731 1.40553e-09 0.522654 0 0.711303C-1.40552e-09 0.899953 0.0749393 1.08088 0.208332 1.21427L4.49523 5.5L0.208332 9.78573C0.142283 9.85178 0.0898895 9.93019 0.0541438 10.0165C0.018398 10.1028 0 10.1953 0 10.2887C0 10.3821 0.018398 10.4746 0.0541438 10.5609C0.0898895 10.6472 0.142283 10.7256 0.208332 10.7917C0.341726 10.9251 0.522645 11 0.711292 11C0.8047 11 0.897194 10.9816 0.983491 10.9459C1.06979 10.9101 1.1482 10.8577 1.21425 10.7917L5.49991 6.5047L9.7868 10.7917C9.9202 10.9249 10.1011 10.9997 10.2896 10.9996C10.4781 10.9994 10.6589 10.9244 10.7921 10.791C10.9253 10.6576 11.0001 10.4768 11 10.2883C10.9999 10.0997 10.9249 9.91896 10.7915 9.78573L6.50459 5.5L10.7915 1.21427Z"
                    fill="#80848F" />
            </svg>
        </div>
    </nav>

    <div v-if="isOpen && isMobile" class="flex justify-end w-[100vw] h-[100vh] bg-white">
        <Sidebar />
    </div>
</template>

