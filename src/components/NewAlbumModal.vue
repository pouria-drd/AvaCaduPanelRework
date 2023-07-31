<script>
import axios from "axios";
import MyInput from './MyInput.vue';
import MyButton from "./MyButton.vue";
import PhoneInput from './PhoneInput.vue';
import closeIcon from './icons/closeIcon.vue';
import uploadIcon from "./icons/uploadIcon.vue";
import closeImageIcon from "./icons/closeImageicon.vue"

export default {
    name: 'NewAlbumModal',

    components: {
        MyInput,
        MyButton,
        closeIcon,
        PhoneInput,
        uploadIcon,
        closeImageIcon,
    },

    props: {
        showAlbumModal: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            canSendData: false,
            isProcessing: false,

            isDragging: false,

            isValidPhone: false,

            files: [],

            price: "محاسبه نشده",

            axiosAbortController: null,

            errorMessage: "",

            formData: {
                email: "",
                title: "",
                phoneNumber: "",
            },

            phoneNumber: "",

            agreed: false,
        };
    },

    methods: {
        PostNewAlbum() {
            console.log(0);
        },

        async CalculatePrice() {
            this.price = "محاسبه نشده";
            var token = sessionStorage.getItem("bearer");
            await axios({
                method: "get",
                url:
                    this.$baseUrl +
                    "Wallet/CalculateTransactionPrice/album-" +
                    this.files.length,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    let priceFormat = new Intl.NumberFormat("fa-Ir");
                    this.price = priceFormat.format(response.data.data);
                    this.priceCalculated = true;

                    if (response.data.data == 0) {
                        this.priceCalculated = false;
                        this.price = "محاسبه نشده";
                    }
                })
                .catch((error) => { });
        },


        CloseCard() {
            this.$emit('update-showAlbumModal', false);
        },

        OnChange() {
            this.price = "محاسبه نشده";
            this.priceCalculated = false;
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

            this.CalculatePrice();
        },

        ShowErrorMessage() {
            console.error(this.errorMessage);
        },

        cancelUpload() {
            if (this.axiosAbortController) {
                this.axiosAbortController.abort();
            }
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
            this.CalculatePrice();
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
            if (!this.isValidPhone || !this.agreed || this.files.length === 0) {
                this.canSendData = false;
                return false;
            } else {
                this.canSendData = true;
                return true;
            }
        },
    },
}
</script>

<template>
    <div v-if="showAlbumModal">
        <div class="overlay flex items-center justify-center">
            <div class="w-[90%] md:w-96 p-4 bg-white rounded-md flex flex-col gap-4 z-50 overflow-y-auto max-h-[85vh]">
                <div class="flex items-center justify-between">
                    <button @click="CloseCard">
                        <close-icon class="text-ava-black" />
                    </button>

                    <h1 class="text-ava-black text-center font-bjn font-bold text-2xl m-0">
                        ثبت آلبوم جدید
                    </h1>
                </div>


                <phone-input v-model="phoneNumber" @update-isValidPhone="isValidPhone = $event" />

                <my-input class="rounded-ava10 r2l" type="email" maxLength="30" placeholder="ایمیل"
                    v-model="formData.email" />

                <my-input class="rounded-ava10 r2l" type="text" maxLength="30" placeholder="عنوان"
                    v-model="formData.title" />


                <div v-if="!files.length" @dragover="Dragover" @dragleave="Dragleave" @drop="Drop"
                    class="bg-ava-bg-gray rounded-lg text-ava-gray font-yekanX text-xs flex flex-col items-center justify-center gap-2 p-3">
                    <upload-icon class="text-ava-gray" />

                    <input type="file" name="file" id="fileInput" class="hidden" @change="OnChange" ref="file"
                        accept=".jpg,.jpeg,.png," multiple />

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
                <div class=" flex flex-row-reverse gap-2 px-1">
                    <p class="font-yekanX text-xs text-ava-black m-0">
                        : هزینه این آلبوم
                    </p>

                    <p class="font-yekanX text-xs text-ava-gray m-0">
                        {{ price }}
                    </p>
                </div>

                <div class="flex flex-row gap-2 items-center justify-end px-1">
                    <label for="test" class="ss02 font-yekanX text-ava-gray cursor-pointer text-xs">

                        شرایط و ضوابط را خوانده قبول دارم

                    </label>
                    <input id="test" class="check-btn m-0" type="checkbox" v-model="agreed" v-bind:value="!agreed">
                </div>
                <div class="flex items-center justify-start">
                    <my-button btnType=" primary w-36 h-12 m-0" :canSendData="CanSendData" :busy="isProcessing"
                        @click="PostNewAlbum">
                        تایید و ادامه
                    </my-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
}

.check-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: 0.3s;
    appearance: none;
    border-radius: 2px;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: 2px solid #ffffff;
    outline: 2px solid #959ea6;
}

.check-btn:checked {
    border: none;
    content: none;
    appearance: none;
    background-color: #4a7337;
    outline: 2px solid #4a7337;
}

.check-btn:checked::before {
    bottom: 5px;
    font-size: 15px;
    color: #ffffff;
    position: relative;
    font-weight: bolder;
    content: "\00A0\2713\00A0";
}
</style>
