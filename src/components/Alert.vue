<script>
export default {
    name: "Alert",

    props: {
        type: {
            type: String,
            default: "success",
        },

        title: {
            type: String,
            default: "خطا",
        },

        message: {
            type: String,
            default: "پیام",
        },

        showAlert: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        CloseAlert() {
            this.$emit("update-showAlert", false);
        }
    },

    computed: {
        containerClass() {
            return [
                'w-[90%]',
                'md:w-auto',
                'md:min-w-[300px]',
                'h-auto',

                'mt-6',
                'mx-auto',
                'rounded-ava10',

                'flex',
                'align-middle',
                'justify-end',
                'ss02',
            ];
        },
    },
}
</script>

<template>
    <div v-if="showAlert" class="w-full flex justify-center m-auto fixed z-50 top-5 ss02">
        <div :class="[containerClass, {
            'bg-ava-bg-alert-info': type === 'info',
            'bg-ava-bg-alert-error': type === 'error',
            'bg-ava-bg-alert-danger': type === 'danger',
            'bg-ava-bg-alert-success': type === 'success',
        }]">

            <div class="flex flex-col text-right m-3 w-full">
                <div class="flex justify-between">
                    <div>
                        <button @click="CloseAlert" class="relative top-[-5px] left-1">
                            <svg :class="{
                                'fill-ava-info': type === 'info',
                                'fill-ava-orange': type === 'error',
                                'fill-red-500': type === 'danger',
                                'fill-ava-success': type === 'success',

                            }" width="11" height="11" viewBox="0 0 11 11" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M10.7915 1.21427C10.8575 1.1483 10.9099 1.06997 10.9457 0.983744C10.9815 0.89752 10.9999 0.805093 11 0.71174C11.0001 0.618388 10.9817 0.525939 10.9461 0.43967C10.9104 0.353402 10.8581 0.275004 10.7921 0.208954C10.7261 0.142903 10.6478 0.0904931 10.5616 0.0547157C10.4754 0.0189383 10.3829 0.000494322 10.2896 0.000436945C10.1962 0.000379568 10.1038 0.0187099 10.0175 0.0543812C9.93125 0.0900526 9.85285 0.142366 9.7868 0.208336L5.49991 4.4953L1.21425 0.208336C1.08086 0.0749406 0.899938 -1.40555e-09 0.711292 0C0.522646 1.40555e-09 0.341726 0.0749406 0.208332 0.208336C0.0749393 0.341731 1.40553e-09 0.522654 0 0.711303C-1.40552e-09 0.899953 0.0749393 1.08088 0.208332 1.21427L4.49523 5.5L0.208332 9.78573C0.142283 9.85178 0.0898895 9.93019 0.0541438 10.0165C0.018398 10.1028 0 10.1953 0 10.2887C0 10.3821 0.018398 10.4746 0.0541438 10.5609C0.0898895 10.6472 0.142283 10.7256 0.208332 10.7917C0.341726 10.9251 0.522645 11 0.711292 11C0.8047 11 0.897194 10.9816 0.983491 10.9459C1.06979 10.9101 1.1482 10.8577 1.21425 10.7917L5.49991 6.5047L9.7868 10.7917C9.9202 10.9249 10.1011 10.9997 10.2896 10.9996C10.4781 10.9994 10.6589 10.9244 10.7921 10.791C10.9253 10.6576 11.0001 10.4768 11 10.2883C10.9999 10.0997 10.9249 9.91896 10.7915 9.78573L6.50459 5.5L10.7915 1.21427Z" />
                            </svg>
                        </button>
                    </div>

                    <h1 :class="{
                        'info-title': type === 'info',
                        'error-title': type === 'error',
                        'danger-title': type === 'danger',
                        'success-title': type === 'success',
                    }">
                        {{ title }}
                    </h1>
                </div>

                <p class="text-ava-gray font-yekanX text-xs r2l whitespace-break-spaces">{{ message }}</p>
            </div>

            <div class="my-auto h-[50%]">
                <div :class="{
                    'info-line': type === 'info',
                    'error-line': type === 'error',
                    'danger-line': type === 'danger',
                    'success-line': type === 'success',
                }">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.error-line {
    @apply w-[6px] h-full rounded-[2px] bg-ava-orange;
}

.danger-line {
    @apply w-[6px] h-full rounded-[2px] bg-ava-orange;
}

.success-line {
    @apply w-[6px] h-full rounded-[2px] bg-ava-success;

}

.info-line {
    @apply w-[6px] h-full rounded-[2px] bg-ava-info;
}

.error-title {
    @apply text-right text-ava-orange text-[22px] font-bjn font-semibold;
}

.danger-title {
    @apply text-right text-ava-orange text-[22px] font-bjn font-semibold;
}

.success-title {
    @apply text-right text-ava-success text-[22px] font-bjn font-semibold;
}

.info-title {
    @apply text-right text-ava-info text-[22px] font-bjn font-semibold;
}
</style>
