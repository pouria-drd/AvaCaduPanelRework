<script>
import closeIcon from './icons/closeIcon.vue';

export default {
    name: 'WalletChoicesModal',

    components: {
        closeIcon,
    },

    props: {
        showConfirmC2CModal: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        CloseCard() {
            this.$emit('update-showConfirmC2CModal', false);
        },
    },
}
</script>

<template>
    <div v-if="showConfirmC2CModal">
        <div class="overlay flex items-center justify-center">
            <div class="w-[90%] md:w-80 p-4 bg-white rounded-md flex flex-col gap-2 z-50">
                <div class="flex justify-start items-center">
                    <button @click="CloseCard">
                        <close-icon class="text-ava-black" />
                    </button>
                </div>
                <div class="flex flex-col justify-center items-center gap-2">
                    <h1 class="text-ava-black text-center font-bjn font-bold text-xl m-0">
                        در حال بررسی وضعیت تراکنش ثبتی
                    </h1>
                    <p class="m-0 font-yekanX text-ava-gray text-xs text-center ss02" style="direction: rtl;">
                        وضعیت تراکنش شما تا دقایقی دیگر مشخص خواهد شد. در صورت بروز مشکل با پشتیبانی به شماره <strong
                            class="text-ava-black">
                            ۳۶۲۸۰۷۰۰-۰۲۱
                        </strong>
                        تماس بگیرید
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
