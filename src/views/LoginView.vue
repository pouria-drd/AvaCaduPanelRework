<script>
import axios from "axios";
import MyInput from "../components/MyInput.vue";
import MyButton from "../components/MyButton.vue";
import PhoneInput from "../components/PhoneInput.vue";

export default {
  components: {
    MyInput,
    MyButton,
    PhoneInput,
  },

  data() {
    return {
      captchaImage: "",

      isValidPhone: false,
      isProcessing: false,

      formData: {
        phoneNumber: "",
        captchaCode: "",
        captchaGuid: "",
      },

      canSendData: false,
    };
  },

  created() {
    this.RequestCaptcha();
  },

  methods: {

    async Login() {

      if (!this.canSendData) return;

      this.isProcessing = true;
      this.formData.phoneNumber = "0" + this.formData.phoneNumber;

      await axios.post(this.$baseUrl + "auth/RequestLoginCode", this.formData)
        .then((response) => {

          sessionStorage.setItem("ttw", response.data.data)
          sessionStorage.setItem("userPhoneNumber", this.formData.phoneNumber);

          this.isProcessing = false;

        }).catch((error) => {
          this.isProcessing = false;
          this.formData.captchaCode = "";
          this.formData.phoneNumber = "";
          this.RequestCaptcha();
        });
    },

    async RequestCaptcha() {
      await axios({
        method: "get",
        url: this.$baseUrl + 'auth/captcha',

      }).then(response => {
        this.captchaImage = "data:image/*;base64," +
          response.data['data']['captcha'];

        this.formData.captchaGuid = response.data['data']['guid'];

      }).catch(error => {
        console.log(error);
      });
    },
  },

  computed: {
    CanSendData() {
      if (this.formData.captchaCode.trim().length < 4 || !this.isValidPhone) {
        this.canSendData = false;
        return false;
      } else {
        this.canSendData = true;
        return true;
      }
    },
  },
}
</script>

<template>
  <main>
    <form class="w-full" novalidate @submit.prevent="Login">
      <div class="mt-28 w-80 mx-auto rounded-ava10">
        <div class="h-8"></div>
        <!-- ac logo -------------------------------------------------------- -->
        <div class="w-full">
          <img class="m-auto" src="../assets/images/acLogo.svg" alt="Avacadu Logo">
        </div>

        <!-- Title -------------------------------------------------------- -->
        <div class="w-full mt-4 text-center">
          <h1 class="font-bjn text-ava-black text-3xl font-bold">ورود به آواکادو</h1>

          <p class="text-ava-gray font-yekanX text-xs">
            برای ادامه شماره موبایل خود را وارد کنید
          </p>
        </div>

        <!-- Phone -------------------------------------------------------- -->
        <div class="w-full">
          <phone-input class="w-[90%] mx-auto" v-model="formData.phoneNumber"
            @update-isValidPhone="isValidPhone = $event" />
        </div>

        <!-- Captcha -------------------------------------------------------- -->
        <div class="justify-between flex items-center mx-auto w-[90%] mt-4">

          <img class="bg-ava-green w-32 rounded-ava10 h-12 mr-5" :src="captchaImage" alt="CaptchaImage">

          <button @click="RequestCaptcha" class="w-20 h-12 bg-ava-bg-gray rounded-l-ava10 focus:outline-none">
            <img class="ml-2" src="../assets/images/refreshIcon.svg" alt="RefreshIcon">
          </button>

          <my-input class="l2r" inputClass="rounded-r-ava10" type="tel" maxlength="4" v-model="formData.captchaCode" />

        </div>

        <!-- Button -------------------------------------------------------- -->
        <div class="flex items-center mx-auto w-[91%] mt-4">
          <my-button type="submit" class="primary w-full h-12" @click="Login" :canSendData="CanSendData"
            :busy="isProcessing">
            تاید و دریافت کد
          </my-button>
        </div>
        <div class="h-8"></div>
      </div>
    </form>
  </main>
</template>
