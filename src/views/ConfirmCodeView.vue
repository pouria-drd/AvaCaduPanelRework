<script>
import axios from "axios";
import Alert from "../components/Alert.vue";
import MyButton from "../components/MyButton.vue"

export default {

    components: {
        Alert,
        MyButton,
    },

    created() {
        this.formData.phoneNumber = sessionStorage.getItem("userPhoneNumber");
        this.StartTimer();

        this.CheckAuth();
        this.MyData();
    },

    data() {
        return {
            showAlert: false,
            alertMessage: "",
            alertType: "error",

            canSendData: false,
            isProcessing: false,

            timer: null,
            canResend: false,
            remainingTime: 150,

            formData: {
                code: "",
                phoneNumber: "",
            },

            inputData: {
                code1: "",
                code2: "",
                code3: "",
                code4: "",
                code5: "",
            },
        };
    },

    methods: {
        async ConfirmCode() {
            if (!this.canSendData) return;

            this.formData.code =
                this.inputData.code1 +
                this.inputData.code2 +
                this.inputData.code3 +
                this.inputData.code4 +
                this.inputData.code5;

            this.isProcessing = true;


            await axios
                .post(this.$baseUrl + "auth/RequestSession", this.formData)
                .then((response) => {
                    localStorage.setItem("auth", JSON.stringify(response.data.data));
                    this.GoToPage("login");
                })
                .catch((error) => {
                    this.alertMessage = error.response.data.message;
                    this.showAlert = true;

                    this.ClearData();
                });

            this.isProcessing = false;

        },

        MyData() {
            try {
                this.canResend = false;
                this.remainingTime = sessionStorage.getItem("ttw");
                sessionStorage.removeItem("ttw");

            } catch {
                return "";
            }
        },

        GoToPage(name) {
            this.$router.push({ 'name': name });
        },

        async CheckAuth() {
            try {
                var data = JSON.parse(localStorage.getItem("auth"));
                if (data != null) {
                    this.GoToPage("login");
                }
            } catch {
                this.GoToPage("login");
            }
        },

        onInput(index) {
            const inputs = this.$refs;
            const input = inputs["input" + index];

            if (input.value.length === 0) {
                if (index > 1) {
                    inputs["input" + (index - 1)].focus();
                }
            } else if (input.value.length === input.maxLength) {
                if (index < Object.keys(inputs).length) {
                    inputs["input" + (index + 1)].focus();
                }
            }

            if (index === 5) {
                this.ConfirmCode();
            }
        },

        StartTimer() {
            this.canResend = false;

            this.remainingTime = setInterval(() => {
                if (this.remainingTime > 0) {
                    this.remainingTime--;
                } else {
                    this.StopTimer();
                }
            }, 1000);
        },

        StopTimer() {
            this.canResend = true;
            clearInterval(this.remainingTime);
        },

        ClearData() {
            this.formData = {
                code: "",
                phoneNumber: "",
            };

            this.inputData = {
                code1: "",
                code2: "",
                code3: "",
                code4: "",
                code5: "",
            };

            const inputs = this.$refs;
            inputs["input1"].focus();
        },
    },

    computed: {
        CanSendData() {
            if (
                this.inputData.code1.trim().length != 1 ||
                this.inputData.code2.trim().length != 1 ||
                this.inputData.code3.trim().length != 1 ||
                this.inputData.code4.trim().length != 1 ||
                this.inputData.code5.trim().length != 1
            ) {
                this.canSendData = false;
                return false;

            } else {
                this.canSendData = true;
                return true;
            }
        },

        FormattedTime() {
            const totalMinutes = Math.floor(this.remainingTime / 60);

            const seconds = this.remainingTime % 60;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            return `${minutes}:${seconds}`;
        }
    },
}
</script>

<template>
    <alert v-if="showAlert" :show-alert="showAlert" @update-showAlert="showAlert = $event" :message="alertMessage"
        :type="alertType" />

    <main>
        <div class="w-full h-full fixed top-0 left-0 z-20 bg-white">
            <div class="flex h-full items-center justify-center">

                <div class="w-[90%] sm:w-80 flex flex-col gap-4">
                    <!-- ac logo -------------------------------------------------------- -->
                    <div class="w-full">
                        <img class="m-auto" src="../assets/images/acLogo.svg" alt="Avacadu Logo">
                    </div>

                    <!-- Title -------------------------------------------------------- -->
                    <div class="w-full text-center ss02">
                        <h1 class="font-bjn text-ava-black text-3xl font-bold">
                            کد تایید را وارید کنید
                        </h1>

                        <p class="text-ava-gray font-yekanX text-xs">
                            کد پنج رقمی به شماره {{ formData.phoneNumber }} ارسال شد
                        </p>
                    </div>

                    <!-- Body -------------------------------------------------------- -->
                    <div v-if="canResend" class="text-center">
                        <a class="decoration-transparent font-yekanX text-sm text-ava-green" href="/">
                            اصلاح شماره موبایل</a>
                    </div>

                    <div class="flex justify-center">
                        <input @input="onInput(1)" ref="input1" class="my-input w-12 h-12 mr-3" type="tel" maxlength="1"
                            v-model="inputData.code1">

                        <input @input="onInput(2)" ref="input2" class="my-input w-12 h-12 mr-3" type="tel" maxlength="1"
                            v-model="inputData.code2">

                        <input @input="onInput(3)" ref="input3" class="my-input w-12 h-12 mr-3" type="tel" maxlength="1"
                            v-model="inputData.code3">

                        <input @input="onInput(4)" ref="input4" class="my-input w-12 h-12 mr-3" type="tel" maxlength="1"
                            v-model="inputData.code4">

                        <input @input="onInput(5)" ref="input5" class="my-input w-12 h-12" type="tel" maxlength="1"
                            v-model="inputData.code5">
                    </div>

                    <div class="text-center" v-if="!this.canResend">
                        <p class="ss02 r2l text-sm font-yekanX text-ava-gray">
                            {{ FormattedTime }} تا درخواست مجدد
                        </p>
                    </div>

                    <div class="text-center">
                        <my-button class="w-[90%] h-12" btnType="primary" @click="ConfirmCode" :canSendData="CanSendData"
                            :busy="isProcessing">
                            تایید و ادامه
                        </my-button>
                    </div>
                    <div class="h-8"></div>
                </div>
            </div>
        </div>
    </main>
</template>