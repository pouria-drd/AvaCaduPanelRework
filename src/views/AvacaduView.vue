<script>
import MyButton from "../components/MyButton.vue";
import qrIcon from "../components/icons/qrIcon.vue";
import CustomTable from "../components/CustomTable.vue";
import avacaduIcon from "../components/icons/avacaduIcon.vue";

export default {
    components: {
        qrIcon,
        MyButton,
        avacaduIcon,
        CustomTable,
    },

    data() {
        return {

        };
    },

    methods: {
        NewAvacaduModal() {
            console.log(0);
        }
    },
}
</script>

<template>
    <main class="flex flex-col h-[80vh]">
        <div class="flex flex-col-reverse gap-2 md:flex-row justify-between mb-4">
            <my-button btnType="primary" @click="NewAvacaduModal" class="w-fit">
                <div class="flex flex-col items-center gap-2 md:px-3 md:py-1 m-0">
                    <span class="m-0">
                        <avacadu-icon />
                    </span>
                    <p class="m-0">
                        آواکادوی جدید
                    </p>
                </div>
            </my-button>

            <div class="text-right">
                <p class="text-ava-black my-auto font-bjn text-2xl font-semibold m-0">
                    لیست آواکادو های ثبت شده
                </p>

                <p class="text-ava-gray font-yekanX text-xs m-0">
                    اینجا شما می توانید لیست آواکادو های خود را مدیریت نمایید
                </p>
            </div>
        </div>

        <custom-table :is-album="false" height="h-[62.5vh]" />
    </main>
</template>
