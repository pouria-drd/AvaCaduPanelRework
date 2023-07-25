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
    <div v-if="isActive" class="bg-ava-table-bg-green text-ava-success rounded-ava18 h-8 w-20 mx-auto">
        <p class="font-yekanX text-xs leading-8">
            فعال
        </p>
    </div>

    <div v-else class="bg-ava-info-bg-red text-ava-orange rounded-ava18 h-8 w-20 mx-auto">
        <p class="font-yekanX text-xs leading-8">
            غیر فعال
        </p>
    </div>
</template>