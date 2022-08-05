<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-28">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <header class="flex justify-between">
        <DynamicHeading class="w-fit"></DynamicHeading>
        <div>
          <Avatar></Avatar>
        </div>
      </header>
      <div>
        <TitleWithInfo>
          <template #title>Świetnie Ci idzie!</template>
          <template #text
            >Utrzymuj takie tempo, a Twoje nawodnienie będzie na idealnym
            poziomie.</template
          >
        </TitleWithInfo>
      </div>
      <div class="w-full flex justify-center">
        <div class="relative">
          <div class="relative">
            <div class="absolute top-2 w-full flex justify-between px-12">
              <FullGlassIcon
                class="w-6 h-6 fill-blue opacity-20"
              ></FullGlassIcon>
              <EmptyGlassIcon
                class="icon w-6 h-6 fill-blue opacity-20"
              ></EmptyGlassIcon>
            </div>
            <svg class="circle-box -rotate-45">
              <circle cx="100" cy="100" r="100"></circle>
              <circle
                cx="100"
                cy="100"
                r="100"
                filter="url(#filter0_i_79_1533)"
              ></circle>
              <defs>
                <filter
                  id="filter0_i_79_1533"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.164306 0 0 0 0 0.1859 0 0 0 0 0.704167 0 0 0 0.3 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_79_1533"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div
            class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <div class="absolute top-2 w-full flex justify-between px-9">
              <MoonIcon class="icon w-4 h-4 fill-blue opacity-20"></MoonIcon>
              <SunIcon class="icon w-4 h-4 fill-blue opacity-20"></SunIcon>
            </div>
            <svg class="circle-box circle-box--medium -rotate-45">
              <circle cx="75" cy="75" r="75"></circle>
              <circle
                cx="75"
                cy="75"
                r="75"
                filter="url(#filter0_i_79_1533)"
              ></circle>
              <defs>
                <filter
                  id="filter0_i_79_1533"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.164306 0 0 0 0 0.1859 0 0 0 0 0.704167 0 0 0 0.3 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_79_1533"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div
            class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center bg-light shadow-inset-light w-28 h-28 rounded-full"
          >
            <span class="text-2xl font-bold pt-2">{{ drink.total }}ml</span>
            <span class="text-sm">{{ drink.goal }}ml</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <DynamicHeading :level="3" class="text-xl"
          >Uzupełnij płyny</DynamicHeading
        >
        <div class="flex flex-col gap-6">
          <div class="flex justify-between">
            <div
              class="shadow-inset-light bg-blue-500 w-fit flex rounded-full pr-2"
            >
              <DefaultButton
                class-colors="pr-2 rounded-none"
                @click="addDrink(drinkList.dynamic)"
                ><EmptyGlassIcon class="w-6 h-6 fill-dark"></EmptyGlassIcon
                ><span class="text-2xl font-normal"
                  >{{ drinkList.dynamic.capacity }}ml</span
                ></DefaultButton
              >

              <button
                class="p-4"
                aria-label="Przycisk do zmiany parametrów napoju"
                @click="openPopup(drinkList.dynamic)"
              >
                <EditIcon class="w-4 h-4 fill-dark"></EditIcon>
              </button>
            </div>
            <DefaultButton @click="openPopup()"
              ><AddIcon class="fill-light w-6 h-6"></AddIcon
            ></DefaultButton>
          </div>
          <ul class="flex justify-between">
            <li v-for="drink in drinkList.statics" :key="drink">
              <SlimButton @click="addDrink(drink)"
                ><EmptyGlassIcon class="w-4 h-4 fill-dark"></EmptyGlassIcon
                ><span class="font-normal"
                  >{{ drink.capacity }}ml</span
                ></SlimButton
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <DynamicHeading :level="3" class="text-xl"
          >Ostatnie napoje</DynamicHeading
        >
        <ul
          class="flex flex-col gap-3 h-32 overflow-y-auto"
          v-if="drink.history.length"
        >
          <li
            class="flex px-4 items-center justify-between"
            v-for="drink in drink.history"
            :key="drink.time"
          >
            <div class="flex gap-4 items-center">
              <FullGlassIcon class="fill-dark w-6 h-6"></FullGlassIcon>
              <div class="flex flex gap-2 items-center">
                <span class="font-bold text-lg leading-5"
                  >{{ drink.capacity }}ml</span
                >
                <p class="">{{ drink.name }}</p>
              </div>
            </div>
            <div class="flex gap-1 items-center">
              <time :datetime="getDateFromDrink(drink.date)">{{
                getDateFromDrink(drink.date)
              }}</time>
              <button
                class="p-3"
                :aria-label="`Naciśnij, aby usunąć napój ${drink.name} o pojemności ${drink.capacity}`"
                @click="removeDrink(drink)"
              >
                <CloseIcon class="w-4 h-4 fill-dark"></CloseIcon>
              </button>
            </div>
          </li>
        </ul>
        <p v-else>
          Jest tu całkowicie sucho... zacznij uzupełniać płyny, aby to zmienić
        </p>
      </div>
    </div>
    <Navbar></Navbar>
    <EditDrinkPopup
      v-if="popupData.isOpen"
      :drink="popupData.drink"
      @close-popup="closePopup"
      @save-data="changeDynamicDrink"
      >{{ popupDrinkText }}</EditDrinkPopup
    >
  </main>
  <MobileWaveSVG
    class="fixed h-screen w-screen top-full transition-all"
    :style="wave.transfromStyle"
  ></MobileWaveSVG>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import MoonIcon from '../components/icons/Moon.vue';
