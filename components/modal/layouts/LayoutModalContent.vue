<template>
    <v-container>
        <v-row no-gutters class="modal-content">
            <v-col v-if="hasSlotImg" cols="12" class="modal-content__img">
                <slot name="img"></slot>
            </v-col>
            <v-col v-if="hasSlotheader" cols="12" class="modal-content__header">
                <slot name="header"></slot>
            </v-col>
            <v-col cols="12">
                <slot></slot>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
const slots = useSlots();

const hasSlotImg = computed(() => !!slots["img"]);
const hasSlotheader = computed(() => !!slots["header"]);
</script>

<style scoped lang="scss">
.modal-content {
    text-align: center;
    &__img {
        margin-bottom: 20px;
    }
    &__header {
        font-size: larger;
        margin-bottom: 20px;
    }
}
</style>
