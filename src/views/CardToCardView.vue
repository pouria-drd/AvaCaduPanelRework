<script>
import MyButton from '../components/MyButton.vue';
import C2CTable from '../components/C2CTable.vue';
import card2CardIcon from "../components/icons/card2CardIcon.vue"

export default {
    components: {
        MyButton,
        C2CTable,
        card2CardIcon
    },

    methods: {
        NewC2CModal() {
            this.showAlbumModal = true;
        }
    },
}
</script>

<template>
    <main class="flex flex-col h-[80vh]">
        <div class="flex flex-col-reverse gap-2 md:flex-row justify-between mb-4">
            <my-button btnType="primary" @click="NewC2CModal" class="w-fit m-0">
                <div class="flex flex-col items-center gap-2 md:px-3 md:py-1 m-0">
                    <span class="m-0">
                        <card2CardIcon />
                    </span>
                    <p class="m-0">
                        کارت به کارت جدید
                    </p>
                </div>
            </my-button>

            <div class="text-right">
                <p class="text-ava-black my-auto font-bjn text-2xl font-semibold m-0">
                    لیست کارت به کارت های ثبت شده
                </p>

                <p class="text-ava-gray font-yekanX text-xs m-0">
                    اینجا شما می توانید لیست کارت به کارت خود را مدیریت نمایید
                </p>
            </div>
        </div>
        <c-2-c-table height="min-h-[50vh] max-h-[62.5vh]" />
    </main>
</template>