import SunIcon from '../components/icons/Sun.vue';
import FullGlassIcon from '../components/icons/FullGlass.vue';
import EmptyGlassIcon from '../components/icons/EmptyGlass.vue';
import EditIcon from '../components/icons/Edit.vue';
import AddIcon from '../components/icons/Add.vue';
import CloseIcon from '../components/icons/Close.vue';
import SlimButton from '../components/buttons/SlimButton.vue';
import Navbar from '../components/TheNavbar.vue';
import Avatar from '../components/TheAvatar.vue';
import EditDrinkPopup from '../components/popups/EditDrinkPopup.vue';
import { useProfile } from '../stores/profile';
import { useSettings } from '../stores/settings';
import { useDrink } from '../stores/drink';
import { useWavePosition } from '@/stores/wavePosition';
const wave = useWavePosition();
const drinkSettingsState = useSettings().settings.drink;
const drinkList = drinkSettingsState.list;
const drink = ref({
  total: useDrink().drink.total,
  goal: useSettings().settings.drink.goal,
  history: useDrink().history.today,
});
const popupData = ref({
  isOpen: false,
  drink: null,
  autoAdd: false,
  title: 'Edytuj napój',
});
const drinkProgressPercentage = computed(() => {
  const drinkPercentage = (
    (drink.value.total * 100) /
    drink.value.goal
  ).toFixed();
  return drinkPercentage >= 100 ? 100 : drinkPercentage;
});

const addDrink = (drinkItem) => {
  drink.value.total += drinkItem.capacity;
  useDrink().addDrink(drinkItem);
};
const removeDrink = (drinkToRemove) => {
  drink.value.total -= drinkToRemove.capacity;
  useDrink().removeDrink(drinkToRemove);
};
const getDateFromDrink = (drinkDate) => {
  const date = new Date(drinkDate);
  const time = date.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return time;
};
const openPopup = (drinkItem = null) => {
  if (drinkItem !== null) {
    popupData.value.drink = { ...drinkItem };
  } else {
    popupData.value.drink = {
      capacity: 10,
      name: 'woda',
    };
    popupData.value.autoAdd = true;
  }
  popupData.value.isOpen = true;
};
const changeDynamicDrink = () => {
  if (popupData.value.autoAdd) {
    addDrink(popupData.value.drink);
  } else {
    useSettings().settings.drink.list.dynamic = popupData.value.drink;
    useSettings().updateSettingsData('drink', useSettings().settings.drink);
    popupData.value.drink = null;
  }
  closePopup();
};
const closePopup = () => {
  popupData.value.isOpen = false;
  popupData.value.autoAdd = false;
};
const popupDrinkText = computed(() => {
  return popupData.value.autoAdd ? 'Dodaj napój' : 'Edytuj napój';
});
const translateY = computed(() => {
  return `transform: translateY(-${drinkProgressPercentage.value}%)`;
});
const date = ref(new Date());
setInterval(() => {
  date.value = new Date();
}, 60000);
const day = ref({
  hour: date.value.getHours(),
  minutes: date.value.getMinutes(),
});
const dayProgressPercentage = computed(() => {
  return (((day.value.hour * 60 + day.value.minutes) * 100) / 1440).toFixed();
});
wave.updateTransformStyle(translateY.value);

watch(drinkProgressPercentage, () => {
  wave.updateTransformStyle(translateY.value);
});
watch(date, () => {
  day.value.minutes = date.value.getMinutes();
  day.value.hour = date.value.getHours();
});
</script>

<style scoped>
.circle-box {
  width: 220px;
  height: 220px;
}
.circle-box--medium {
  width: 160px;
  height: 160px;
}
.circle-box circle {
  width: 210px;
  height: 210px;
  fill: none;
  stroke-width: 20;
  transform: translate(10px, 10px);
  stroke-linecap: round;
  stroke-dasharray: 626;
  stroke-dashoffset: 626;
  stroke: black;
  transition: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}

.circle-box--medium circle {
  width: 150px;
  height: 150px;
  stroke-width: 10;
  transform: translate(5px, 5px);
  stroke-dasharray: 470;
  stroke-dashoffset: 470;
}

circle:nth-child(1) {
  stroke-dashoffset: calc(626 - (626 * 0.75));
  stroke: theme('colors.blue');
  opacity: 10%;
}

circle:nth-child(2) {
  stroke-dashoffset: calc(
    626 - (626 * v-bind(drinkProgressPercentage) * 0.75) / 100
  );
  stroke: theme('colors.blue');
}
.circle-box--medium circle:nth-child(1) {
  stroke-dashoffset: calc(470 - (470 * 0.75));
  stroke: theme('colors.blue');
  opacity: 10%;
}

.circle-box--medium circle:nth-child(2) {
  stroke-dashoffset: calc(
    470 - (470 * v-bind(dayProgressPercentage) * 0.75) / 100
  );
  stroke: theme('colors.blue-500');
}
</style>
