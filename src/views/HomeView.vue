<script>
import Navbar from '../components/Navbar.vue';
import InfoDiv from '../components/InfoDiv.vue';

export default {
    components: {
        Navbar,
        InfoDiv,
    }
}
</script>

<template>
    <Navbar />
    <main class="bg-ava-panel-bg-gray w-full h-[100vh]">
        <div class="h-20"></div>

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