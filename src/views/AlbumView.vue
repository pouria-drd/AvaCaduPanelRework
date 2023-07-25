<script>
import axios from "axios";
import PersianDate from "persian-date";
import MyButton from "../components/MyButton.vue";
import qrIcon from "../components/icons/qrIcon.vue";
import albumIcon from "../components/icons/albumIcon.vue";

export default {
    components: {
        qrIcon,
        MyButton,
        albumIcon,
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

        NewAlbumModal() {
            console.log(0);
        }
    },
};
</script>

<template>
    <main>
        <div class="flex flex-col h-[80vh]">
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
                        اینجا شما میتوانید لیست آلبوم خود را مدیریت نمایید
                    </p>
                </div>
            </div>
            <div class="p-3 flex justify-end bg-white rounded-t-ava10">
                <p class="text-ava-black my-auto font-bjn text-xl font-semibold">
                    لیست آلبوم ها
                </p>
            </div>
            <div class="flex flex-col overflow-x-auto overflow-y-auto bg-white">
                <table class="bg-white">
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
                            </td>
                            <td class="bg-white">

                            </td>
                            <td class="bg-white">

                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div v-if="!isGettingData && showRequestDataBtn" class="flex justify-center bg-white rounded-b-ava10">
                <p @click="RequestMoreData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
                    نمایش بیشتر
                </p>
            </div>
        </div>
    </main>
</template>
