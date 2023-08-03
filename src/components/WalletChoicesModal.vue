<script>
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
        };
    },

    methods: {
        CloseCard() {
            this.$emit('update-showWalletChoicesModal', false);
        },

        OpenC2CModal() {
            this.openC2CModal = true;
        },
    },
}
</script>

<template>
    <div v-if="showWalletChoicesModal">
        <C2CModal v-if="openC2CModal" :show-showC2CModal="openC2CModal" @update-showC2CModal="openC2CModal = $event" />

        <div v-if="showWalletChoicesModal && !openC2CModal" class="overlay flex items-center justify-center">
            <div class="w-[90%] md:w-80 p-4 bg-white rounded-md flex flex-col gap-3 z-50">
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

                    <my-button @click="OpenC2CModal" btnType="primary" class="m-0 h-11">
                        کارت به کارت
                    </my-button>
                </div>
            </div>
        </div>
    </div>
</template>