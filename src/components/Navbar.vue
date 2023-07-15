<script>
export default {
    name: "Navbar",
}
</script>

<template>
    <nav class="bg-white h-16 nav-shadow">
        <div class="flex justify-end h-full">
            <img class="w-7 mr-4" src="../assets/images/acLogo.svg" alt="AvacaduLogo">
        </div>
    </nav>

    <nav class="bg-white w-64 h-[100vh] nav-shadow absolute top-[73.5px] right-0 justify-between items-center flex">

        <div class="bg-white w-full h-[100vh] slide-down-anim flex flex-col">

            <ul class="flex flex-col justify-end mr-5">

                <router-link :to="{ name: 'home' }"
                    class="decoration-transparent mt-4 p-[10px] text-right flex justify-end text-ava-gray"
                    active-class="bg-ava-nav-bg-gray rounded-ava7 text-ava-green">

                    <router-link :to="{ name: 'home' }"
                        class="decoration-transparent font-yekanX text-ava-gray text-base mr-3"
                        active-class="text-ava-green">
                        خانه

                    </router-link>
                    <svg class="navbar-imgs" width="19" height="20" viewBox="0 0 19 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.8597 13.2456C11.9756 13.2456 12.8839 14.1474 12.8839 15.2558V18.1068C12.8839 18.345 13.0748 18.5359 13.3195 18.5415H15.086C16.4781 18.5415 17.6098 17.4237 17.6098 16.0501V7.96448C17.6033 7.49179 17.378 7.04692 16.9916 6.75126L10.881 1.87799C10.0607 1.22828 8.91332 1.22828 8.09029 1.87984L2.02141 6.7494C1.6201 7.05433 1.39488 7.49921 1.39024 7.98023V16.0501C1.39024 17.4237 2.5219 18.5415 3.914 18.5415H5.69722C5.94839 18.5415 6.15229 18.3422 6.15229 18.0975C6.15229 18.0437 6.15878 17.99 6.1699 17.939V15.2558C6.1699 14.1538 7.07263 13.253 8.1802 13.2456H10.8597ZM15.086 19.9317H13.3028C12.2814 19.9076 11.4936 19.1059 11.4936 18.1068V15.2558C11.4936 14.9138 11.2091 14.6358 10.8597 14.6358H8.18483C7.84283 14.6376 7.56015 14.9166 7.56015 15.2558V18.0975C7.56015 18.167 7.55088 18.2337 7.53141 18.2968C7.43132 19.2143 6.64722 19.9317 5.69722 19.9317H3.914C1.75541 19.9317 0 18.1902 0 16.0501V7.97374C0.00926829 7.05248 0.433756 6.20906 1.16688 5.65389L7.22371 0.792671C8.55741 -0.263914 10.4157 -0.263915 11.7466 0.790817L17.847 5.65667C18.5635 6.20257 18.988 7.04414 19 7.95428V16.0501C19 18.1902 17.2446 19.9317 15.086 19.9317Z"
                            fill="currentColor" />
                    </svg>

                    <div v-show="$route.name === 'home'" class="navbar-active-icon"></div>
                </router-link>

                <router-link :to="{ name: 'wallet' }"
                    class="decoration-transparent mt-2 p-[10px] text-righ flex justify-end text-ava-gray"
                    active-class="bg-ava-nav-bg-gray rounded-ava7 text-ava-green">

                    <router-link :to="{ name: 'wallet' }"
                        class="decoration-transparent font-yekanX text-ava-gray text-base mr-3"
                        active-class="text-ava-green">
                        کیف پول
                    </router-link>

                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M13.4792 0C16.5236 0 19 2.47638 19 5.52168V12.1287C19 15.1731 16.5236 17.6504 13.4792 17.6504H5.52168C2.4773 17.6504 0 15.1731 0 12.1287V5.52168C0 2.47638 2.4773 0 5.52168 0H13.4792ZM13.4792 1.38088H5.52168C3.23863 1.38088 1.38088 3.23863 1.38088 5.52168V12.1287C1.38088 14.4118 3.23863 16.2695 5.52168 16.2695H13.4792C15.7623 16.2695 17.6191 14.4118 17.6191 12.1287V11.871L14.5831 11.8715C12.8368 11.8715 11.4154 10.4511 11.4145 8.70563C11.4145 6.95835 12.8358 5.53696 14.5831 5.53604L17.6191 5.53549V5.52168C17.6191 3.23863 15.7623 1.38088 13.4792 1.38088ZM17.6191 6.91637L14.5831 6.91692C13.5972 6.91784 12.7953 7.71968 12.7953 8.7047C12.7953 9.68881 13.5981 10.4906 14.5831 10.4906L17.6191 10.4901V6.91637ZM15.0044 7.95719C15.3855 7.95719 15.6948 8.26651 15.6948 8.64763C15.6948 9.02875 15.3855 9.33807 15.0044 9.33807H14.7172C14.336 9.33807 14.0267 9.02875 14.0267 8.64763C14.0267 8.26651 14.336 7.95719 14.7172 7.95719H15.0044ZM9.83647 4.17772C10.2176 4.17772 10.5269 4.48703 10.5269 4.86816C10.5269 5.24928 10.2176 5.5586 9.83647 5.5586H4.86622C4.4851 5.5586 4.17578 5.24928 4.17578 4.86816C4.17578 4.48703 4.4851 4.17772 4.86622 4.17772H9.83647Z"
                            fill="currentColor" />
                    </svg>

                    <div v-show="$route.name === 'wallet'" class="navbar-active-icon2">
                    </div>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
.nav-shadow {
    box-shadow: 0px 1px 2px 0px rgba(184, 184, 184, 0.25);
}

.navbar-active-icon {
    top: 31px;
    right: 22px;
    width: 2px;
    height: 40px;
    position: absolute;
    border-radius: 6px;
    background: #4A7337;
}

.navbar-active-icon2 {
    top: 85px;
    right: 22px;
    width: 2px;
    height: 40px;
    position: absolute;
    border-radius: 6px;
    background: #4A7337;
}
</style>
