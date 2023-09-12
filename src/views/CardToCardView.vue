<script>
import axios from "axios";
import C2CModal from "../components/C2CModal.vue";
import MyButton from '../components/MyButton.vue';
import C2CTable from '../components/C2CTable.vue';
import card2CardIcon from "../components/icons/card2CardIcon.vue"

export default {
    components: {
        C2CModal,
        MyButton,
        C2CTable,
        card2CardIcon
    },

    data() {
        return {
            canC2C: true,
            showC2CModal: false,
        };
    },

    created() {
        this.CheckC2CStatus();
    },

    methods: {
        NewC2CModal() {
            this.showC2CModal = true;
        },

        async CheckC2CStatus() {
            var token = sessionStorage.getItem("bearer");
            let result = false;

            await axios({
                method: "get",
                url: this.$baseUrl + "Wallet/CardToCardStatus",
                headers: { Authorization: `Bearer ${token}` },

            }).then((response) => {
                result = response.data.status;

            }).catch((error) => {
                result = false;
            });

            this.canC2C = result;
        },
    },
}
</script>

<template>
    <C2CModal v-if="showC2CModal" :show-showC2CModal="showC2CModal" @update-showC2CModal="showC2CModal = $event" />

    <main class="flex flex-col h-[80vh]">
        <div class="flex flex-col-reverse gap-2 md:flex-row justify-between mb-4">
            <my-button :canSendData="canC2C" btnType="primary" @click="NewC2CModal" class="w-fit m-0">
                <div class="flex flex-col items-center gap-2 md:px-3 md:py-1 m-0">
                    <span class="m-0">
                        <card2CardIcon />
                    </span>
                    <div class="m-0 flex flex-col">
                        <small>کارت به کارت جدید</small>
                        <small v-if="!canC2C" class="r2l text-[2px]">
                            (شما از قبل درخواست فعال دارید)
                        </small>
                    </div>
                </div>
            </my-button>

            <div class="text-right">
                <p class="text-ava-black my-auto font-bjn text-2xl font-semibold m-0">
                    لیست کارت به کارت های ثبت شده
                </p>

                <p class="text-ava-gray font-yekanX text-xs m-0">
                    اینجا شما می توانید لیست کارت به کارت خود را مدیریت نمایید
                </p>
            </div>
        </div>
        <c-2-c-table height="min-h-[50vh] max-h-[62.5vh]" />
    </main>
</template>