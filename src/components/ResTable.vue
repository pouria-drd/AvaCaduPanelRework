<script>
import QrModal from './QrModal.vue';
import PersianDate from "persian-date";
import qrIcon from "./icons/qrIcon.vue";
import momentTimeZone from 'moment-timezone';
import TableStatus from "../components/TableStatus.vue";
import TableAccess from "../components/TableAccess.vue";

export default {
    components: {
        qrIcon,
        QrModal,
        TableStatus,
        TableAccess,
    },

    props: {
        isAlbum: {
            type: Boolean,
            default: false,
        },

        tableData: {
            type: Array,
            default: null,
        },

        height: {
            type: String,
            default: "h-[40vh]",
        },
    },

    data() {
        return {
            breakpoint: 768,

            showQRModal: false,

            selectedUniqueKey: "",

            containerClass: 'bg-white flex flex-col rounded-ava10',
        };
    },

    mounted() {
        // Check if we are in mobile mode when the component is mounted
        this.CheckIsMobile();

        // Add an event listener to update isMobile when the window is resized
        window.addEventListener('resize', this.CheckIsMobile);
    },
    beforeUnmount() {
        // Remove the event listener when the component is unmounted
        window.removeEventListener('resize', this.CheckIsMobile);
    },

    methods: {
        CheckIsMobile() {
            this.isMobile = window.innerWidth <= this.breakpoint;
        },

        ConvertToPersianDate(dateToConvert) {

            let date = new Date(dateToConvert);
            let persian_date = new PersianDate(date);

            return {
                time: momentTimeZone.utc(dateToConvert).tz('Asia/Tehran').format('HH:mm'), // Tehran time

                date: persian_date.format("YYYY/MM/DD"),
            }
        },

        OpenQRModal(key) {

            if (this.isAlbum) {
                this.selectedUniqueKey = "https://link.avacadu.ir/album/" + key;

            } else {
                this.selectedUniqueKey = "https://link.avacadu.ir/" + key;

            }

            this.showQRModal = true;
        },
    }
}
</script>

<template>
    <qr-modal v-if="showQRModal" :show-q-r-card="showQRModal" :unique-key="selectedUniqueKey"
        @update-showQRCard="showQRModal = $event" />

    <div :class="[containerClass, height]">
        <div class="p-3 flex justify-end bg-white rounded-t-ava10 border-b-2">
            <p class="text-ava-black my-auto font-bjn text-xl font-semibold">
                لیست آلبوم ها
            </p>
        </div>
        <div class="flex flex-col gap-3 p-4 ss02 font-yekanX rounded-b-ava10 overflow-y-auto">


            <div v-for="(item, index) in tableData" :key="index" class="rounded-ava10 border-2 p-4">
                <div class="flex flex-col">
                    <div class="flex flex-row justify-between">

                        <div class="flex my-auto items-center justify-center flex-row gap-2 content-center">
                            <p class="font-yekanX m-0 text-ava-black text-sm">
                                {{ ConvertToPersianDate(item.createdAt).date }}
                            </p>

                            <p class="font-yekanX m-0 text-xs text-ava-gray">
                                {{ ConvertToPersianDate(item.createdAt).time }}
                            </p>
                        </div>

                        <p class="m-0 text-ava-black text-sm">
                            تاریخ ثبت
                        </p>

                    </div>

                    <hr class="text-ava-gray">
                    <div class="flex flex-row justify-between">
                        <p class="m-0 text-ava-gray text-sm">{{ item.phoneNumber }}</p>

                        <p class="m-0 text-ava-black text-sm">
                            شماره تماس
                        </p>
                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <p class="m-0 text-ava-gray text-sm">{{ item.contractGuid }}</p>

                        <p class="m-0 text-ava-black text-sm">
                            شناسه
                        </p>
                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <div>
                            <table-status :is-active="item.isActive" />
                        </div>

                        <p class="m-0 text-ava-black text-sm">
                            وضعیت
                        </p>
                    </div>

                    <div v-if="!isAlbum">
                        <hr class="text-ava-gray">

                        <div class="flex flex-row justify-between">
                            <table-access :is-private="item.isPrivate" />

                            <p class="m-0 text-ava-black text-sm">
                                دسترسی
                            </p>
                        </div>
                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <div>
                            <qr-icon class="cursor-pointer mx-auto text-ava-gray hover:text-black transition" :width="25"
                                :height="25" @click="OpenQRModal(item.uniqueKey)" />
                        </div>

                        <p class="m-0 text-ava-black text-sm">
                            عملیات
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>