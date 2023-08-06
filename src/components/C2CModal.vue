<script>
import axios from 'axios';
import Alert from './alert.vue';
import MyInput from './MyInput.vue';
import MyButton from './Mybutton.vue';
import JalaaliMoment from "moment-jalaali";
import closeIcon from './icons/closeIcon.vue';
import uploadIcon from "./icons/uploadIcon.vue";
import MySelect from "../components/MySelect.vue";
import closeImageIcon from "./icons/closeImageicon.vue";

export default {
    name: 'C2CModal',

    components: {
        Alert,
        MyInput,
        MyButton,
        MySelect,
        closeIcon,
        uploadIcon,
        closeImageIcon,
    },

    props: {
        showC2CModal: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            alertType: "error",

            showAlert: false,
            alertMessage: "",

            files: [],
            isDragging: false,

            errorMessage: "",
            canSendData: false,
            isProcessing: false,

            amount: "",
            paymentDate: "",
            trackingCode: "",

            selectedDate: "",

            selectedDay: "",
            selectedYear: "",
            selectedMonth: "",

            days: [],

            months: [
                "فروردین",
                "اردیبهشت",
                "خرداد",
                "تیر",
                "مرداد",
                "شهریور",
                "مهر",
                "آبان",
                "آذر",
                "دی",
                "بهمن",
                "اسفند",
            ],
        };
    },

    created() {
        this.SetTodayDate(); for (let i = 1; i <= 31; i++) {
            this.days.push(i);
        }
    },

    methods: {
        async PostNewC2C() {
            this.isProcessing = true;

            const persianDate = JalaaliMoment(this.selectedDate, 'jYYYY/jMM/jDD');
            const georgianDate = persianDate.format('YYYY/MM/DD HH:mm:ss');

            var token = sessionStorage.getItem("bearer");

            await axios({
                method: "post",
                url: this.$baseUrl + "Wallet/CardToCardInfo",
                data: {


                    ReceiptImage: this.files[0],
                    Amount: this.amount,
                    PaymentDate: georgianDate,
                    RecoveryNumber: this.trackingCode,
                },

                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    this.showAlert = true;
                    this.alertType = "success";
                    this.alertMessage = response.data.message;
                    setTimeout(this.CloseCard, 2000);
                })
                .catch((error) => {
                    this.showAlert = true;
                    this.alertType = "error";
                    this.alertMessage = error["response"]["data"]["message"];
                });

            this.isProcessing = false;
        },

        CloseCard() {
            this.$emit('update-showC2CModal', false);
        },

        DateChanged() {
            this.selectedDate = `${this.selectedYear}/${this.selectedMonth}/${this.selectedDay}`;
        },

        SetTodayDate() {
            // get the current date and time in jalali (persian date format).
            const now = JalaaliMoment().format("jYYYY/jM/jD");
            const [year, month, day] = now.toString().split("/");

            this.selectedDay = day;
            this.selectedYear = year;
            this.selectedMonth = month;

            this.DateChanged();
        },

        Dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },

        Dragleave() {
            this.isDragging = false;
        },

        Drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.OnChange();
            this.isDragging = false;
        },

        RemoveImage(i) {
            this.files.splice(i, 1);
        },

        OnChange() {
            this.files = [...this.$refs.file.files];

            if (this.files.length > 10) {
                this.errorMessage =
                    "حداکثر تعداد تصویر مجاز برای هر آلبوم، 10 عدد می باشد.";
                this.ShowErrorMessage();
                this.files = [];
            }

            this.files.forEach((file) => {
                if (file.size > 1000000) {
                    this.errorMessage =
                        "حداکثر حجم مجاز برای هر تصویر، یک مگابایت می باشد.";
                    this.ShowErrorMessage();
                    this.files = [];
                    return;
                }
            });
        },

        GenerateURL(file) {
            let fileSrc = URL.createObjectURL(file);
            setTimeout(() => {
                URL.revokeObjectURL(fileSrc);
            }, 1000);
            return fileSrc;
        },
    },

    computed: {
        CanSendData() {
            return true;
            if (this.amount.length < 4 || this.trackingCode.length < 4 || this.files.length === 0) {
                this.canSendData = false;
                return false;

            } else {
                this.canSendData = true;
                return true;
            }
        },
    },

    watch: {
        selectedMonth: function (newVal) {
            // Update the number of days in the month when the month changes
            const year = JalaaliMoment().jYear();
            const month = newVal - 1;
            const daysInMonth = JalaaliMoment.jDaysInMonth(year, month);
            this.days = [];
            for (let i = 1; i <= daysInMonth; i++) {
                this.days.push(i);
            }
        },
    },
}
</script>

