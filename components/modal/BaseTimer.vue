<template>
    <div class="modal-timer">
        <span class="modal-timer__time">{{ timeOutput }}</span>

        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <circle
                ref="circle"
                class="modal-timer__rotation"
                r="20"
                cy="25"
                cx="25"
                stroke-width="5"
                stroke="#02325b"
                fill="none"
            />
        </svg>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    time: number;
}>();

const timeNow = ref(props.time);
const timeOutput = computed(() => (timeNow.value > 99 ? 99 : timeNow.value));
const circle = ref(null);

const emit = defineEmits(["done"]);

let timerId: NodeJS.Timer;

onMounted(() => {
    if (circle.value === null) return;
    const maxTime = props.time;
    let i = 0;
    const finalOffset = 440,
        minOffset = 310;
    let step = (finalOffset - minOffset) / timeNow.value;

    circle.value.style.strokeDashoffset = minOffset;

    timerId = setInterval(() => {
        timeNow.value = maxTime - i;
        if (i++ == props.time) {
            clearInterval(timerId);
            emit("done");
        } else {
            circle.value.style.strokeDashoffset = minOffset + step * i;
        }
    }, 1000);
});

onBeforeUnmount(() => clearInterval(timerId));
</script>
<style lang="scss">
.modal-timer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &__time {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__rotation {
        stroke-dasharray: 440; /* this value is the pixel circumference of the circle */
        stroke-dashoffset: 0;
        transition: all 1s linear;
    }
}
</style>
