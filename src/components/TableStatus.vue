<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: true,
        },
    }
}
</script>

<template>
    <div v-if="isActive" class="bg-ava-table-bg-green text-ava-success rounded-ava18 h-8 w-20 flex justify-center">
        <p class="font-yekanX text-xs leading-8 text-center">
            فعال
        </p>
    </div>

    <div v-else class="bg-ava-info-bg-red text-ava-orange rounded-ava18 h-8 w-20 flex justify-center">
        <p class="font-yekanX text-xs leading-8 text-center">
            غیر فعال
        </p>
    </div>
</template>