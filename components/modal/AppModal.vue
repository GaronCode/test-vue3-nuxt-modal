<template>
    <layout-modal-base
        v-model="isActive"
        :key="`${showButtons}`"
        :header="modalHeaderText"
        type="info"
        @close="hide"
    >
        <layout-modal-content :key="`${isActive}`">
            <p
                :class="{
                    'vue-modal__main-left': contentPositionLeft,
                }"
            >
                {{ contentText }}
            </p>
            <base-chips v-if="chipsValue > 0" :value="chipsValue"></base-chips>
            <template v-if="iconName" v-slot:img
                ><v-icon size="45">{{ iconName }}</v-icon></template
            >
            <template v-slot:header
                ><span :style="{ color: headerTextColor }">{{
                    headerText
                }}</span></template
            >
        </layout-modal-content>

        <template v-if="showButtons" v-slot:buttons>
            <base-button
                v-for="(button, i) in buttonsArr"
                :key="`${button.text}_${i}`"
                :text="button.text"
                :color="button.color"
                :icon="button.icon"
                @click="button.onClick"
            ></base-button>
        </template>
        <template v-if="closeTimerNow !== -1" v-slot:headerTool>
            <base-timer
                :key="closeTimerNow"
                :time="closeTimerNow"
                @done="hide"
            ></base-timer>
        </template>
    </layout-modal-base>
</template>

<script lang="ts" setup>
import LayoutModalBase from "@/components/modal/layouts/LayoutModalBase.vue";
import LayoutModalContent from "@/components/modal/layouts/LayoutModalContent.vue";
import BaseButton from "@/components/modal/BaseButton.vue";
import BaseTimer from "@/components/modal/BaseTimer.vue";
import BaseChips from "@/components/modal/BaseChips.vue";

import { modalDataObject } from "@/components/modal/useModal";
import { IModalButtonSingle } from "./useModal.types";

let isActive = ref(false);

let modalHeaderText = ref(""),
    headerText = ref(""),
    headerTextColor = ref(""),
    iconName = ref(""),
    buttonsArr = reactive([] as Array<IModalButtonSingle>),
    contentText = ref(""),
    contentPositionLeft = ref(false),
    closeTimerNow = ref(-1),
    chipsValue = ref(0);

modalDataObject.show = () => {
    isActive.value = true;
};

const hide = (modalDataObject.hide = () => {
    isActive.value = false;
});

const showButtons = computed(() => !(buttonsArr.length === 0));

modalDataObject.awaitClose = (): Promise<Boolean> =>
    new Promise((resolve) =>
        watch(isActive, (e) => {
            if (!e) setTimeout(() => resolve(e), 500);
        })
    );

modalDataObject.open = ({
    modalHeader,
    header,
    headerColor,
    icon,
    buttons,
    content,
    closeTimer,
    chips,
    contentToLeft,
}) => {
    modalHeaderText.value = modalHeader ? modalHeader : "";
    headerText.value = header ? header : "";
    headerTextColor.value = headerColor ? headerColor : "inherit";
    iconName.value = icon ? icon : "";
    contentText.value = content ? content : "";
    contentPositionLeft.value = contentToLeft ? true : false;
    closeTimerNow.value = closeTimer ? closeTimer : -1;
    chipsValue.value = chips ? chips : 0;

    buttonsArr.splice(0, buttonsArr.length);
    if (buttons && buttons.length > 0) {
        buttonsArr.push(...buttons.slice());

        buttonsArr.forEach((e) => {
            const onClickUser = e.onClick;

            e.onClick = onClickUser
                ? e.noClose
                    ? () => onClickUser()
                    : () => {
                          onClickUser();
                          hide();
                      }
                : () => hide();
        });
    }
};
modalDataObject.frontConnected = true;
modalDataObject.activate();
</script>

<style lang="scss" scoped>
.vue-modal,
.v-dialog > .v-overlay__content > .v-card {
    border-radius: 20px;
    border: 1px solid #072155;
}

.vue-modal {
    &__container-buttons-bottom {
        background-color: #021031;
    }
    &__container-main {
        background-color: #010b25;
    }
    &__button {
        border-radius: 14px;
        box-shadow: inset 0px 0px 30px #02cf15;
        background-color: #00730b;
        color: #f8fff9;
        font-weight: bold;
    }

    &__main-left {
        text-align: left;
        white-space: break-spaces;
    }
}

.vue-modal__header {
    color: #5aa2eb;
    text-align: center;
}
</style>
