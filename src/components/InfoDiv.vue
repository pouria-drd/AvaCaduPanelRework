<script>
export default {
    props: {
        bgColor: {
            type: String,
            default: "green",
        },

        imgPath: {
            type: String,
            default: "../assets/images/defaultImg.svg",
        },

        title: {
            type: String,
            default: "تیتر",
        },

        caption: {
            type: String,
            default: "متن",
        },
    },

    data() {
        return {
            src: "../assets/images/defaultImg.svg",

            baseClass: [
                'w-60', 'h-20', 'my-1',
                'rounded-ava10', 'flex', 'justify-end', 'items-center'
            ],
        };
    },

    methods: {
        test() {
            return "../assets/images/defaultImg.svg"
        },
    },
}
</script>

<template>
    <div :class="[baseClass, {
        'bg-ava-info-bg-red': bgColor === 'red',
        'bg-ava-info-bg-green': bgColor === 'green',
        'bg-ava-info-bg-purple': bgColor === 'purple',
        'bg-ava-info-bg-lightBlue': bgColor === 'lightBlue',
    }]">


        <img v-if="bgColor === 'lightBlue'" src="../assets/images/infoIcons/lightBlueDollorIcon.svg" alt="Icon"
            class="mr-3 order-1">

        <img v-if="bgColor === 'green'" src="../assets/images/infoIcons/greenImageIcon.svg" alt="Icon" class="mr-3 order-1">

        <img v-if="bgColor === 'purple'" src="../assets/images/infoIcons/purpleVoiceIcon.svg" alt="Icon"
            class="mr-3 order-1">

        <img v-if="bgColor === 'red'" src="../assets/images/infoIcons/redIconUp.svg" alt="Icon" class="mr-3 order-1">

        <div class="mt-2 mr-2">
            <h1 class="text-ava-black text-base font-yekanX font-semibold ss02 r2l">
                {{ title }}
            </h1>

            <p class="text-right text-ava-gray text-xs font-yekanX flex-1">
                {{ caption }}
            </p>
        </div>
    </div>
</template>

<style scoped></style>
