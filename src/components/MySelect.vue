<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        value: {
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
            selected: this.value,
            open: false,
            position: "bottom", // default position is bottom
            focusedOptionIndex: -1,
        };
    },

    mounted() {
        this.checkPosition();
    },

    watch: {
        value(newVal) {
            this.selected = newVal;
        },
        selected(newOption) {
            this.$emit("input", newOption);
        },
        open(val) {
            if (val) {
                this.checkPosition();
            }
        },
    },

    methods: {
        checkPosition() {
            const selectRect = this.$el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const topSpace = selectRect.top;
            const bottomSpace = windowHeight - selectRect.bottom;

            if (bottomSpace < 250 && topSpace > bottomSpace) {
                // if less than 250px space at bottom and top space is greater than bottom space
                this.position = "top";
            } else {
                this.position = "bottom";
            }
        },

        toggleDropdown() {
            this.open = !this.open;
        },

        selectOption(option) {
            this.selected = option;
            this.open = false;
        },

        focusPreviousOption() {
            if (this.focusedOptionIndex > 0) {
                this.focusedOptionIndex--;
            }
        },

        focusNextOption() {
            if (this.focusedOptionIndex < this.options.length - 1) {
                this.focusedOptionIndex++;
            }
        },

        selectFocusedOption() {
            if (this.focusedOptionIndex !== -1) {
                const focusedOption = this.options[this.focusedOptionIndex];
                this.selectOption(focusedOption);
            }
        },
    },
};
</script>

<template>
    <div class="custom-select ss02" :tabindex="tabindex" @blur="open = false" :class="{ 'select-top': position === 'top' }"
        @keydown.space.prevent="open = !open" @keydown.up.prevent="focusPreviousOption"
        @keydown.down.prevent="focusNextOption" @keydown.enter.prevent="selectFocusedOption">
        <div class="selected" :class="{ open: open }" @click="toggleDropdown">
            {{ selected }}
        </div>
        <div class="items overflow-y-auto max-h-32" :class="{ selectHide: !open }">
            <div v-for="(option, i) of options" :key="i"
                :class="{ 'not-selected': option !== selected, 'selected-item': option === selected, 'focused': focusedOptionIndex === i }"
                @mouseenter="focusedOptionIndex = i" @click="selectOption(option)">
                {{ option }}
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

.custom-select.select-top .items {
    margin-bottom: 5px;
    margin-top: auto;
    bottom: 100%;
}

.custom-select.select-top .selected:after {
    top: auto;
    bottom: 22px;
    transform: rotate(180deg);
}
</style>