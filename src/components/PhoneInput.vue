<script>
export default {
  name: "MyInput",

  props: {
    inputStyle: {
      type: String,
      default: "",
    },

    modelValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      numericInput: "",
      hasError: false,
      errorMessage: ".شماره وارد شده نامعتبر است",
    };
  },

  methods: {
    FilterNonNumeric(target) {
      // Replace non-numeric characters with an empty string
      if (target.value.length === 0) {
        this.errorMessage = "";
        this.hasError = true;
        this.$emit('update-isValidPhone', false);
        return;
      }
      if (target.value.length < 10) {
        target.value = target.value.replace(/[^0-9]/g, "");
        this.$emit('update-isValidPhone', false);
        return;
      }

      target.value = target.value.replace(/[^0-9]/g, "");
      this.$emit('update-isValidPhone', false);

      let pattern = new RegExp("09(0[0-9]|1[0-9]|2[1-9]|3[1-9]|9[1-9])-?[0-9]{3}-?[0-9]{4}");

      if (pattern.test("0" + target.value)) {
        this.hasError = false;
        this.$emit('update-isValidPhone', true);

      } else {
        this.errorMessage = ".شماره وارد شده نامعتبر است";
        this.hasError = true;
        this.$emit('update-isValidPhone', false);
      }

    }
  }
};
</script>

<template>
  <div :class="['input-container', inputStyle]">
    <div class="flex">
      <div class="bg-ava-bg-gray rounded-l-ava10 flex items-center font-yekanX ss02 text-ava-gray pl-2">
        <label class="border-r-2 p-1 text-sm">+98</label>
      </div>
      <!-- <input @input="FilterNonNumeric" inputmode="numeric" class="ss02 base-input" type="tel" maxlength="10"
        v-model="numericInput" pattern="[0-9]" /> -->

      <input @keyup="FilterNonNumeric($event.target)" :class="['ss02', 'base-input', { 'error': hasError }]" type="tel"
        maxlength="10" pattern="[0-9]" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    </div>


    <div class="text-right">
      <p v-if="hasError && errorMessage" class="text-right ss02 mt-2 mr-1 text-xs text-ava-orange font-yekanX inline">
        {{ errorMessage }}
      </p>

      <img v-if="hasError && errorMessage" class="inline" src="../assets/images/errorMsgIcon.svg"
        alt="ErrorMessageIcon" />

    </div>
  </div>
</template>

<style scoped>
.base-input {
  direction: ltr;
  @apply bg-ava-bg-gray w-full h-12 text-ava-green rounded-r-ava10 py-2 px-2 font-yekanX text-base;
}

.base-input:focus {
  transition: 0.3s;
  @apply outline-ava-green bg-white;
}

.base-input::placeholder {
  @apply text-ava-gray-2 text-sm;
}

.error {
  @apply outline-ava-orange border-2 border-ava-orange;
}

/* .error:focus {
  @apply outline-ava-orange;
} */

.success input {
  @apply outline-ava-success border-2 border-ava-success;
}

.success input:focus {
  @apply outline-ava-success;
}

.success p {
  @apply text-ava-success;
}
</style>
