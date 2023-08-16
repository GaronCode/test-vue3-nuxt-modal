<template>
    <div class="chips-count">
        <v-icon size="30">mdi-poker-chip</v-icon>
        {{ localeValue.toLocaleString() }}
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    value: number;
}>();

const localeValue = computed(() => props.value);
</script>
<style lang="scss">
.chips-count {
    background-color: #02276e;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
}
</style>
