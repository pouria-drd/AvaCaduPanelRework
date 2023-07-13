<script>
export default {
    name: "MyInput",

    props: {
        inputStyle: {
            type: String,
            default: "",
        },

        inputClass: {
            type: String,
            default: "",
        },

        msg: {
            type: String,
            default: "",
        },

        modelValue: {
            type: String,
            default: '',
        },

        maxlength: {
            type: String,
            default: "5",
        },

        type: {
            type: String,
            default: "text",
        },
    },
}
</script>

<template>
    <input :class="['ss02', 'base-input', inputClass]" :maxlength="maxlength" :type="type" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">


    <!-- <div :class="['input-container', inputStyle]">

        <div class="text-right">
            <p v-if="msg" class="text-right ss02 mt-2 mr-1 text-sm font-yekanX inline">
                {{ msg }}
            </p>

            <img v-if="msg && inputStyle && inputStyle === 'error'" class="inline" src="../assets/images/errorMsgIcon.svg"
                alt="ErrorMessageIcon">

            <img v-if="msg && inputStyle && inputStyle === 'success'" class="inline"
                src="../assets/images/successMsgIcon.svg" alt="SuccessMsgIcon">
        </div>
    </div> -->
</template>

<style scoped>
.base-input {
    /* direction: rtl; */
    @apply bg-ava-bg-gray w-full h-12 text-ava-green py-2 px-2 font-yekanX text-base;
}

.base-input:focus {
    transition: 0.3s;
    @apply outline-ava-green bg-white;
}

.base-input::placeholder {
    @apply text-ava-gray-2 text-sm
}

.error input {
    @apply outline-ava-orange border-2 border-ava-orange;
}

.error input:focus {
    @apply outline-ava-orange;
}

.error p {
    @apply text-ava-orange
}

.success input {
    @apply outline-ava-success border-2 border-ava-success;
}

.success input:focus {
    @apply outline-ava-success;
}

.success p {
    @apply text-ava-success
}
</style>