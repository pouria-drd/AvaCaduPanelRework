<script>
import MyButton from "../components/MyButton.vue";
import qrIcon from "../components/icons/qrIcon.vue";
import CustomTable from "../components/CustomTable.vue";
import albumIcon from "../components/icons/albumIcon.vue";
import NewAlbumModal from "../components/NewAlbumModal.vue";

export default {
    components: {
        qrIcon,
        MyButton,
        albumIcon,
        CustomTable,
        NewAlbumModal,
    },

    data() {
        return {
            showAlbumModal: false,
        };
    },

    methods: {
        NewAlbumModal() {
            this.showAlbumModal = true;
        }
    },
};
</script>

<template>
    <new-album-modal v-if="showAlbumModal" :show-album-modal="showAlbumModal"
        @update-showAlbumModal="showAlbumModal = $event" />

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

        <custom-table :is-album="true" height="h-[62.5vh]" />
    </main>
</template>
