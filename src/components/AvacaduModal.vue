<script>
import axios from "axios";
import MyInput from './MyInput.vue';
import MyButton from "./MyButton.vue";
import PhoneInput from './PhoneInput.vue';
import Alert from "../components/Alert.vue";
import BackIcon from "./icons/backIcon.vue";
import PlayIcon from "./icons/PlayIcon.vue";
import PauseIcon from "./icons/PauseIcon.vue";
import closeIcon from './icons/closeIcon.vue';
import uploadIcon from "./icons/uploadIcon.vue";
import NextImgIcon from "./icons/nextImgIcon.vue";
import UploadStatusBar from "./UploadStatusBar.vue";
import closeImageIcon from "./icons/closeImageicon.vue";
import PreviousImgIcon from "./icons/previousImgIcon.vue";

export default {
    name: 'AavacaduModal',

    components: {
        Alert,
        MyInput,
        MyButton,
        BackIcon,
        PlayIcon,
        PauseIcon,
        closeIcon,
        PhoneInput,
        uploadIcon,
        NextImgIcon,
        closeImageIcon,
        PreviousImgIcon,
        UploadStatusBar,
    },

    props: {
        showAvacaduModal: {
            type: Boolean,
            default: false,
        },
    },

    created() {
        this.ThemeChanged();
    },

    data() {
        return {
            price: 0,

            agreed: false,
            isPrivate: false,
            canSendData: false,
            isProcessing: false,
            isValidPhone: false,
            showPreviewCard: false,

            // --------------------------------------------------------
            // Send Data section

            email: "",
            title: "",
            password: "",
            avacaduText: "",
            phoneNumber: "",

            errorMessage: "",

            // --------------------------------------------------------

            isDraggingMusic: false,
            isDraggingCustomTheme: false,

            musicFile: null,
            customThemeFile: null,

            currentTrack: {
                src: null,
            },

            imageUrl: "",

            maxMusicSize: 10400000,
            maxCustomThemeSize: 1000000,

            // --------------------------------------------------------

            categories: [],
            selectedCategory: 1,

            themeImages: [],
            selectedTheme: 0,
            selectedImage: null,
            filteredThemeImages: [],

            selectedImage: null,
            selectedThemeIndexOfFilteredThemeImages: 0,

            isPlaying: false,
            duration: "0:00",
            currentTime: "0:00",
            progressDuration: 0,
            progressCurrentTime: 0,

            axiosAbortController: null,

            sendData: [],
            showStatusCard: false,

            showAlert: false,
        };
    },

    methods: {
        async PostNewAvacadu() {
            this.showStatusCard = true;

            let sendForm = {
                phoneNumber: "0" + this.phoneNumber,
                email: this.email,
                voiceFile: this.musicFile,
                imageFile: this.customThemeFile,
                heading: this.title,
                paragraph: this.avacaduText,
                themeId: this.selectedImage,
                isPrivate: this.isPrivate,
                password: this.password,
            };

            var token = sessionStorage.getItem("bearer");

            this.axiosAbortController = new AbortController();

            await axios({
                method: "post",
                url: this.$baseUrl + "Contract/NewVoiceContract",
                data: sendForm,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: function (progressEvent) {
                    this.sendData.currentValue = parseInt(
                        Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    );
                    this.sendData.maxValue = 100;
                }.bind(this),
                signal: this.axiosAbortController.signal,
            })
                .then((response) => {
                    this.showStatusCard = false;
                }).catch((error) => {
                    this.ShowErrorMessage(
                        error.response.data.message
                    );

                }).finally(() => {

                    setInterval(
                        () => window.location.reload(),
                        100
                    )
                })

            this.$emit("upload-progress-status", this.sendData);
        },
        cancelUpload() {
            if (this.axiosAbortController) {
                this.axiosAbortController.abort();
            }
        },


        async ThemeChanged() {
            await axios({
                method: "get",
                url: this.$baseUrl + "Theme/CategoryList",
            })
                .then((response) => {
                    this.categories = response["data"]["data"];
                    this.selectedCategory = this.categories[0].id;
                    this.CategoryChanged();
                    this.selectedTheme = 1;
                })
                .catch((error) => {
                    this.ShowErrorMessage(error.response.data.message);
                });

            await axios({
                method: "get",
                url: this.$baseUrl + "Theme/List",
            })
                .then((response) => {
                    this.themeImages = response["data"]["data"];
                    this.CategoryChanged();
                })
                .catch((error) => {
                    this.ShowErrorMessage(error.response.data.message);
                });
        },

        async CalculatePrice() {
            var token = sessionStorage.getItem("bearer");
            await axios({
                method: "get",
                url: this.$baseUrl + "Wallet/CalculateTransactionPrice/avacadu-1",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    let priceFormat = new Intl.NumberFormat("fa-Ir");
                    this.price = priceFormat.format(response.data.data);
                })
                .catch((error) => {
                    this.ShowErrorMessage(error.response.data.message);
                });
        },

        CloseCard() {
            this.$emit('update-showAvacaduModal', false);
        },

        ShowErrorMessage(message) {
            this.showAlert = true;
            this.errorMessage = message;
        },

        Confirm() {
            this.CalculatePrice();
            this.showPreviewCard = true;
        },

        Back() {
            this.showPreviewCard = false;
        },

        NextImage() {
            //check for the boundery. if its in the edge then next should change the theme to the first item in the list
            if (
                this.selectedThemeIndexOfFilteredThemeImages + 1 >
                this.filteredThemeImages.length - 1
            ) {
                this.selectedThemeIndexOfFilteredThemeImages = 0;
            } else {
                //or go to the next index
                this.selectedThemeIndexOfFilteredThemeImages++;
            }

        },

        PreviousImage() {
            //check for the boundery. if its in the edge then next should change the theme to the first item in the list
            if (this.selectedThemeIndexOfFilteredThemeImages - 1 < 0) {
                this.selectedThemeIndexOfFilteredThemeImages =
                    this.filteredThemeImages.length - 1;
            } else {
                //or go to the next index
                this.selectedThemeIndexOfFilteredThemeImages--;
            }
        },

        HandleImageClick(imageID) {
            this.filteredThemeImages.forEach((img) => {
                if (img.id == this.selectedImage) {
                    this.selectedThemeIndexOfFilteredThemeImages =
                        this.filteredThemeImages.indexOf(img);
                }
            });

            this.selectedImage = imageID;
        },

        CategoryChanged() {
            this.filteredThemeImages = [];
            this.themeImages.forEach((img) => {
                if (this.selectedCategory === img.categoryId) {
                    this.filteredThemeImages.push(img);
                }
            });
        },

        // --------------------------------------------------------

        OnChangeMusic() {
            var files = [...this.$refs.musicFile.files];

            this.musicFile = null;
            this.currentTrack.src = null;

            if (files[0].size > this.maxMusicSize) {
                this.ShowErrorMessage("حجم فایل انتخابی بیش از 10 مگابایت است.");
                return;
            };

            this.musicFile = files[0];
            const file = this.musicFile;

            if (file) {
                this.currentTrack.src = URL.createObjectURL(file);
            };
        },

        DragoverMusic(e) {
            e.preventDefault();
            this.isDraggingMusic = true;
        },

        DragleaveMusic() {
            this.isDraggingMusic = false;
        },

        DropMusic(e) {
            e.preventDefault();
            this.$refs.musicFile.files = e.dataTransfer.files;
            this.isDraggingMusic = false;
            this.OnChangeMusic();
        },

        // --------------------------------------------------------

        OnChangeCustomTheme() {
            var files = [...this.$refs.photoFile.files];
            this.customThemeFile = null;
            this.imageUrl = null;
            if (files[0].size > this.maxCustomThemeSize) {
                this.ShowErrorMessage("حجم فایل انتخابی از یک مگابایت بیشتر است.");
                return;
            }
            this.customThemeFile = files[0];
            // this.imageUrl = URL.createObjectURL(this.customThemeFile);
        },

        DragoverCustomTheme(e) {
            e.preventDefault();
            this.isDraggingCustomTheme = true;
        },

        DragleaveCustomTheme() {
            this.isDraggingCustomTheme = false;
        },

        DropCustomTheme(e) {
            e.preventDefault();
            this.$refs.photoFile.files = e.dataTransfer.files;
            this.OnChangeCustomTheme();
            this.isDraggingCustomTheme = false;
        },

        // --------------------------------------------------------

        TogglePlayback() {
            this.isPlaying = !this.isPlaying;
            const audio = this.$refs.audio;
            if (this.isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        },

        OnTimeUpdate() {
            const audio = this.$refs.audio;

            this.progressCurrentTime = audio.currentTime;
            this.progressDuration = audio.duration;

            const currentTime = Math.floor(audio.currentTime);
            const duration = Math.floor(audio.duration);
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = currentTime % 60;
            const durationMinutes = Math.floor(duration / 60);
            const durationSeconds = duration % 60;
            this.currentTime = `${currentMinutes}:${currentSeconds
                .toString()
                .padStart(2, "0")}`;
            this.duration = `${durationMinutes}:${durationSeconds
                .toString()
                .padStart(2, "0")}`;
        },
    },

    computed: {
        CanSendData() {
            if (!this.isValidPhone || !this.agreed ||

                !this.musicFile ||

                (this.isPrivate && this.password.length < 4) ||
                (this.selectedTheme === 0 || this.selectedImage === null)
            ) {

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
    <div v-if="showAvacaduModal">

        <alert v-if="showAlert" :show-alert="showAlert" @update-showAlert="showAlert = $event" :message="errorMessage"
            type="error" />

        <upload-status-bar v-if="showStatusCard" :show-status-card="showStatusCard"
            @update-showStatusCard="showStatusCard = $event" :upload-progress-status="sendData"
            @update-uploadProgressStatus="sendData = $event" @cancel-upload="cancelUpload" />


        <div v-else class="overlay flex items-center justify-center">
            <div v-if="!showPreviewCard"
                class="w-[90%] sm:w-96 p-4 bg-white rounded-md flex flex-col gap-4 z-50 overflow-y-auto max-h-[85vh]">
                <div class="flex items-center justify-between">
                    <button @click="CloseCard">
                        <close-icon class="text-ava-black" />
                    </button>

                    <h1 class="text-ava-black text-center font-bjn font-bold text-2xl m-0">
                        ثبت آواکادو جدید
                    </h1>
                </div>

                <phone-input v-model="phoneNumber" @update-isValidPhone="isValidPhone = $event" />

                <my-input class="rounded-ava10 font-yekanX text-xs r2l" type="email" maxLength="30" placeholder="ایمیل"
                    v-model="email" />

                <my-input class="rounded-ava10 font-yekanX text-xs r2l" type="text" maxLength="30" placeholder="عنوان"
                    v-model="title" />

                <textarea class="avacadu-text-input ss02 r2l" name="avacaduText" id="avacaduText" cols="3" rows="3"
                    placeholder="متن" maxlength="190" v-model="avacaduText"></textarea>


                <div @dragover="DragoverMusic" @dragleave="DragleaveMusic" @drop="DropMusic"
                    class="bg-ava-bg-gray rounded-lg text-ava-gray font-yekanX text-xs p-2 text-center h-14">

                    <input type="file" name="mFile" id="musicFileInput" class="hidden" @change="OnChangeMusic"
                        ref="musicFile" accept=".mp3,.ogg, .flac, .aac, .wav" maxlength="1" />

                    <div class="flex flex-row justify-between">
                        <label for="musicFileInput"
                            class="bg-ava-black w-28 h-10 rounded-ava7 flex flex-row items-center justify-between text-white p-2 cursor-pointer">
                            <upload-icon />
                            <p class="m-0 font-yekanX text-xs">بارگذاری صدا</p>
                        </label>
                        <label for="musicFileInput" class="cursor-pointer flex items-center">
                            <div>
                                <p class="m-0 text-right" v-if="isDraggingMusic">
                                    فایل صوتی را رها کنید
                                </p>

                                <div v-else>
                                    <p v-if="musicFile" class="text-right m-0 max-w-[200px]">
                                        {{ musicFile["name"] }}
                                    </p>

                                    <p v-else class="text-right m-0">
                                        فایل صوتی را بارگذاری نمایید
                                    </p>
                                </div>

                            </div>
                        </label>
                    </div>
                </div>

                <select
                    class="px-4 py-3 border-gray-200 rounded-ava10 text-sm bg-ava-bg-gray font-yekanX text-ava-gray ss02"
                    v-model="selectedCategory" @change="CategoryChanged">
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.title }}
                    </option>
                </select>

                <div class="flex flex-row gap-4 justify-start p-2 bg-ava-bg-gray rounded-ava10 min-h-[120px] overflow-x-auto"
                    v-if="selectedTheme === 1">
                    <img class="w-5/12 rounded-ava10 cursor-pointer not-selected transition"
                        v-for="image in filteredThemeImages" :key="image.id" :src="image.thumbnail"
                        @click="HandleImageClick(image.id)" :class="{ selected: selectedImage === image.id }" />
                </div>

                <div @dragover="DragoverCustomTheme" @dragleave="DragleaveCustomTheme" @drop="DropCustomTheme"
                    class="bg-ava-bg-gray rounded-lg text-ava-gray font-yekanX text-xs p-2 text-center h-14">

                    <input type="file" name="tFile" id="themeFileInput" class="hidden" @change="OnChangeCustomTheme"
                        ref="photoFile" accept=".jpg, .jpeg, .png" maxlength="1" />

                    <div class="flex flex-row justify-between">
                        <label for="themeFileInput"
                            class="bg-ava-black w-28 h-10 rounded-ava7 flex flex-row items-center justify-between text-white p-2 cursor-pointer">
                            <upload-icon />
                            <p class="m-0 font-yekanX text-xs">بارگذاری عکس</p>
                        </label>
                        <label for="themeFileInput" class="cursor-pointer flex items-center">
                            <div>
                                <p class="m-0 text-right" v-if="isDraggingCustomTheme">
                                    عکس را رها کنید
                                </p>

                                <div v-else>
                                    <p v-if="customThemeFile" class="text-right m-0 max-w-[200px]">
                                        {{ customThemeFile["name"] }}
                                    </p>

                                    <p v-else class="text-right m-0">
                                        تم شخصی تان را بارگذاری نمایید
                                    </p>
                                </div>

                            </div>
                        </label>
                    </div>
                </div>

                <div class="flex flex-row items-center justify-end gap-4 px-1">
                    <div class="flex flex-row items-center gap-2">
                        <label class="ss02 font-yekanX text-ava-gray cursor-pointer flex" for="r2">عمومی</label>
                        <input class="radio-btn" id="r2" type="radio" v-bind:value="false" v-model="isPrivate">
                    </div>

                    <div class="flex flex-row items-center gap-2">
                        <label class="ss02 font-yekanX text-ava-gray cursor-pointer flex" for="r1">خصوصی</label>
                        <input class="radio-btn" id="r1" type="radio" v-bind:value="true" v-model="isPrivate">
                    </div>
                </div>

                <my-input v-if="isPrivate" class="rounded-ava10 r2l" type="password" maxLength="30" placeholder="رمز"
                    v-model="password" />

                <div class="flex flex-row gap-2 items-center justify-end px-1">
                    <label for="test" class="ss02 font-yekanX text-ava-gray cursor-pointer text-xs">
                        شرایط و ضوابط را خوانده قبول دارم
                    </label>
                    <input id="test" class="check-btn m-0" type="checkbox" v-model="agreed" v-bind:value="!agreed">
                </div>

                <div class="flex items-center justify-start">
                    <my-button btnType="primary w-36 h-12 m-0" :canSendData="CanSendData" :busy="isProcessing"
                        @click="Confirm">
                        تایید و ادامه
                    </my-button>
                </div>
            </div>


            <!-- -------------------------------------------------------- -->
            <!-- Preview card -->

            <div v-if="showPreviewCard"
                class="w-[90%] sm:w-96 p-4 bg-white rounded-md flex flex-col gap-4 z-50 overflow-y-auto max-h-[85vh]">

                <div class="flex items-center justify-between">
                    <button @click="CloseCard">
                        <close-icon class="text-ava-black" />
                    </button>
                    <button @click="Back">
                        <back-icon class="text-ava-black" />
                    </button>
                </div>

                <div class="flex flex-row justify-between">
                    <button v-if="selectedTheme === 1" @click="PreviousImage">
                        <previous-img-icon />
                    </button>

                    <img class="rounded-ava10 w-3/4" v-if="selectedTheme === 1" :src="this.filteredThemeImages[
                        this.selectedThemeIndexOfFilteredThemeImages
                    ].thumbnail
                        " />
                    <img class="rounded-ava10 w-3/4" v-else-if="selectedTheme === 0" :src="imageUrl" />

                    <button v-if="selectedTheme === 1" @click="NextImage">
                        <next-img-icon />
                    </button>

                </div>

                <div class="flex flex-col gap-2 items-center justify-center">
                    <h1 class="r2l m-0 font-bjn text-ava-black font-bold text-3xl">
                        {{ title }}
                    </h1>
                    <p class="text-center r2l font-yekanX text-sm text-ava-gray m-0">
                        {{ avacaduText }}
                    </p>
                </div>

                <div class="flex flex-row items-center justify-end gap-3">

                    <button class="m-0 text-ava-gray" @click="TogglePlayback">
                        <pause-icon v-if="isPlaying" />

                        <play-icon v-else />
                    </button>

                    <audio class="m-0" ref="audio" :src="currentTrack.src" @timeupdate="OnTimeUpdate"></audio>

                    <progress class="m-0 w-52 h-2" :value="progressCurrentTime" :max="progressDuration"></progress>

                    <p class="m-0 font-yekanX ss02 text-ava-gray text-sm">
                        {{ currentTime }}/{{ duration }}
                    </p>
                </div>

                <div class="font-yekanX text-ava-gray text-sm ss02 flex flex-row items-center justify-end">
                    <p class="m-0">تومان</p>

                    <p class="m-0">
                        {{ price }}
                    </p>

                    <p class="text-ava-black m-0">
                        : هزینه این آواکادو
                    </p>
                </div>

                <div>
                    <my-button btnType="primary h-12 m-0" @click="PostNewAvacadu">تایید و ثبت سفارش
                    </my-button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.avacadu-text-input {
    @apply resize-none bg-ava-bg-gray w-full h-24 text-ava-green py-2 px-3 font-yekanX text-sm rounded-ava10 min-h-[96px];
}


.not-selected {
    border: 2px solid #80848F;
    box-shadow: 0 0 5px #80848F;
}

.selected {
    border: 2px solid #4a7337;
    box-shadow: 0 0 5px #4a7337;
}

.avacadu-text-input:focus {
    transition: 0.3s;
    @apply outline-ava-green bg-white;
}

.avacadu-text-input::placeholder {
    @apply text-ava-gray-2 text-sm
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

progress {
    border-radius: 4px;
}

progress::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #d9d9d9;
}

progress::-webkit-progress-value {
    border-radius: 4px;
    background-color: #4a7337;
}

progress::-moz-progress-bar {
    border-radius: 4px;
    background-color: #4a7337;
}
</style>