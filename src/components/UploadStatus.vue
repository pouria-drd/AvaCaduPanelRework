<script>

export default {
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
            baseURL: "https://api.avacadu.ir/",
            ETA: 0,

            currentTime: 20,
            timeDuration: 50,
        };
    },

    methods: {

        CloseCard() {
            this.$emit("cancelUpload");
            this.$emit("update-showStatusCard", false);
        }
    },
};
</script>

<template>
    <div v-if="showStatusCard">
        <div class="overlay" @click="CloseCard"></div>
        <div class="status-container">
            <div class="status-card">
                <button @click="CloseCard">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M9.81044 1.32466C9.87049 1.25269 9.91813 1.16724 9.95066 1.07318C9.98318 0.979113 9.99995 0.878283 10 0.776444C10.0001 0.674605 9.98339 0.573751 9.95096 0.47964C9.91853 0.38553 9.87098 0.300005 9.811 0.22795C9.75103 0.155894 9.67982 0.0987197 9.60144 0.0596898C9.52305 0.0206599 9.43903 0.00053926 9.35417 0.000476667C9.2693 0.000414074 9.18526 0.0204108 9.10683 0.059325C9.02841 0.0982392 8.95714 0.155309 8.89709 0.227275L4.99992 4.90396L1.10386 0.227275C0.982598 0.0817534 0.818126 -1.53333e-09 0.646629 0C0.475132 1.53332e-09 0.31066 0.0817534 0.189393 0.227275C0.0681267 0.372798 1.27775e-09 0.570168 0 0.775967C-1.27775e-09 0.981767 0.0681267 1.17914 0.189393 1.32466L4.08657 6L0.189393 10.6753C0.129348 10.7474 0.0817177 10.8329 0.0492216 10.9271C0.0167255 11.0212 0 11.1221 0 11.224C0 11.3259 0.0167255 11.4268 0.0492216 11.521C0.0817177 11.6151 0.129348 11.7007 0.189393 11.7727C0.31066 11.9182 0.475132 12 0.646629 12C0.731545 12 0.81563 11.9799 0.894083 11.9409C0.972536 11.9019 1.04382 11.8448 1.10386 11.7727L4.99992 7.09603L8.89709 11.7727C9.01836 11.9181 9.18277 11.9996 9.35417 11.9995C9.52556 11.9994 9.68989 11.9176 9.811 11.772C9.93212 11.6265 10.0001 11.4292 10 11.2236C9.99989 11.0179 9.93171 10.8207 9.81044 10.6753L5.91327 6L9.81044 1.32466Z"
                            fill="currentColor" />
                    </svg>
                </button>
                <h1>در حال آپلود</h1>
                <progress :value="this.uploadProgressStatus.currentValue"
                    :max="this.uploadProgressStatus.maxValue"></progress>
                <div class="eta-container">
                    <p class="p1">درحال بارگذاری.. شکیبا باشید</p>
                </div>
            </div>
        </div>
    </div>
</template>