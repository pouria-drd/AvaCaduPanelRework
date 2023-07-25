<script>
import axios from "axios";
import InfoDiv from "../components/InfoDiv.vue";
import ResTable from "../components/ResTable.vue";
import albumIcon from "../components/icons/albumIcon.vue";
import walletIcon from "../components/icons/walletIcon.vue";
import avacaduIcon from "../components/icons/avacaduIcon.vue";

export default {
    components: {
        InfoDiv,
        ResTable,
        albumIcon,
        walletIcon,
        avacaduIcon,
    },

    created() {
        this.username = sessionStorage.getItem('user');
        this.RequestAlbumData();
    },

    data() {
        return {
            username: "نام کاربری",

            albumData: [],
            isGettingData: false,

        };
    },

    methods: {
        async RequestAlbumData() {

            this.isGettingData = true;

            var token = sessionStorage.getItem("bearer");

            if (token === null) { return null };


            await axios({
                method: 'get',
                url: this.$baseUrl + 'Contract/List/Avacadu',

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
    }
}
</script>

<template>
    <main class="w-full h-auto">

        <div class="flex gap-4 lg:flex-row-reverse flex-col mb-5 2md:justify-start justify-end">


            <div class="w-[80%] lg:w-1/3 order-1 lg:order-2 mx-auto 2md:m-0">
                <div class="flex flex-row justify-between h-5/6 cursor-pointer">

                    <div class="bg-white w-1/3 rounded-s-ava10 border-r-2">
                        <div class="mt-3">
                            <avacadu-icon class="mx-auto mb-2 text-ava-green" />
                        </div>
                        <p class="text-ava-green text-xs text-center font-yekanX">
                            آواکادوی جدید
                        </p>
                    </div>

                    <div class="bg-white w-1/3 border-r-2">
                        <div class="mt-3">
                            <album-icon class="mx-auto mb-2 text-ava-green" />
                        </div>
                        <p class="text-ava-green text-xs text-center font-yekanX">
                            آلبوم جدید
                        </p>
                    </div>

                    <div class="bg-white w-1/3 rounded-e-ava10">
                        <div class="mt-3">
                            <wallet-icon class="mx-auto mb-2 text-ava-green" />
                        </div>
                        <p class="text-ava-green text-xs text-center font-yekanX">
                            افزایش اعتبار
                        </p>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-2/3 flex 2md:justify-end justify-center">

                <div class="flex-col 2md:justify-end justify-center">
                    <div class="flex w-full 2md:justify-end justify-center gap-2">
                        <h1 class="font-bjn text-ava-black text-[34px] inline">
                            {{ username }}
                        </h1>

                        <h1 class="font-bjn text-ava-gray text-[34px] inline">
                            خوش آمدی
                        </h1>
                    </div>

                    <p class="font-yekanX text-ava-gray text-sm mt-1">
                        اینجا شما میتوانید لیست آلبوم خود را مدیریت نمایید
                    </p>
                </div>
            </div>
        </div>

        <res-table :table-data="albumData" :is-album="false" height="h-[50vh]" />
    </main>
</template>