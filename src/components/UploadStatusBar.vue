<script>
import CloseIcon from './icons/closeIcon.vue';

export default {
    name: "UploadStatusBar",

    components: {
        CloseIcon,
    },

    props: {
        showStatusCard: {
            type: Boolean,
            default: false,
        },

        uploadProgressStatus: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {

        };
    },

    methods: {
        CloseCard() {
            this.$emit("cancelUpload");
            this.$emit("update-showStatusCard", false);
        }
    },
}
</script>
<template>
    <main v-if="showStatusCard" class="overlay">
        <div class="flex justify-center items-center align-middle h-[100vh]">
            <div class="w-[500px] bg-white p-4 rounded-md flex flex-col gap-4">
                <div class="flex justify-between items-center">
                    <button @click="CloseCard" class="bg-ava-bg-red flex justify-center items-center w-6 h-6 rounded-md">
                        <close-icon class="text-ava-orange w-3" />
                    </button>

                    <h1 class="font-bjn text-xl font-bold">در حال آپلود</h1>
                </div>

                <div class="flex flex-col gap-2">
                    <progress :value="uploadProgressStatus.currentValue" :max="uploadProgressStatus.maxValue"></progress>
                    <p class="font-yekanX text-xs text-ava-gray m-0 r2l">
                        درحال بارگذاری ...
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
progress {
    bottom: 2px;
    height: 5px;
    width: 100%;
    direction: rtl;
    border-radius: 4px;
}

progress::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #d9d9d9;
}

progress::-webkit-progress-value {
    border-radius: 4px;
    background-color: #4a7337;
}

progress::-moz-progress-bar {
    border-radius: 4px;
    background-color: #4a7337;
}
</style>