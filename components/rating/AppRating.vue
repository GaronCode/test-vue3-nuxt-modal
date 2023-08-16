<template>
	<div class="vue-spinner" ref="mainContainer">
		<div class="vue-spinner__place">
			<ul class="vue-spinner__place-list" ref="itemsList">
				<li v-for="i in arr" class="vue-spinner__place-list-item">
					{{ i }}
				</li>
			</ul>
		</div>
		<div class="vue-spinner__rating">
			<span>Заголовок</span>
			<div class="vue-spinner__rating-numbers">
				<v-icon size="18">mdi-crown</v-icon>
				<span ref="ratingEl">{{ rating.from }}</span>
			</div>
		</div>
		<!-- Ваш рейтинг -->
	</div>
</template>
<script lang="ts" setup>
import gsap from "gsap";

interface IFromTo {
	from: number;
	to: number;
}

onBeforeUpdate(() => console.log("updated"));

const props = defineProps({
	place: {
		type: Object as PropType<IFromTo>,
		required: true,
	},
	rating: {
		type: Object as PropType<IFromTo>,
		required: true,
	},
});
const arr = reactive([] as number[]);

const itemsList = ref(null),
	mainContainer = ref(null),
	ratingEl = ref(null);

onMounted(() => {
	updateComponent();
});

const updateComponent = () => {
	if (
		itemsList.value === null ||
		mainContainer.value === null ||
		ratingEl.value === null
	)
		return;

	animate();
};

const animate = () => {
	const additionalElements = 2,
		elementSize = 26;

	console.log("from to", props.place.from, props.place.to);

	const max = Math.max(props.place.from, props.place.to) + additionalElements;
	let min = Math.min(props.place.from, props.place.to) - additionalElements;

	if (min < 1) min = 1;

	for (let i = min; i < max; i++) arr.push(i);
	console.log(arr);

	const margin = elementSize * (max - min - 2);

	let fromMargin: number, toMargin: number;

	fromMargin = margin;
	toMargin = elementSize * additionalElements;

	if (props.place.from < props.place.to)
		[fromMargin, toMargin] = [toMargin, fromMargin];

	var tl = gsap.timeline();

	tl.to(mainContainer.value, { opacity: 1, duration: 1 });
	tl.fromTo(
		itemsList.value,
		{ y: -fromMargin, duration: 1 },
		{ y: -toMargin, duration: 3 }
	);
	tl.to(...animateNumbers());
	tl.to(mainContainer.value, { opacity: 0, duration: 1 }, "+=3");
};

const animateNumbers = () => {
	type Obj = {
		index: number;
	};

	let obj: Obj = { index: props.rating.from };

	let counterEl = ratingEl.value;

	const changeObj = (selector: Element, obj: Obj) => {
		const el: Element = selector;

		el.innerText = "" + parseInt(obj.index.toString(), 10);
	};
	return [
		obj,
		{
			index: props.rating.to,
			duration: 4,
			onUpdate: () => {
				changeObj(counterEl, obj);
			},
		},
		"<",
	];
};
</script>
<style lang="scss">
//$main-color: #010b88;
$main-color: green;
$additional-color: #000;
$rating-color: gold;
.vue-spinner {
	position: absolute;
	opacity: 0;
	bottom: 20px;
	left: 20px;
	width: 270px;
	height: 60px;
	background-color: $additional-color;
	border-radius: 5px;
	box-shadow: 0px 0px 20px 10px $main-color;
	color: $main-color;
	font-size: 14px;
	font-weight: bold;
	display: flex;
	overflow: hidden;
	border: 1px solid $main-color;

	&__place {
		width: 50px;
		border-right: 2px solid $main-color;
		position: relative;

		&-list {
			$item-size: 26px;

			list-style-type: none;
			padding-top: calc(50% - $item-size / 2 + 5px);
			box-sizing: border-box;
			overflow: hidden;

			&-item {
				$border: 1px solid $additional-color;
				box-sizing: border-box;
				height: $item-size;
				display: flex;
				justify-content: center;
				align-items: center;
				color: white;
				padding-right: 10px;
				background: linear-gradient(
					90deg,
					$main-color 0%,
					$additional-color 100%
				);
				border-top: $border;
				border-bottom: $border;
			}
		}

		&::after {
			$size: 10px;
			content: "";
			position: absolute; /* Абсолютное позиционирование */
			right: 0px;
			bottom: calc(50% - $size); /* Положение треугольника */
			border: $size solid transparent;
			border-right: $size solid $main-color;
		}
	}

	&__rating {
		padding: 5px;
		flex-grow: 1;

		&-numbers {
			font-size: 18px;
			color: $rating-color;

			span {
				margin-left: 6px;
			}
		}
	}
}
</style>
