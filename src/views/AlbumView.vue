<script>
import axios from "axios";
import PersianDate from "persian-date";
import qrIcon from "../components/icons/qrIcon.vue";

export default {
    components: {
        qrIcon,
    },

    created() {
        this.RequestAlbumData();
    },

    data() {
        return {
            albumData: [],
            lazyAlbum: [],

            isGettingData: false,
            showRequestDataBtn: true,

            lengthMultiplier: 2,
            dataLengthControll: 3,

            selectedUniqueKey: null,
        };
    },

    methods: {
        async RequestAlbumData() {

            this.isGettingData = true;

            var token = sessionStorage.getItem("bearer");

            if (token === null) { return null };


            await axios({
                method: 'get',
                url: this.$baseUrl + 'Contract/List/Album',

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

        HandleLazyAlbum(lazyData) {
            if (lazyData.length >= this.dataLengthControll) {
                this.lazyAlbum = lazyData.slice(0, this.dataLengthControll);

            } else {
                this.lazyAlbum = lazyData;
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
            this.selectedUniqueKey = "https://link.avacadu.ir/album/" + key;
            this.showQRModal = true;
        },

        ConvertToPersianDate(dateToConvert) {
            let date = new Date(dateToConvert);
            let persian_date = new PersianDate(date);

            return {
                time: persian_date.format("HH:MM"),
                date: persian_date.format("YYYY/MM/DD"),
            }
        },
    },
};
</script>

<template>
    <main class="bg-ava-panel-bg-gray w-full">
        <div class="flex flex-col rounded-ava10 overflow-x-auto h-[60vh] overflow-y-auto">
            <table class="">
                <thead class="bg-ava-th-bg font-yekanX text-center text-ava-gray text-xs sticky top-0">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            عملیات
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
                    <tr v-for="album in lazyAlbum" :key="album.id"
                        class="bg-white border-b border-ava-border-bg font-yekanX text-sm text-ava-gray">

                        <td class="h-full">
                            <qr-icon class="cursor-pointer mx-auto hover:text-black transition"
                                @click="OpenQRModal(album.uniqueKey)" />
                        </td>

                        <td class="h-full">
                            <div v-if="album.isActive"
                                class="bg-ava-table-bg-green text-ava-success rounded-ava18 h-8 w-20 mx-auto">
                                <p class="font-yekanX text-xs leading-8">
                                    فعال
                                </p>
                            </div>

                            <div v-else class="bg-ava-info-bg-red text-ava-orange rounded-ava18 h-8 w-20 mx-auto">
                                <p class="font-yekanX text-xs leading-8">
                                    غیر فعال
                                </p>
                            </div>
                        </td>

                        <td class="px-6 py-4">
                            {{ album.phoneNumber }}
                        </td>

                        <td class="px-6 py-4">
                            {{ album.contractGuid }}
                        </td>

                        <td class="ss02 px-0 py-4 block">
                            <div class="flex my-auto items-center justify-center flex-col content-center">
                                <p class="font-yekanX m-0 text-ava-black">
                                    {{ ConvertToPersianDate(album.createdAt).date }}
                                </p>

                                <p class="font-yekanX m-0 text-xs text-ava-gray">
                                    {{ ConvertToPersianDate(album.createdAt).time }}
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot class="text-center">
                    <tr>
                        <td class="bg-white">

                        </td>
                        <td class="bg-white">

                        </td>
                        <td class="bg-white">
                            <div v-if="isGettingData" class="bg-white flex items-center justify-center">
                                <p class="mt-3 text-ava-green font-yekanX text-sm">
                                    درحال دریافت

                                </p>

                                <div class="ml-2 spinner-border spinner-border-sm text-ava-green" role="status">
                                </div>
                            </div>

                            <div v-if="!isGettingData && showRequestDataBtn"
                                class="bg-white flex items-center justify-center">
                                <p @click="RequestMoreData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
                                    نمایش بیشتر
                                </p>
                            </div>
                        </td>
                        <td class="bg-white">

                        </td>
                        <td class="bg-white">

                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </main>
</template>
