<script>
import axios from "axios"

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
                            <img @click="OpenQRModal(album.uniqueKey)" src="../assets/images/QRicon.svg" alt="QRicon">
                        </td>

                        <td class="px-6 py-4">
                            {{ album.isActive }}
                        </td>

                        <td class="px-6 py-4">
                            {{ album.phoneNumber }}
                        </td>

                        <td class="px-6 py-4">
                            {{ album.contractGuid }}
                        </td>

                        <td class="px-6 py-4">
                            test
                        </td>
                    </tr>
                </tbody>
            </table>
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
        </div>
    </main>
</template>
