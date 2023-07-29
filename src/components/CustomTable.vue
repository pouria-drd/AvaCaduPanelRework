<script>
import axios from 'axios';
import QrModal from './QrModal.vue';
import PersianDate from "persian-date";
import qrIcon from "./icons/qrIcon.vue";
import momentTimeZone from 'moment-timezone';
import TableStatus from "../components/TableStatus.vue";
import TableAccess from "../components/TableAccess.vue";

export default {
    name: "CustomTable",

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

        height: {
            type: String,
            default: "h-[40vh]",
        },
    },

    created() {
        if (this.isAlbum) {
            this.tableTitle = "لیست آلبوم ها"
            this.RequestTableData('Album');

        } else {
            this.tableTitle = "لیست آواکادو"
            this.RequestTableData('Avacadu');
        }
    },

    data() {
        return {
            breakpoint: 768,

            isMobile: false,
            showQRModal: false,

            // --------------
            albumData: [],
            lazyAlbum: [],

            tableTitle: "",

            isGettingData: true,
            showRequestDataBtn: true,

            lengthMultiplier: 2,
            dataLengthControll: 3,
            // --------------

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
        async RequestTableData(linkName) {

            this.isGettingData = true;

            var token = sessionStorage.getItem("bearer");

            if (token === null) { return null };


            await axios({
                method: 'get',
                url: this.$baseUrl + 'Contract/List/' + linkName,

                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }).then(response => {
                this.albumData = response.data.data;
                this.HandleLazyAlbum(this.albumData);

            }).catch(error => {
                console.log(error);
            });

            this.isGettingData = false;
        },

        HandleLazyAlbum(data) {
            if (data.length >= this.dataLengthControll) {
                this.lazyAlbum = data.slice(0, this.dataLengthControll);

            } else {
                this.lazyAlbum = data;
            }
        },

        RequestMoreData() {
            this.lazyAlbum = this.albumData.slice(0, this.lazyAlbum.length *
                this.lengthMultiplier);

            if (this.lazyAlbum.length === this.albumData.length) {
                this.showRequestDataBtn = false;

            } else {
                this.showRequestDataBtn = true;
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
    }
}
</script>

<template>
    <qr-modal v-show="showQRModal" v-if="showQRModal" :show-q-r-card="showQRModal" :unique-key="selectedUniqueKey"
        @update-showQRCard="showQRModal = $event" />

    <div v-if="!isMobile" v-show="!isMobile" :class="[containerClass, height]">
        <!-- ---------------------------------------------------------------------- -->
        <div class="p-3 flex justify-end bg-white rounded-t-ava10">
            <p class="text-ava-black my-auto font-bjn text-xl font-semibold">
                {{ tableTitle }}
            </p>
        </div>
        <div class="flex flex-col overflow-x-auto overflow-y-auto bg-white">
            <table class="bg-white">
                <thead class="bg-ava-th-bg font-yekanX text-center text-ava-gray text-xs sticky top-0">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            عملیات
                        </th>

                        <th v-if="!isAlbum" scope="col" class="px-6 py-3">
                            دسترسی
                        </th>

                        <th scope="col" class="px-6 py-3">
                            وضعیت
                        </th>

                        <th scope="col" class="px-6 py-3">
                            شماره تماس
                        </th>

                        <th scope="col" class="px-6 py-3">
                            شناسه
                        </th>

                        <th scope="col" class="px-6 py-3">
                            تاریخ ثبت
                        </th>
                    </tr>
                </thead>
                <tbody v-if="!isGettingData" class="text-center">
                    <tr v-for="(item, index) in lazyAlbum" :key="item.id"
                        class="bg-white border-b border-ava-border-bg font-yekanX text-sm text-ava-gray">

                        <td>
                            <qr-icon class="cursor-pointer mx-auto hover:text-black transition"
                                @click="OpenQRModal(item.uniqueKey)" />
                        </td>

                        <td v-if="!isAlbum">
                            <table-access class="w-28" :is-private="item.isPrivate" />
                        </td>

                        <td>
                            <table-status class="mx-auto" :is-active="item.isActive" />
                        </td>

                        <td class="px-6 py-4">
                            {{ item.phoneNumber }}
                        </td>

                        <td class="px-6 py-4">
                            {{ item.contractGuid }}
                        </td>

                        <td class="ss02 px-0 py-4 block">
                            <div class="flex my-auto items-center justify-center flex-col content-center">
                                <p class="font-yekanX m-0 text-ava-black">
                                    {{ ConvertToPersianDate(item.createdAt).date }}
                                </p>

                                <p class="font-yekanX m-0 text-xs text-ava-gray">
                                    {{ ConvertToPersianDate(item.createdAt).time }}
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
        <div v-if="isGettingData" class="bg-white h-[60%] flex items-center justify-center">
            <p class="mt-3 text-ava-green font-yekanX text-sm">
                درحال دریافت
            </p>

            <div class="ml-2 spinner-border spinner-border-sm text-ava-green" role="status">
            </div>
        </div>

        <div v-if="!isGettingData && albumData.length === 0" class="bg-white h-[60%] flex items-center justify-center">
            <p class="mt-3 text-ava-green font-yekanX text-sm">
                اطلاعاتی برای نمایش وجود ندارد
            </p>
        </div>

        <div v-if="!isGettingData && showRequestDataBtn && albumData.length > 0"
            class="flex justify-center bg-white rounded-b-ava10">
            <p @click="RequestMoreData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
                نمایش بیشتر
            </p>
        </div>
    </div>


    <!-- Mobile table -------------------------------------------------------- -->
    <div v-if="isMobile" v-show="isMobile" :class="[containerClass, height]">
        <div class="p-3 flex justify-end bg-white rounded-t-ava10 border-b-2">
            <p class="text-ava-black my-auto font-bjn text-xl font-semibold">
                {{ tableTitle }}
            </p>
        </div>
        <div v-if="!isGettingData" class="flex flex-col gap-3 p-4 ss02 font-yekanX rounded-b-ava10 overflow-y-auto">
            <div v-for="(item, index) in lazyAlbum" :key="index" class="rounded-ava10 border-2 p-4">
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
        <div v-if="isGettingData" class="bg-white h-[70%] flex items-center justify-center">
            <p class="mt-3 text-ava-green font-yekanX text-sm">
                درحال دریافت
            </p>

            <div class="ml-2 spinner-border spinner-border-sm text-ava-green" role="status">
            </div>
        </div>

        <div v-if="!isGettingData && albumData.length === 0" class="bg-white h-[50%] flex items-center justify-center">
            <p class="mt-3 text-ava-green font-yekanX text-sm">
                اطلاعاتی ثبت شده ای وجود ندارد
            </p>
        </div>

        <div v-if="!isGettingData && showRequestDataBtn && albumData.length > 0"
            class="flex justify-center bg-white rounded-b-ava10">
            <p @click="RequestMoreData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
                نمایش بیشتر
            </p>
        </div>
    </div>
    <!-- Mobile table -------------------------------------------------------- -->
</template>