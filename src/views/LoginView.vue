<script>
import axios from "axios";
import Alert from "../components/Alert.vue";
import MyInput from "../components/MyInput.vue";
import MyButton from "../components/MyButton.vue";
import PhoneInput from "../components/PhoneInput.vue";

export default {
  components: {
    Alert,
    MyInput,
    MyButton,
    PhoneInput,
  },

  data() {
    return {
      showAlert: false,
      alertMessage: "",
      alertType: "error",

      captchaImage: "",
      isValidPhone: false,
      isProcessing: false,

      formData: {
        phoneNumber: "",
        captchaCode: "",
        captchaGuid: "",
      },

      phoneNumber: "",

      canSendData: false,

      isAuthenticated: true,
    };
  },

  created() {
    this.RequestCaptcha();
    this.RequestBearer();
  },

  methods: {
    GoToPage(name) {
      this.$router.push({ 'name': name });
    },

    async Login() {

      if (!this.canSendData) return;

      this.isProcessing = true;
      this.formData.phoneNumber = "0" + this.phoneNumber;

      await axios.post(this.$baseUrl + "auth/RequestLoginCode", this.formData)
        .then((response) => {

          sessionStorage.setItem("ttw", response.data.data)
          sessionStorage.setItem("userPhoneNumber", this.formData.phoneNumber);

          this.isProcessing = false;

          this.GoToPage("confirmCode");

        }).catch((error) => {
          this.isProcessing = false;
          this.formData.captchaCode = "";
          this.formData.phoneNumber = "";

          this.alertMessage = error.response.data.message;
          this.showAlert = true;
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
        this.alertMessage = error.response.data.message;
        this.showAlert = true;
      });
    },

    async RequestBearer() {
      try {
        var session = JSON.parse(localStorage.getItem("auth"));

        var request = {
          token: session["token"],
          sessionGuid: session["sessionGuid"],
        };

        await axios
          .post(this.$baseUrl + "auth/RequestBearer", request)
          .then((response) => {

            //TODO: set browser session storage
            sessionStorage.setItem("bearer", response.data.data.token);

            sessionStorage.setItem("user", response.data.data.user.title);
            // console.log(response);

            this.GoToPage("home");
          })
          .catch((error) => {
            this.isAuthenticated = false;
            localStorage.removeItem("auth");
            this.get_captcha();
            this.formData.captchaCode = "";
            this.errorMessage = error["response"]["data"]["message"];
            this.errorMessage = this.errorMessage.replace(/\./g, "");
          });
      } catch {
        this.isAuthenticated = false;
      }
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
  <alert v-if="showAlert" :show-alert="showAlert" @update-showAlert="showAlert = $event" :message="alertMessage"
    :type="alertType" />
  <main>
    <!-- ac logo -------------------------------------------------------- -->
    <div v-if="isAuthenticated" v-show="isAuthenticated" class="w-full h-full fixed top-0 left-0 z-20 bg-white">
      <div class="h-full flex items-center justify-center">
        <div class="flex flex-col gap-3">
          <img class="m-auto" src="../assets/images/acLogo.svg" alt="Avacadu Logo">

          <div class="flex items-center justify-center font-yekanX text-sm text-ava-green">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="ml-1">لطفا صبر کنید</span>
          </div>
        </div>
      </div>
    </div>

    <form v-if="!isAuthenticated" v-show="!isAuthenticated" class="w-full h-full fixed top-0 left-0 z-20 bg-white"
      novalidate @submit.prevent="Login">
      <div class="flex h-full items-center justify-center">
        <div class="w-[90%] sm:w-80 flex flex-col gap-4">
          <!-- ac logo -------------------------------------------------------- -->
          <img class="m-auto" src="../assets/images/acLogo.svg" alt="Avacadu Logo">
          <!-- Title -------------------------------------------------------- -->
          <div class="w-full text-center">
            <h1 class="font-bjn text-ava-black text-3xl font-bold">ورود به آواکادو</h1>

            <p class="text-ava-gray font-yekanX text-xs">
              برای ادامه شماره موبایل خود را وارد کنید
            </p>
          </div>

          <!-- Phone -------------------------------------------------------- -->
          <div class="w-full">
            <phone-input class="w-[90%] mx-auto" v-model="phoneNumber" @update-isValidPhone="isValidPhone = $event" />
          </div>

          <!-- Captcha -------------------------------------------------------- -->
          <div class="justify-between flex items-center mx-auto w-[90%]">

            <img class="bg-ava-green w-32 rounded-ava10 h-12 mr-5" :src="captchaImage" alt="CaptchaImage">

            <button @click="RequestCaptcha" class="w-20 h-12 bg-ava-bg-gray rounded-l-ava10 focus:outline-none">
              <img class="ml-2" src="../assets/images/refreshIcon.svg" alt="RefreshIcon">
            </button>

            <my-input class="l2r" inputClass="rounded-r-ava10" type="tel" maxlength="4" v-model="formData.captchaCode" />

          </div>

          <!-- Button -------------------------------------------------------- -->
          <div class="flex items-center mx-auto w-[91%]">
            <my-button type="submit" class="primary w-full h-12" @click="Login" :canSendData="CanSendData"
              :busy="isProcessing">
              تاید و دریافت کد
            </my-button>
          </div>
          <div class="h-8"></div>
        </div>
      </div>
    </form>
  </main>
</template>
