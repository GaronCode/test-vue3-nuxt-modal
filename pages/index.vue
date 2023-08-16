<template>
	<v-container class="bg-surface-variant">
		<v-row justify="center">
			<v-col>
				<v-sheet class="buttons">
					<v-btn @click="modal01.show()">modal01</v-btn>
					<v-btn @click="modal02.show()">modal02</v-btn>
					<v-btn @click="modal03.show()">modal03</v-btn>
					<v-btn @click="modal04.show()">modal04</v-btn>
					<v-btn @click="modal05.show()">modal05</v-btn>
					<v-btn @click="modal06.show()">modal06</v-btn>
					<v-btn @click="modal07.show()">modal07</v-btn>
					<v-btn @click="modal08.show()">modal08</v-btn>
					<v-btn @click="modal09.show()">modal09</v-btn>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>

	<app-modal></app-modal>
	<app-rating :place="place" :rating="rating"></app-rating>
</template>

<script lang="ts" setup>
import AppModal from "@/components/modal/AppModal.vue";
import AppRating from "@/components/rating/AppRating.vue";
import { useModal } from "@/components/modal/useModal";

const place = reactive({ from: 100, to: 154 });
const rating = reactive({ from: 1456, to: 1680 });

// -----------------modals--------------------
const modal01 = useModal({
	modalHeader: "Название окна",
	closeTimer: 25,
	content:
		"rrem aperiam, eaque ipe ab illo inventore veritatis et q. Ut sa qe ab illo inventore veritatis et q. Ut uae ab illo inventore veritatis et q. Ut eni",
});

modal01.show();

const modal02 = useModal({
	modalHeader: "Название окна",
	icon: "mdi-flag-varian",
	header: "Заголовок",
	content:
		"riam, eaque ipe ab illo inventore veritatis et q. Ut sa qe ab illo inventore veritatis et q. Ut uae ab illo inventore veritati",
	buttons: [
		{ text: "No", color: "Red" },
		{ text: "Yes", color: "Green", onClick: () => alert("clicked") },
		{
			text: "Yes + No close",
			color: "Blue",
			onClick: () => alert("clicked"),
			noClose: true,
		},
	],
	colorType: "danger",
});

const modal03 = useModal({
	modalHeader: "Благодарим за покупку",
	icon: "mdi-basket-check-outline",
	header: "Покупка обрабатывается",
	content:
		"Оплата прошла успешно. Фишки будут начислены на ваш счёт в ближайшее время. Удачной игры!",
	buttons: [{ text: "Хорошо!", color: "Green" }],
	colorType: "succsess",
	closeTimer: 25,
});

const modal04 = useModal({
	modalHeader: "Внимание",
	content: "Недостаточно фишек для ставки",
});

const modal05 = useModal({
	modalHeader: "Ошибка входа",
	header: "Повторный вход",
	content: "Вы вошли в игру на другом устройстве или в другом окне",
	icon: "mdi-alert-octagon-outline",
	buttons: [
		{
			text: "Перезагрузить",
			color: "Green",
			onClick: () => location.reload(),
		},
	],
});

const modal06 = useModal({
	modalHeader: "Компенсация",
	header: "Доброго времени суток!",
	content: "Вы вошли в игру на другом устройстве или в другом окне",
	icon: "mdi-cash-multiple",
	chips: 9000000,
});

const modal07 = useModal({
	modalHeader: "Награда за просмотр",
	header: "Вы получили фишки",
	chips: 9000000,
	icon: "mdi-cash-multiple",
});

let email = "";
const modal08 = useModal({
	modalHeader: "Почта для чека",
	content: "Введите email, на который мы вышлем вам электронный чек",
	input: {
		placeholder: "example@domen.com",
		onChange: (val: string) => (email = val),
	},
	buttons: [{ text: "Далее", onClick: () => alert(email) }],
});

const modal09 = useModal({
	modalHeader: "Бессрочная блокировка",
	icon: "mdi-block-helper",
	header: "Ваш аккаунт заблокирован навсегда!",
	headerColor: "red",
	content: `ВАРИАНТ ПЕРВЫЙ. Необходимо обратиться в поддержку непосредственно из приложения в Тик Ток на мобильном телефоне, независимо залогинились Вы или нет, выполните следующие действия как на картинке:

     1. Нажимаем на кнопку регистрация.
     2. Нажимаем на знак вопроса в кружочке.
     3. Выбираем пункт "Аккаунт заблокирован"
`,
	contentToLeft: true,
	buttons: [
		{
			text: "Написать в техподдержку",
			onClick: () => alert(email),
			icon: "mdi-face-agent",
		},
	],
});
</script>

<style>
body {
	min-height: 100vh;
	background-color: #424242;
}

.buttons {
	gap: 20px;
	display: flex;
	flex-wrap: wrap;
	padding: 20px;
}
</style>
