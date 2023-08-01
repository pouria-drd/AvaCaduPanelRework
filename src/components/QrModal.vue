<script>
import VueQrcode from 'vue-qrcode';
import MyButton from './MyButton.vue';
import closeIcon from './icons/closeIcon.vue';

export default {
    name: 'QRModal',

    components: {
        MyButton,
        VueQrcode,
        closeIcon,
    },

    props: {
        showQRCard: {
            type: Boolean,
            default: false,
        },

        uniqueKey: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            color: { dark: '#80848F', light: '#fff' }
        };
    },

    methods: {
        CloseCard() {
            this.$emit('update-showQRCard', false);
        },

        DownloadQrCode() {
            const img = document.getElementById('qrCodeImage');
            const link = document.createElement('a');
            var qr = img.src;
            link.download = this.uniqueKey + ".png"
            link.href = qr;

            link.click();
        }
    },
}
</script>

<template>
    <div v-if="showQRCard">
        <div class="overlay flex items-center justify-center">
            <div class="w-[90%] md:w-80 p-4 bg-white rounded-md flex flex-col gap-2 z-50">
                <div class="flex items-center justify-between">
                    <button @click="CloseCard">
                        <close-icon class="text-ava-black" />
                    </button>

                    <h1 class="text-ava-black text-center font-bjn font-bold text-xl m-0">
                        !اسکن نمایید و جزییات را بیبینید
                    </h1>
                </div>
                <div class="flex justify-center items-center">
                    <VueQrcode id="qrCodeImage" :width="250" :value="this.uniqueKey" :quality="1" type="image/png"
                        :color="color" />
                </div>

                <div class="flex items-center justify-center">
                    <my-button @click="DownloadQrCode" btnType="primary">ذخیره تصویر</my-button>
                </div>
            </div>
        </div>
    </div>
</template>
