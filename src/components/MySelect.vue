<script>
export default {
    props: {

        options: {
            type: Array,
            required: true,
        },

        default: {
            type: String,
            required: false,
            default: "تیتر",
        },

        tabindex: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    data() {
        return {
            selected: this.default
                ? this.default
                : this.options.length > 0
                    ? this.options[0]
                    : null,
            open: false,
        };
    },
    mounted() {
        this.$emit("input", this.selected);
    },
};
</script>

<template>
    <div class="custom-select ss02" :tabindex="tabindex" @blur="open = false">
        <div class="selected" :class="{ open: open }" @click="open = !open">
            {{ selected }}
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div v-for="(option, i) of options" :key="i" @click="
                selected = option;
            open = false;
            $emit('input', option);
            ">
                <div v-if="option !== selected">
                    <div class="not-selected"> {{ option }}</div>

                </div>
                <div v-else>
                    <div class="selected-item">{{ option }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-select {
    height: 50px;
    outline: none;
    line-height: 47px;
    text-align: right;
    position: relative;
    font-family: 'IRANYekanX';
}

.custom-select .selected {
    border: 0px;
    cursor: pointer;
    color: #959EA6;
    user-select: none;
    padding-right: 1em;
    border-radius: 10px;
    background: #F8F7FF url("../assets/images/ArrowDown.svg") 10px no-repeat;

}

.custom-select .selected.open {
    border: 0px;
    border-radius: 10px;
}

.custom-select .selected:after {
    top: 22px;
    width: 0;
    height: 0;
    left: 1em;
    /* content: ""; */
    position: absolute;
    border: 5px solid transparent;
    background: url("../assets/images/ArrowDown.svg");
    /* border-color: #959EA6 transparent transparent transparent; */
}

.custom-select .items {
    left: 0;
    right: 0;
    z-index: 1;
    color: #959EA6;
    overflow: hidden;
    position: absolute;
    margin-top: 5px;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;
    filter: drop-shadow(0px 0px 4px rgba(80, 76, 76, 0.3));
}

.custom-select .items .not-selected {
    cursor: pointer;
    color: #959EA6;
    user-select: none;
    padding-right: 1em;
    border-radius: 10px;
    background-color: #ffffff;
    border-bottom: 1px solid #fff;
}

.custom-select .items .not-selected:hover {

    background-color: #F8F7FF;
}

.selectHide {
    display: none;

}


.custom-select .items .selected-item {
    cursor: pointer;
    color: #959EA6;
    user-select: none;
    padding-right: 1em;
    border-radius: 10px;
    background-color: #F8F7FF;
    border-bottom: 1px solid #fff;
}
</style>