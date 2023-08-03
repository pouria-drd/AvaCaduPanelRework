<script>
export default {
    name: "MyButton",

    props: {
        btnType: {
            type: String,
            default: "",
        },

        busy: {
            type: Boolean,
            default: false,
        },

        canSendData: {
            type: Boolean,
            default: true,
        }
    },
}
</script>

<template>
    <button :class="['ss02', 'base-button', btnType, { 'disabled': !canSendData }, { 'busy': busy }]"
        :disabled="busy || !canSendData">

        <span v-if="busy" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span v-if="busy" class="ml-1">لطفا صبر کنید</span>

        <slot v-if="!busy" />
    </button>
</template>

<style scoped>
.base-button {
    @apply text-sm py-2 px-5 rounded-ava10 font-yekanX mx-1 my-1;
}

.primary {
    @apply bg-ava-green text-white transition;
}

.primary:hover {
    @apply bg-[#3e612e];
}

.bordered-primary {
    @apply border-ava-green border-2 text-ava-green transition;
}

.bordered-primary:hover {
    @apply bg-ava-green text-white scale-105;
}

.dark {
    @apply bg-ava-black text-white transition;
}

.dark:hover {
    @apply bg-black text-white scale-105;
}

.bordered-dark {
    @apply border-ava-black border-2 text-ava-black transition;
}

.bordered-dark:hover {
    @apply bg-ava-black text-white scale-105;
}

.lgreen {
    @apply bg-ava-light-green text-ava-green transition;
}

.lgreen:hover {
    @apply bg-ava-green text-white;
}

.success {
    @apply bg-ava-success text-white transition;
}

.success:hover {
    @apply bg-[#3e8e41] text-white scale-105;
}

.danger {
    @apply bg-ava-orange text-white transition;
}

.danger:hover {
    @apply bg-[#ff3714] text-white scale-105;
}

.disabled {
    @apply opacity-70 cursor-not-allowed;
}

.busy {
    @apply opacity-70 cursor-wait;
}
</style>
