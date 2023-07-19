<script>
import MyInput from "../components/MyInput.vue";
import MyButton from "../components/MyButton.vue";
import MySelect from "../components/MySelect.vue";

export default {
    components: {
        MyInput,
        MyButton,
        MySelect,
    },

    data() {
        return {
            checked: false,
            isPrivate: false,
        };
    },

    methods: {
        test(id) {
            console.log(id);
        },

        CheckButton() {
            console.log("checked : " + this.checked);
        },

        RadioButton() {
            console.log("is private : " + this.isPrivate);
        }
    }
}
</script>

<template>
    <main class="p-20">

        <a href="/">home</a>

        <br>
        <br>

        <my-button btnType="primary" @click="test(1)" :canSendData="false">
            دکمه 1
        </my-button>

        <my-button btnType="primary" @click="test(2)">دکمه 2</my-button>

        <my-button btnType="dark" @click="test(3)">دکمه 3</my-button>

        <my-button btnType="lgreen" @click="test(4)">دکمه 4</my-button>

        <my-button btnType="danger" @click="test(5)">دکمه 5</my-button>

        <my-button btnType="success" @click="test(6)">دکمه 6</my-button>

        <my-button btnType="bordered-dark" @click="test(7)">دکمه 7</my-button>

        <my-button btnType="bordered-primary" @click="test(8)">دکمه 8</my-button>

        <my-button class="h-14 w-80" btnType="primary" @click="test(9)">
            دکمه با ابعاد دلخواه
        </my-button>

        <my-button class="w-[35%] h-20" btnType="lgreen" @click="test(10)" :busy="true">
            در حال ارسال
        </my-button>

        <br>
        <br>
        <br>

        <select class="my-select ss02">
            <option selected>دراپ دون</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>سلام 2</option>
        </select>

        <br>
        <br>
        <br>

        <my-select :options="[1, 2]" class=" w-60" default="سلکت کاستوم" />

        <br>
        <br>
        <br>

        <label for="test" class="ss02 font-yekanX text-ava-gray cursor-pointer flex">دکمه چک باکس 2</label>
        <input id="test" class="checkbox-btn " type="checkbox" v-model="checked" @change="CheckButton"
            v-bind:value="!checked">


        <br>
        <br>
        <br>

        <label class="ss02 font-yekanX text-ava-gray cursor-pointer flex" for="r2">عمومی</label>
        <input class="radio-btn" id="r2" type="radio" v-bind:value="false" v-model="isPrivate" @change="RadioButton">

        <br>
        <br>
        <br>

        <label class="ss02 font-yekanX text-ava-gray cursor-pointer flex" for="r1">خصوصی</label>
        <input class="radio-btn" id="r1" type="radio" v-bind:value="true" v-model="isPrivate" @change="RadioButton">

        <br>
        <br>
        <br>

    </main>
</template>


<style scoped></style>
