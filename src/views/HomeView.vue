<script>
import InfoDiv from "../components/InfoDiv.vue";
import NewAlbumModal from "../components/AlbumModal.vue";
import albumIcon from "../components/icons/albumIcon.vue";
import walletIcon from "../components/icons/walletIcon.vue";
import NewAvacaduModal from "../components/AvacaduModal.vue";
import avacaduIcon from "../components/icons/avacaduIcon.vue";
import WalletChoicesModal from '../components/WalletChoicesModal.vue';

export default {
    components: {
        InfoDiv,
        albumIcon,
        walletIcon,
        avacaduIcon,
        NewAlbumModal,
        NewAvacaduModal,
        WalletChoicesModal,
    },

    created() {
        this.username = sessionStorage.getItem('user');
    },

    data() {
        return {
            username: "نام کاربری",

            showAlbumModal: false,
            showAvacaduModal: false,
            openWalletChoicesModal: false,
        };
    },

    methods: {
        NewAlbumModal() {
            this.showAlbumModal = true;
        },

        NewAvacaduModal() {
            this.showAvacaduModal = true;

        },

        OpenWalletChoicesModal() {
            this.openWalletChoicesModal = true;
        }
    },
}
</script>

<template>
    <new-album-modal v-if="showAlbumModal" :show-album-modal="showAlbumModal"
        @update-showAlbumModal="showAlbumModal = $event" />

    <new-avacadu-modal v-if="showAvacaduModal" :show-avacadu-modal="showAvacaduModal"
        @update-showAvacaduModal="showAvacaduModal = $event" />

    <wallet-choices-modal v-if="openWalletChoicesModal" :show-wallet-choices-modal="openWalletChoicesModal"
        @update-show-wallet-choices-modal="openWalletChoicesModal = $event" />

    <main class="w-full h-auto">
        <div class="flex gap-4 lg:flex-row-reverse flex-col mb-5 2md:justify-start justify-end">
            <div class="w-[80%] lg:w-1/3 order-1 lg:order-2 mx-auto 2md:m-0">
                <div class="flex flex-row justify-between h-5/6 cursor-pointer">

                    <div class="bg-white w-1/3 rounded-s-ava10 border-r-2" @click="NewAvacaduModal">
                        <div class="mt-3">
                            <avacadu-icon class="mx-auto mb-2 text-ava-green" />
                        </div>
                        <p class="text-ava-green text-xs text-center font-yekanX">
                            آواکادوی جدید
                        </p>
                    </div>

                    <div class="bg-white w-1/3 border-r-2" @click="NewAlbumModal">
                        <div class="mt-3">
                            <album-icon class="mx-auto mb-2 text-ava-green" />
                        </div>
                        <p class="text-ava-green text-xs text-center font-yekanX">
                            آلبوم جدید
                        </p>
                    </div>

                    <div class="bg-white w-1/3 rounded-e-ava10" @click="OpenWalletChoicesModal">
                        <div class="mt-3">
                            <wallet-icon class="mx-auto mb-2 text-ava-green" />
                        </div>
                        <p class="text-ava-green text-xs text-center font-yekanX">
                            افزایش اعتبار
                        </p>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-2/3 flex 2md:justify-end justify-center">

                <div class="flex-col 2md:justify-end justify-center">
                    <div class="flex w-full 2md:justify-end justify-center gap-2">
                        <h1 class="font-bjn text-ava-black font-bold text-[34px] inline">
                            {{ username }}
                        </h1>

                        <h1 class="font-bjn text-ava-gray text-[34px] inline">
                            خوش آمدی
                        </h1>
                    </div>

                    <p class="font-yekanX text-ava-gray text-sm mt-1">
                        اینجا شما می توانید لیست آلبوم خود را مدیریت نمایید
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>