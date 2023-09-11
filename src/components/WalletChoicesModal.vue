<script>
import axios from 'axios';
import C2CModal from './C2CModal.vue';
import MyButton from './Mybutton.vue';
import closeIcon from './icons/closeIcon.vue';

export default {
    name: 'WalletChoicesModal',

    components: {
        C2CModal,
        MyButton,
        closeIcon,
    },

    props: {
        showWalletChoicesModal: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            openC2CModal: false,
            showPaymentChoiseCard: false,
            showC2CPendingStatus: false,

            c2cPendingMessage: "",
        };
    },

    created() {
        this.CheckC2CStatus();
    },

    methods: {

        async CheckC2CStatus() {
            this.c2cPendingMessage = "";
            var token = sessionStorage.getItem("bearer");

            this.showC2CPendingStatus = false;

            var result = false;
            await axios({
                method: "get",
                url: this.$baseUrl + "Wallet/CardToCardStatus",
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                result = response.data.status;

                if (result == false) {
                    this.showC2CPendingStatus = true;
                    this.c2cPendingMessage = response.data.message;
                }

            }).catch((error) => {
                result = false;
            });

            return result;
        },

        CloseCard() {
            this.$emit('update-showWalletChoicesModal', false);
        },

        OpenC2CModal() {
            if (this.c2cPendingMessage.length > 0) {
                return;
            }

            this.openC2CModal = true;
        },
    },
}
</script>

<template>
    <C2CModal v-if="openC2CModal" :show-showC2CModal="openC2CModal" @update-showC2CModal="openC2CModal = $event" />
    <div v-if="showWalletChoicesModal">
        <div v-if="showWalletChoicesModal && !openC2CModal" class="overlay flex items-center justify-center">
            <div class="w-[90%] sm:w-80 p-4 bg-white rounded-md flex flex-col gap-3 z-50">
                <div class="flex justify-start items-center">
                    <button @click="CloseCard">
                        <close-icon class="text-ava-black" />
                    </button>
                </div>
                <div class="flex flex-col justify-center items-center gap-1">
                    <h1 class="text-ava-black text-center font-bjn font-bold text-xl m-0">
                        !روش پرداختی خود را انتخاب کنید
                    </h1>
                    <p class="m-0 text-ava-gray font-yekanX text-xs text-center">
                        .لطفا روش پرداختی خود را از این دو طریق انجام دهید
                    </p>
                </div>
                <div class="flex flex-row items-center justify-between">
                    <my-button btnType="lgreen" class="m-0 h-11">
                        درگاه اینترنتی
                    </my-button>

                    <my-button @click="OpenC2CModal" btnType="primary" class="m-0 h-11"
                        :canSendData="!showC2CPendingStatus">
                        کارت به کارت
                    </my-button>
                </div>
                <p v-if="c2cPendingMessage" class="m-0 font-yekanX text-xs text-right r2l text-ava-orange">{{
                    c2cPendingMessage }}
                </p>
            </div>
        </div>
    </div>
</template>