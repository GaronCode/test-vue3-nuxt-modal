<template>
    <v-btn
        height="42"
        min-width="140"
        class="vue-modal-button"
        :class="`vue-modal-button_${color}`"
        ><slot
            ><v-icon v-if="icon" size="30">{{ icon }}</v-icon
            >{{ text }}</slot
        >
    </v-btn>
</template>

<script setup lang="ts">
import { ColorTypeVariants } from "./useModal.types";
const props = defineProps({
    text: { default: "Ok", type: String },
    color: { default: "Blue", type: String as PropType<ColorTypeVariants> },
    icon: { type: String },
});
</script>

<style lang="scss" scoped>
.vue-modal-button {
    border-radius: 14px;
    box-shadow: inset 0px 0px 30px #02cf15;
    background-color: #00730b;
    color: #f8fff9;
    font-weight: bold;
    border-style: solid;
    border-width: 1px;

    &_Green {
        box-shadow: inset 0px 0px 30px #02cf15;
        background-color: #00730b;
        border-color: #00d415;
    }

    &_Red {
        box-shadow: inset 0px 0px 30px #a30e27;
        background-color: #700818;
        border-color: #b7102b;
    }

    &_Blue {
        box-shadow: inset 0px 0px 30px #01328e;
        background-color: #01328e;
        border-color: #1c4ead;
    }
}
</style>
