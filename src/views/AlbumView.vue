<script>
import axios from "axios";
import PersianDate from "persian-date";

export default {
    components: {
    },

    created() {
        this.RequestAlbumData();
    },

    data() {
        return {
            albumData: [],
            lazyAlbum: [],
            isGettingData: false,

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

            }).catch(error => {
                console.log(error);

            });

            this.isGettingData = false;
        },

        OpenQRModal(key) {
            this.selectedUniqueKey = "https://link.avacadu.ir/album/" + key;
            this.showQRModal = true;
        },

        // ConvertToPersianDate(dateToConvert) {
        //     let date = new Date(dateToConvert);

        //     date = momentTimeZone.utc(dateToConvert).tz('Asia/Tehran').format('YYYY-MM-DD HH:mm:ss'); // Tehran time

        //     let persian_date = new persianDate(date);
        //     return persian_date.format("YYYY/MM/DD"); // 1402/02/02
        //     // item.createdAt = persian_date.format("dddd، D MMMM YYYY") // دوشنبه، ۱۴ فروردین ۱۴۰۲
        // },

        ConvertToPersianDate(dateToConvert) {
            let date = new Date(dateToConvert);
            let persian_date = new PersianDate(date);
            return persian_date.format("YYYY/MM/DD");
        },
    },
};
</script>

<template>
    <main class="bg-ava-panel-bg-gray w-full">
        <div class="flex flex-col rounded-ava10 overflow-x-auto h-[80vh] overflow-y-auto">
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
                    <tr v-for="album in albumData" :key="album.id"
                        class="bg-white border-b border-ava-border-bg font-yekanX text-sm text-ava-gray">

                        <td class="px-6 py-4">
                            <img class="cursor-pointer" @click="OpenQRModal(album.uniqueKey)"
                                src="../assets/images/QRicon.svg" alt="QRicon">
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
                                    {{ ConvertToPersianDate(album.createdAt) }}
                                </p>

                                <p class="font-yekanX m-0 text-sm text-ava-gray">
                                    22:22
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

                            <div v-else class="bg-white flex items-center justify-center">
                                <p @click="RequestAlbumData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
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
