<script>
import axios from 'axios';
import PersianDate from "persian-date";
import momentTimeZone from 'moment-timezone';

export default {
    name: "CreditsTable",

    props: {
        height: {
            type: String,
            default: "min-h-[50vh] max-h-[62.5vh]",
        },
    },

    created() {
        this.RequstCreditsData();
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

            creditsData: [],
            lazyCreditsData: [],

            isGettingData: true,
            showRequestDataBtn: true,

            isMobile: false,

            lengthMultiplier: 2,
            dataLengthControll: 3,

            containerClass: 'bg-white flex flex-col rounded-ava10',
        };
    },

    methods: {
        async RequstCreditsData() {
            this.isGettingData = true;

            var token = sessionStorage.getItem("bearer");

            if (token === null) { return null };


            await axios({
                method: 'get',
                url: this.$baseUrl + 'Wallet/Balances',

                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }).then(response => {
                this.creditsData = response.data.data;
                this.HandleLazyCreditsData(this.creditsData);

            }).catch(error => {
                console.log(error);
            });

            this.isGettingData = false;
        },

        HandleLazyCreditsData(data) {
            if (data.length >= this.dataLengthControll) {
                this.lazyCreditsData = data.slice(0, this.dataLengthControll);

            } else {
                this.lazyCreditsData = data;
            }
        },

        RequestMoreCreditsData() {
            this.lazyCreditsData = this.creditsData.slice(0, this.lazyCreditsData.length *
                this.lengthMultiplier);

            if (this.lazyCreditsData.length === this.creditsData.length) {
                this.showRequestDataBtn = false;

            } else {
                this.showRequestDataBtn = true;
            }
        },

        CalculateChangeAmount(currentAmount, lastAmount) {
            let dif = currentAmount - lastAmount;
            if (dif > 0) {
                dif = '+' + dif;
            }
            return dif
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
                لیست آخرین اعتبار
            </p>
        </div>
        <div class="flex flex-col overflow-x-auto overflow-y-auto bg-white">
            <table class="bg-white font-yekanX ss02">
                <thead class="bg-ava-th-bg font-yekanX text-center text-ava-gray text-xs sticky top-0">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            بابت
                        </th>

                        <th scope="col" class="px-6 py-3">
                            اعتبار باقی مانده
                        </th>

                        <th scope="col" class="px-6 py-3">
                            مقدار تغییر
                        </th>

                        <th scope="col" class="px-6 py-3">
                            اعتبار قبلی
                        </th>

                        <th scope="col" class="px-6 py-3">
                            تاریخ ثبت
                        </th>
                    </tr>
                </thead>
                <tbody v-if="!isGettingData" class="text-center">
                    <tr v-for="(item, index) in lazyCreditsData" :key="item.id"
                        class="bg-white border-b border-ava-border-bg font-yekanX text-sm text-ava-gray">
                        <td>{{ item.changeType.name }}</td>
                        <td>{{ this.priceFormat.format(item.currentAmount) }}</td>


                        <td v-if="item.isIncreasing">
                            <div
                                class="bg-ava-info-bg-green text-ava-success rounded-ava18 h-8 w-20 flex justify-center text-center mx-auto">
                                <p class="m-0 text-ava-success text-xs my-auto">
                                    {{
                                        this.priceFormat.format(CalculateChangeAmount(item.currentAmount, item.lastAmount)) }}
                                </p>
                            </div>
                        </td>
                        <td v-else>
                            <div
                                class="bg-ava-info-bg-red text-ava-orange rounded-ava18 h-8 w-20 flex justify-center text-center mx-auto">
                                <p class="m-0 text-ava-orange text-xs my-auto">
                                    {{
                                        this.priceFormat.format(CalculateChangeAmount(item.currentAmount, item.lastAmount)) }}
                                </p>
                            </div>
                        </td>

                        <td class="px-6 py-4">
                            {{ this.priceFormat.format(item.lastAmount) }}
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

        <div v-if="!isGettingData && creditsData.length === 0" class="bg-white h-[60%] flex items-center justify-center">
            <p class="mt-3 text-ava-green font-yekanX text-sm">
                اطلاعاتی برای نمایش وجود ندارد
            </p>
        </div>

        <div v-if="!isGettingData && showRequestDataBtn && creditsData.length > 0"
            class="flex justify-center bg-white rounded-b-ava10">
            <p @click="RequestMoreCreditsData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
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
            <div v-for="(item, index) in lazyCreditsData" :key="index" class="rounded-ava10 border-2 p-4">
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
                            {{ this.priceFormat.format(item.lastAmount) }}
                        </p>

                        <p class="m-0 text-ava-black text-sm">
                            اعتبار قبلی
                        </p>
                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <div v-if="item.isIncreasing">
                            <div
                                class="bg-ava-info-bg-green text-ava-success rounded-ava18 h-8 w-20 flex justify-center text-center mx-auto">
                                <p class="m-0 text-ava-success text-xs my-auto">
                                    {{
                                        this.priceFormat.format(CalculateChangeAmount(item.currentAmount, item.lastAmount)) }}
                                </p>
                            </div>
                        </div>
                        <div v-else>
                            <div
                                class="bg-ava-info-bg-red text-ava-orange rounded-ava18 h-8 w-20 flex justify-center text-center mx-auto">
                                <p class="m-0 text-ava-orange text-xs my-auto">
                                    {{
                                        this.priceFormat.format(CalculateChangeAmount(item.currentAmount, item.lastAmount)) }}
                                </p>
                            </div>
                        </div>

                        <p class="m-0 text-ava-black text-sm">
                            مقدار تغییر
                        </p>
                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <p class="m-0 text-ava-gray text-sm">
                            {{ this.priceFormat.format(item.currentAmount) }}
                        </p>
                        <p class="m-0 text-ava-black text-sm">
                            اعتبار باقی مانده </p>
                    </div>

                    <hr class="text-ava-gray">

                    <div class="flex flex-row justify-between">
                        <p class="m-0 text-ava-gray text-sm">
                            {{ item.changeType.name }}
                        </p>
                        <p class="m-0 text-ava-black text-sm">
                            بابت
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

        <div v-if="!isGettingData && creditsData.length === 0" class="bg-white h-[50%] flex items-center justify-center">
            <p class="mt-3 text-ava-green font-yekanX text-sm">
                اطلاعاتی ثبت شده ای وجود ندارد
            </p>
        </div>

        <div v-if="!isGettingData && showRequestDataBtn && creditsData.length > 0"
            class="flex justify-center bg-white rounded-b-ava10">
            <p @click="RequestMoreCreditsData" class="mt-3 text-ava-green font-yekanX text-sm cursor-pointer">
                نمایش بیشتر
            </p>
        </div>
    </div>
    <!-- Mobile table -------------------------------------------------------- -->
</template>