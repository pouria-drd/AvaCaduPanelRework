<script>
import Navbar from '../components/Navbar.vue';
import InfoDiv from '../components/InfoDiv.vue';

export default {
    components: {
        Navbar,
        InfoDiv,
    },

    created() {
        this.username = sessionStorage.getItem('user');
    },

    data() {
        return {
            username: "نام کاربری",
        };
    },
}
</script>

<template>
    <Navbar />
    <main class="bg-ava-panel-bg-gray w-full h-[100vh]">
        <div class="h-16"></div>

        <div class="flex gap-4 lg:flex-row-reverse flex-col 2md:w-[73%] ml-0 2md:ml-8 mb-5 2md:justify-start justify-end">


            <div class="w-[80%] lg:w-1/3 order-1 lg:order-2 mx-auto 2md:m-0">
                <div class="flex flex-row justify-between h-5/6 cursor-pointer">

                    <div class="bg-white w-1/3 rounded-s-ava10 border-r-2">
                        <div class="mt-3">
                            <img class="mx-auto mb-2" src="../assets/images/newAvacaduIcon.svg" alt="NewAvacaduIcon">
                        </div>
                        <p class="text-ava-green text-xs text-center font-yekanX">
                            آواکادوی جدید
                        </p>
                    </div>

                    <div class="bg-white w-1/3 border-r-2">
                        <div class="mt-3">
                            <img class="mx-auto mb-2" src="../assets/images/newAlbumIcon.svg" alt="NewAvacaduIcon">
                        </div>
                        <p class="text-ava-green text-xs text-center font-yekanX">
                            آلبوم جدید
                        </p>
                    </div>

                    <div class="bg-white w-1/3 rounded-e-ava10">
                        <div class="mt-3">
                            <img class="mx-auto mb-2" src="../assets/images/newCreditIcon.svg" alt="NewAvacaduIcon">
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

        <div>
            <div class="w-full ml-0 flex flex-wrap justify-center 2lg:justify-end 2md:w-[73%] 2md:ml-8">
                <info-div bg-color="red" title="64455 تومان" caption="سقف اعتبار" />

                <info-div bg-color="lightBlue" title="64455 تومان" caption="اعتبار فعلی" />

                <info-div bg-color="green" title="64455 تومان" caption="تعداد آلبوم های ثبت شده" />

                <info-div bg-color="purple" title="64455 تومان" caption="تعداد آواکادو های ثبت شده" />
            </div>
        </div>
    </main>
</template>