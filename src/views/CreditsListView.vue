<script>
import MyButton from '../components/MyButton.vue';
import CreditsTable from '../components/CreditsTable.vue';
import walletIcon from "../components/icons/walletIcon.vue";

export default {
    components: {
        MyButton,
        walletIcon,
        CreditsTable,
    },

    methods: {
        NewCreditsModal() {
            this.showAlbumModal = true;
        }
    },
}
</script>

<template>
    <main class="flex flex-col h-[80vh]">
        <div class="flex flex-col-reverse gap-2 md:flex-row justify-between mb-4">
            <my-button btnType="primary" @click="NewCreditsModal" class="w-fit">
                <div class="flex flex-col items-center gap-2 md:px-3 md:py-1 m-0">
                    <span class="m-0">
                        <wallet-icon />
                    </span>
                    <p class="m-0">
                        افزایش اعتبار
                    </p>
                </div>
            </my-button>

            <div class="text-right">
                <p class="text-ava-black my-auto font-bjn text-2xl font-semibold m-0">
                    لیست اعتبار های ثبت شده
                </p>

                <p class="text-ava-gray font-yekanX text-xs m-0">
                    اینجا شما می توانید لیست اعتبار خود را مدیریت نمایید
                </p>
            </div>
        </div>

        <credits-table />
    </main>
</template>