<template>
    <alert v-if="showAlert" title="" :show-alert="showAlert" @update-showAlert="showAlert = $event" :message="alertMessage"
        :type="alertType" />
    <div v-if="showC2CModal">
        <div class="overlay flex items-center justify-center">
            <div class="w-[90%] sm:w-96 p-4 bg-white rounded-md flex flex-col gap-3 z-50">
                <div class="flex justify-start items-center">
                    <button @click="CloseCard">
                        <close-icon class="text-ava-black" />
                    </button>
                </div>
                <div class="flex flex-col justify-center items-center gap-1">
                    <h1 class="text-ava-black text-center font-bjn font-bold text-xl m-0">
                        ثبت کارت به کارت
                    </h1>
                    <p class="font-yekanX text-ava-gray text-xs text-center ss02" style="direction: rtl;">
                        شماره حساب بانک ملی
                        <strong class="text-ava-black">
                            6280-7985-9981-6037
                        </strong>
                        به نام
                        <strong class="text-ava-black">
                            سعید دارندی
                        </strong>
                        لطفا پس از واریز، اطلاعات فیش را از طریق فرم زیر ارسال کنید.
                    </p>
                </div>

                <div class="flex flex-col gap-3">
                    <my-input class="amount-input rounded-ava10" v-model="amount" type="text" placeholder="مبلغ به تومان"
                        maxlength="30" />

                    <my-input class="amount-input rounded-ava10" type="text" placeholder="کد پیگیری" maxlength="20"
                        v-model="trackingCode" />

                    <div class="flex flex-row justify-between gap-1 m-0">
                        <select class="my-select min-w-[80px] w-24 cursor-pointer" @change="DateChanged"
                            v-model="selectedDay">
                            <option class="ss02" v-for="day in days" :key="day" :value="day">
                                {{ day }}
                            </option>
                        </select>

                        <select class="my-select min-w-[112px] w-28 cursor-pointer" @change="DateChanged"
                            v-model="selectedMonth">
                            <option v-for="(month, index) in months" :key="month" :value="index + 1">
                                {{ month }}
                            </option>
                        </select>

                        <input class="my-select text-center min-w-[80px] w-28 cursor-not-allowed" type="text"
                            placeholder="سال" disabled="true" maxlength="4" v-model="selectedYear" />
                    </div>

                    <div v-if="!files.length" @dragover="Dragover" @dragleave="Dragleave" @drop="Drop"
                        class="bg-ava-bg-gray rounded-lg text-ava-gray font-yekanX text-xs flex flex-col items-center justify-center gap-2 p-3">
                        <upload-icon class="text-ava-gray" />

                        <input type="file" name="file" id="fileInput" class="hidden" @change="OnChange" ref="file"
                            accept=".jpg,.jpeg,.png," />

                        <label for="fileInput" class="cursor-pointer">
                            <div v-if="!files.length">
                                <p class="m-0" v-if="isDragging">
                                    عکس را رها کنید
                                </p>

                                <p v-else class="text-center m-0">
                                    عکس های آلبوم شخصی خود را اینجا بارگذاری کنید یا
                                    <br>
                                    <u class="text-ava-green no-underline">کلیک کنید</u>
                                </p>
                            </div>
                        </label>
                    </div>

                    <div v-if="files.length > 0" class="bg-ava-bg-gray rounded-ava10 overflow-y-auto">
                        <h1 class="font-yekanX text-xs text-right mt-2 mr-4 ss02 mb-1">
                            در حال بارگذاری
                            {{ files.length }}
                            فایل
                        </h1>
                        <div
                            class="bg-ava-bg-gray rounded-lg text-ava-gray font-yekanX text-xs flex flex-col gap-2 p-1 items-center">

                            <div v-for="file in files" :key="file.name" class="flex">
                                <button @click="RemoveImage(files.indexOf(file))" title="Remove file"
                                    class="relative bottom-5 left-6">
                                    <close-image-icon />
                                </button>
                                <img class="max-w-[150px] rounded-ava10" :src="GenerateURL(file)" />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-start">
                        <my-button btnType=" primary w-36 h-12 m-0" :canSendData="CanSendData" :busy="isProcessing"
                            @click="PostNewC2C">
                            تایید و ادامه
                        </my-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.amount-input::placeholder {
    text-align: right;
}
</style>