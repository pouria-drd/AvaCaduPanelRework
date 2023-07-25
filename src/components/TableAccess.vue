<script>
import publicIcon from "./icons/publicIcon.vue";
import privateIcon from "./icons/privateIcon.vue";

export default {
    props: {
        isPrivate: {
            type: Boolean,
            default: true,
        },
    },

    components: {
        publicIcon,
        privateIcon,
    },
}
</script>

<template>
    <div v-if="isPrivate"
        class="flex flex-row items-center justify-center text-center gap-2 text-ava-gray border-[1px] rounded-ava18 px-4 py-0 border-ava-gray">
        <p class="font-yekanX text-xs leading-8 m-0">
            خصوصی
        </p>
        <private-icon />
    </div>
    <div v-else
        class="flex flex-row items-center justify-center text-center gap-2 text-ava-black border-[1px] rounded-ava18 px-4 py-0 border-ava-black">
        <p class="font-yekanX text-xs leading-8 m-0">
            عمومی
        </p>
        <public-icon />
    </div>
</template>