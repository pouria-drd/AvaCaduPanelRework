<script>
import homeIcon from "../components/icons/homeIcon.vue";
import albumIcon from "../components/icons/albumIcon.vue";
import walletIcon from "../components/icons/walletIcon.vue";
import logoutIcon from "../components/icons/logoutIcon.vue";
import avacaduIcon from "../components/icons/avacaduIcon.vue";
import servicesIcon from "../components/icons/servicesIcon.vue";
import card2CardIcon from "../components/icons/card2CardIcon.vue";

export default {
    name: "Sidebar",

    components: {
        homeIcon,
        albumIcon,
        walletIcon,
        logoutIcon,
        avacaduIcon,
        servicesIcon,
        card2CardIcon,
    },

    data() {
        return {
            showWallet: false,
            showServices: false,


            rightNavClass: [
                "w-80",
                "bg-white",
                "2md:flex",
                "h-[90vh]",
                "nav-shadow",
                "items-center",
                "justify-between",
            ],
        };
    },

    methods: {
        ShowServices() {
            this.showServices = !this.showServices;
        },

        ShowWallet() {
            this.showWallet = !this.showWallet;
        },

        // TODO: Aler Confirmation.
        Logout() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push({ 'name': 'login' });
        },

        PathChanged() {
            if (this.$route.name === 'avacadu' || this.$route.name === 'album') {
                this.showWallet = false;
                this.showServices = true;
            };

            if (this.$route.name === 'credits-list' || this.$route.name === 'card-to-card') {
                this.showWallet = true;
                this.showServices = false;
            };
        },
    },

    watch: {
        $route(to, from) {
            this.PathChanged();
        }
    }
}
</script>

<template>
    <nav :class="[rightNavClass]">
        <div class="bg-white w-full h-full slide-down-anim flex flex-col">

            <ul class="h-full flex flex-col justify-end mr-5">
                <!-- ---------------------------------------------------------------------- -->
                <router-link :to="{ name: 'home' }"
                    class="decoration-transparent mt-4 text-right flex justify-end text-ava-gray w-full"
                    active-class="bg-ava-nav-bg-gray rounded-ava7 text-ava-green">

                    <div class="inline-flex items-center p-[10px]">
                        <router-link :to="{ name: 'home' }"
                            class="decoration-transparent font-yekanX text-ava-gray text-base mr-3 mt-1"
                            active-class="text-ava-green">
                            خانه
                        </router-link>

                        <home-icon />
                    </div>
                    <div v-show="$route.name === 'home'" class="navbar-active-icon"></div>
                </router-link>
                <!-- ---------------------------------------------------------------------- -->
                <div class="cursor-pointer font-yekanX text-ava-gray text-base
            mt-2 text-right flex justify-end" @click="ShowWallet">
                    <div class="inline-flex items-center p-[10px]">
                        کیف پول

                        <wallet-icon class="mr-px ml-3" />
                    </div>
                </div>
                <!-- ---------------------------------------------------------------------- -->
                <div v-if="showWallet" class="cursor-pointer font-yekanX text-ava-gray text-base
            mt-2">
                    <!-- ---------------------------------------------------------------------- -->
                    <router-link :to="{ name: 'card-to-card' }"
                        class="decoration-transparent mr-6 text-right flex justify-end text-ava-gray"
                        active-class="bg-ava-nav-bg-gray rounded-ava7 text-ava-green">

                        <div class="inline-flex items-center p-[10px]">
                            <router-link :to="{ name: 'card-to-card' }"
                                class="decoration-transparent font-yekanX text-ava-gray text-sm mr-3"
                                active-class="text-ava-green">
                                کارت به کارت
                            </router-link>

                            <card-2-card-icon />
                        </div>
                        <div v-show="$route.name === 'card-to-card'" class="navbar-active-icon my-auto">
                        </div>
                    </router-link>
                    <!-- ---------------------------------------------------------------------- -->
                    <router-link :to="{ name: 'credits-list' }"
                        class="decoration-transparent mr-6 text-right flex justify-end text-ava-gray"
                        active-class="bg-ava-nav-bg-gray rounded-ava7 text-ava-green">

                        <div class="inline-flex items-center p-[10px]">
                            <router-link :to="{ name: 'credits-list' }"
                                class="decoration-transparent font-yekanX text-ava-gray text-sm mr-3"
                                active-class="text-ava-green">
                                لیست اعتبارها
                            </router-link>

                            <wallet-icon class="mr-px" />
                        </div>
                        <div v-show="$route.name === 'credits-list'" class="navbar-active-icon my-auto">
                        </div>
                    </router-link>
                </div>
                <!-- ---------------------------------------------------------------------- -->
                <div class="cursor-pointer font-yekanX text-ava-gray text-base
            mt-2 text-right flex justify-end" @click="ShowServices">
                    <div class="inline-flex items-center p-[10px]">
                        سرویس ها

                        <services-icon class="mr-px" />
                    </div>
                </div>
                <!-- ---------------------------------------------------------------------- -->
                <div v-if="showServices" class="cursor-pointer font-yekanX text-ava-gray text-base
            mt-2">

                    <router-link :to="{ name: 'avacadu' }"
                        class="decoration-transparent mr-6 text-right flex justify-end text-ava-gray"
                        active-class="bg-ava-nav-bg-gray rounded-ava7 text-ava-green">

                        <div class="inline-flex items-center p-[10px]">
                            <router-link :to="{ name: 'avacadu' }"
                                class="decoration-transparent font-yekanX text-ava-gray text-sm mr-3"
                                active-class="text-ava-green">
                                آواکادو
                            </router-link>

                            <avacadu-icon />
                        </div>
                        <div v-show="$route.name === 'avacadu'" class="navbar-active-icon my-auto">
                        </div>
                    </router-link>
                    <!-- ---------------------------------------------------------------------- -->
                    <router-link :to="{ name: 'album' }"
                        class="decoration-transparent mr-6 text-right flex justify-end text-ava-gray"
                        active-class="bg-ava-nav-bg-gray rounded-ava7 text-ava-green">

                        <div class="inline-flex items-center p-[10px]">
                            <router-link :to="{ name: 'album' }"
                                class="decoration-transparent font-yekanX text-ava-gray text-sm mr-3"
                                active-class="text-ava-green">
                                آلبوم مجازی
                            </router-link>

                            <album-icon />
                        </div>
                        <div v-show="$route.name === 'album'" class="navbar-active-icon my-auto">
                        </div>
                    </router-link>
                </div>


                <div class="h-full flex flex-shrink flex-grow content-end align-bottom flex-col-reverse">
                    <div class="decoration-transparent mt-4 text-right flex justify-end text-ava-gray w-full">
                        <div class="inline-flex items-center p-[10px]">
                            <a @click="Logout"
                                class="decoration-transparent font-yekanX text-ava-gray text-sm mr-3 cursor-pointer"
                                active-class="text-ava-green">
                                خروج
                            </a>

                            <logout-icon class="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </nav>
</template>
