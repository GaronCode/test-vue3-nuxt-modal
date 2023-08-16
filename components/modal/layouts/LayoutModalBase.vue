<template>
    <v-dialog transition="dialog-top-transition" width="400" v-model="value">
        <template v-slot:default>
            <v-card class="vue-modal">
                <v-toolbar color="#01143F" class="vue-modal__header">
                    <v-toolbar-title v-if="header">{{
                        header
                    }}</v-toolbar-title>

                    <v-toolbar-items class="vue-modal__header-items">
                        <slot name="headerTool">
                            <v-btn icon dark>
                                <v-icon @click="emit('close')"
                                    >mdi-close</v-icon
                                >
                            </v-btn>
                        </slot>
                    </v-toolbar-items>
                </v-toolbar>
                <v-container class="vue-modal__container-main">
                    <div
                        class="vue-modal__background"
                        :class="`vue-modal__background_${type}`"
                    ></div>
                    <v-row justify="center">
                        <v-col cols="auto" class="vue-modal__content">
                            <slot></slot>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container
                    v-if="hasSlotButtons"
                    class="vue-modal__container-buttons-bottom"
                >
                    <slot name="buttons"></slot>
                </v-container>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
    header: { default: "Info", type: String },
    modelValue: { type: Boolean },
    type: {
        type: String,
        default: "hidden",
    },
});

const emit = defineEmits(["update:modelValue", "close"]);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
const slots = useSlots();

const hasSlotHeaderTool = computed(() => !!slots["headerTool"]);
const hasSlotButtons = computed(() => !!slots["buttons"]);
</script>

<style lang="scss" scoped>
$danger-color: #3e0f2b;
$succsess-color: #075325;
$info-color: #023763;

.vue-modal,
.v-dialog > .v-overlay__content > .v-card {
    border-radius: 20px;
    border: 1px solid #072155;
}

.vue-modal {
    &__header {
        color: #5aa2eb;
        text-align: center;

        &-items {
            align-items: center;
            justify-content: center;
        }
    }
    &__container-buttons-bottom {
        background-color: #021031;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 20px;
    }
    &__container-main {
        background-color: #010b25;
        min-height: 120px;
        color: #a6bbde;
        text-align: center;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
    }
    &__content {
        z-index: 1;
    }
    &__background {
        $size: 6px;
        position: absolute;
        top: 0;
        left: calc(50% - $size / 2);
        width: $size;
        height: $size;
        border-radius: 50%;
        border: 0px solid #3e0f2b;
        transition: all 0.3s linear;

        &_hidden {
            display: none;
        }

        &_danger {
            border-color: $danger-color;
            box-shadow: 0px 0px 90px 90px $danger-color;
            background-color: $danger-color;
        }
        &_succsess {
            border-color: $succsess-color;
            box-shadow: 0px 0px 90px 90px $succsess-color;
            background-color: $succsess-color;
        }
        &_info {
            border-color: $info-color;
            box-shadow: 0px 0px 90px 90px $info-color;
            background-color: $info-color;
        }
    }
}
</style>
