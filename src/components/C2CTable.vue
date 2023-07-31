<script>
import axios from 'axios';
import PersianDate from "persian-date";
import momentTimeZone from 'moment-timezone';

export default {
    name: "C2CTable",

    props: {
        height: {
            type: String,
            default: "h-[40vh]",
        },
    },

    created() {
        this.RequestC2CData();
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

    data() {
        return {
            breakpoint: 768,

            priceFormat: new Intl.NumberFormat("fa-Ir"),
            C2CData: [],
            lazyC2CData: [],
            isGettingData: true,
            showRequestDataBtn: true,

            isMobile: false,

            lengthMultiplier: 2,
            dataLengthControll: 3,

            containerClass: 'bg-white flex flex-col rounded-ava10',
        };
    },

    methods: {
        async RequestC2CData() {

            this.isGettingData = true;

            var token = sessionStorage.getItem("bearer");

            if (token === null) { return null };


            await axios({
                method: 'get',
                url: this.$baseUrl + 'Wallet/CardToCards',

                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }).then(response => {
                this.C2CData = response.data.data;
                this.HandleLazyC2CData(this.C2CData);

            }).catch(error => {
                console.log(error);
            });

            this.isGettingData = false;
        },

        HandleLazyC2CData(data) {
            if (data.length >= this.dataLengthControll) {
                this.lazyC2CData = data.slice(0, this.dataLengthControll);

            } else {
                this.lazyC2CData = data;
            }
        },

        RequestMoreC2CData() {
            this.lazyC2CData = this.C2CData.slice(0, this.lazyC2CData.length *
                this.lengthMultiplier);

            if (this.lazyC2CData.length === this.C2CData.length) {
                this.showRequestDataBtn = false;

            } else {
                this.showRequestDataBtn = true;
            }
        },

        ConvertToPersianDate(dateToConvert) {
            let date = new Date(dateToConvert);
            let persian_date = new PersianDate(date);

            let weekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
            let weekdayIndex = date.getDay();

            return {
                date: persian_date.format("YYYY/MM/DD"),

                time: momentTimeZone.utc(dateToConvert).tz('Asia/Tehran').format(weekdays[weekdayIndex] + ' HH:mm'),
            }
        },

        CheckIsMobile() {
            this.isMobile = window.innerWidth <= this.breakpoint;
        },
    },
}
</script>

<template>
    <div v-if="!isMobile" v-show="!isMobile" :class="[containerClass, height]">
        <div class="p-3 flex justify-end bg-white rounded-t-ava10">
            <p class="text-ava-black my-auto font-bjn text-xl font-semibold">
                لیست کارت به کارت
            </p>
        </div>
        <div class="flex flex-col overflow-x-auto overflow-y-auto bg-white">
            <table class="bg-white font-yekanX ss02">
                <thead class="bg-ava-th-bg font-yekanX text-center text-ava-gray text-xs sticky top-0">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            توضیحات
                        </th>

                        <th scope="col" class="px-6 py-3">
                            وضعیت
                        </th>

                        <th scope="col" class="px-6 py-3">
                            مبلغ
                        </th>

                        <th scope="col" class="px-6 py-3">
                            شماره پیگری
                        </th>

                        <th scope="col" class="px-6 py-3">
                            تاریخ ثبت
                        </th>
                    </tr>
                </thead>
                <tbody v-if="!isGettingData" class="text-center">
                    <tr v-for="(item, index) in lazyC2CData" :key="item.id"
                        class="bg-white border-b border-ava-border-bg font-yekanX text-sm text-ava-gray">
                        <td>
                            <p class="m-0 font-yekanX text-xs">
                                {{ item.description }}
                            </p>
                        </td>

                        <td v-if="item.isConfirmed">
                            <div class="flex items-center justify-center">
                                <div
                                    class="bg-ava-bg-alert-success h-8 w-20 flex items-center justify-center rounded-ava18">
                                    <p class="m-0 text-ava-success text-xs">
                                        تایید شده
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td v-else>
                            <div v-if="item.isRejected" class="flex items-center justify-center">
                                <div class="bg-ava-bg-alert-error h-8 w-20 flex items-center justify-center rounded-ava18">
                                    <p class="m-0 text-ava-orange text-xs">
                                        رد شده
                                    </p>
                                </div>
                            </div>
                            <div v-else>
                                <div class="bg-ava-bg-alert-info h-8 w-20 flex items-center justify-center rounded-ava18">
                                    <p class="m-0 text-ava-info text-xs">
                                        درحال بررسی
                                    </p>
                                </div>
                            </div>
                        </td>


                        <td class="px-6 py-4">
                            {{ this.priceFormat.format(item.amount) }}
                        </td>

                        <td class="px-6 py-4">
                            {{ item.recoveryNumber }}
                        </td>

                        <td>
                            <p class="font-yekanX m-0 text-sm text-ava-black">
                                {{ ConvertToPersianDate(item.createdAt).date }}
                            </p>

                            <p class="font-yekanX m-0 text-[12px] text-ava-gray">
                                {{ ConvertToPersianDate(item.createdAt).time }}
                            </p>
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

        <div v-if="!isGettingData && C2CData.length === 0" class="bg-white h-[60%] flex items-center justify-center">
            <p class="mt-3 text-ava-green font-yekanX text-sm">
                اطلاعاتی برای نمایش وجود ندارد
            </p>
        </div>

        <div v-if="!isGettingData && showRequestDataBtn && C2CData.length > 0"
            class="flex justify-center bg-white rounded-b-ava10">
            <p @click="RequestMoreC2CData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
                نمایش بیشتر
            </p>
        </div>
    </div>

    <!-- Mobile table -------------------------------------------------------- -->
    <div v-if="isMobile" v-show="isMobile" :class="[containerClass, height]">
        <div class="p-3 flex justify-end bg-white rounded-t-ava10 border-b-2">
            <p class="text-ava-black my-auto font-bjn text-xl font-semibold">
                لیست کارت به کارت
            </p>
        </div>
        <div v-if="!isGettingData" class="flex flex-col gap-3 p-4 ss02 font-yekanX rounded-b-ava10 overflow-y-auto">
            <div v-for="(item, index) in lazyC2CData" :key="index" class="rounded-ava10 border-2 p-4">
                <div class="flex flex-col">
                    <div class="flex flex-row justify-between">

                        <div class="flex my-auto items-center justify-center flex-row gap-2 content-center">
                            <p class="font-yekanX m-0 text-ava-black text-sm">
                                {{ ConvertToPersianDate(item.createdAt).date }}
                            </p>

                            <p class="font-yekanX m-0 text-xs text-ava-gray text-center">
                                {{ ConvertToPersianDate(item.createdAt).time }}
                            </p>
                        </div>

                        <p class="m-0 text-ava-black text-sm text-right">
                            تاریخ ثبت
                        </p>

                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <p class="m-0 text-ava-gray text-sm">
                            {{ item.recoveryNumber }}
                        </p>

                        <p class="m-0 text-ava-black text-sm">
                            شماره پیگری
                        </p>
                    </div>

                    <hr class="text-ava-gray">
                    <div class="flex flex-row justify-between">
                        <div v-if="item.isConfirmed">
                            <div class="bg-ava-bg-alert-success h-8 w-20 flex items-center justify-center rounded-ava18">
                                <p class="m-0 text-ava-success text-xs">
                                    تایید شده
                                </p>
                            </div>
                        </div>

                        <div v-else>
                            <div v-if="item.isRejected" class="flex items-center justify-center">
                                <div class="bg-ava-bg-alert-error h-8 w-20 flex items-center justify-center rounded-ava18">
                                    <p class="m-0 text-ava-orange text-xs">
                                        رد شده
                                    </p>
                                </div>
                            </div>
                            <div v-else>
                                <div class="bg-ava-bg-alert-info h-8 w-20 flex items-center justify-center rounded-ava18">
                                    <p class="m-0 text-ava-info text-xs">
                                        درحال بررسی
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p class="m-0 text-ava-black text-sm">
                            وضعیت
                        </p>
                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <p class="m-0 text-ava-gray text-sm">{{ item.description }}</p>

                        <p class="m-0 text-ava-black text-sm">
                            توضیحات
                        </p>
                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <p class="m-0 text-ava-gray text-sm">{{ item.description }}</p>

                        <p class="m-0 text-ava-black text-sm">
                            توضیحات
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

        <div v-if="!isGettingData && C2CData.length === 0" class="bg-white h-[50%] flex items-center justify-center">
            <p class="mt-3 text-ava-green font-yekanX text-sm">
                اطلاعاتی ثبت شده ای وجود ندارد
            </p>
        </div>

        <div v-if="!isGettingData && showRequestDataBtn && C2CData.length > 0"
            class="flex justify-center bg-white rounded-b-ava10">
            <p @click="RequestMoreC2CData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
                نمایش بیشتر
            </p>
        </div>
    </div>
    <!-- Mobile table -------------------------------------------------------- -->
</template>