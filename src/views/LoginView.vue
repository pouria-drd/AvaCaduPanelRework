<script>
import PhoneInput from "../components/PhoneInput.vue";

export default {
  components: {
    PhoneInput,
  },

  methods: {

  }
}
</script>

<template>
  <main>
    <div class="w-full ">
      <div class="mt-28 w-80 h-[500px] mx-auto shadow rounded-ava10">
        <div class="h-8"></div>
        <!-- ac logo -------------------------------------------------------- -->
        <div class="w-full">
          <img class="m-auto" src="../assets/images/acLogo.svg" alt="Avacadu Logo">
        </div>
        <!-- ---------------------------------------------------------------------- -->
        <div class="w-full mt-4 text-center">
          <h1 class="font-bjn text-ava-black text-3xl font-bold">ورود به آواکادو</h1>

          <p class="text-ava-gray font-yekanX text-xs">
            برای ادامه شماره موبایل خود را وارد کنید
          </p>
        </div>

        <div class="w-full">
          <phone-input class="w-[90%] mx-auto" />
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped></style>
