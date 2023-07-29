<script>
import MyButton from "../components/MyButton.vue";
import qrIcon from "../components/icons/qrIcon.vue";
import CustomTable from "../components/CustomTable.vue";
import albumIcon from "../components/icons/albumIcon.vue";

export default {
    components: {
        qrIcon,
        MyButton,
        albumIcon,
        CustomTable,
    },

    data() {
        return {

        };
    },

    methods: {
        NewAlbumModal() {
            console.log(0);
        }
    },
};
</script>

<template>
    <main class="flex flex-col h-[80vh]">
        <div class="flex flex-col-reverse gap-2 md:flex-row justify-between mb-4">
            <my-button btnType="primary" @click="NewAlbumModal" class="w-fit">
                <div class="flex flex-col items-center gap-2 md:px-3 md:py-1 m-0">
                    <span class="m-0">
                        <album-icon />
                    </span>
                    <p class="m-0">
                        آلبوم جدید
                    </p>
                </div>
            </my-button>

            <div class="text-right">
                <p class="text-ava-black my-auto font-bjn text-2xl font-semibold m-0">
                    لیست آلبوم های ثبت شده
                </p>

                <p class="text-ava-gray font-yekanX text-xs m-0">
                    اینجا شما می توانید لیست آلبوم خود را مدیریت نمایید
                </p>
            </div>
        </div>

        <custom-table :is-album="true" height="md:h-full h-[62vh]" />
    </main>
</template>
