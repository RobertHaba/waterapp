<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-28">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <header class="flex justify-between">
        <dynamic-heading class="w-fit text-3xl"></dynamic-heading>
        <div>
          <user-avatar></user-avatar>
        </div>
      </header>
      <div>
        <title-and-description>
          <template #title>Świetnie Ci idzie!</template>
          <template #text
            >Utrzymuj takie tempo, a Twoje nawodnienie będzie na idealnym
            poziomie.</template
          >
        </title-and-description>
      </div>
      <div class="w-full flex justify-center">
        <div class="relative">
          <div class="relative">
            <div class="absolute top-2 w-full flex justify-between px-12">
              <full-glass-icon
                class="w-6 h-6 fill-blue opacity-20"
              ></full-glass-icon>
              <empty-glass-icon
                class="icon w-6 h-6 fill-blue opacity-20"
              ></empty-glass-icon>
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
              <moon-icon class="icon w-4 h-4 fill-blue opacity-20"></moon-icon>
              <sun-icon class="icon w-4 h-4 fill-blue opacity-20"></sun-icon>
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
            class="
              absolute
              top-1/2
              -translate-y-1/2
              left-1/2
              -translate-x-1/2
              flex flex-col
              justify-center
              items-center
              bg-blue/5
              shadow-inset-light
              w-28
              h-28
              rounded-full
            "
          >
            <span class="text-2xl font-bold pt-2">{{ drink.total }}ml</span>
            <span class="text-sm">{{ drink.goal }}ml</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <dynamic-heading :level="3" class="text-xl"
          >Uzupełnij płyny</dynamic-heading
        >
        <div class="flex flex-col gap-6">
          <div class="flex justify-between">
            <div
              class="
                shadow-inset-light
                bg-blue-500
                w-fit
                flex
                rounded-full
                pr-2
              "
            >
              <base-button
                class-colors="pr-2 rounded-none"
                @click="addDrink(drinkList.dynamic)"
                ><empty-glass-icon class="w-6 h-6 fill-dark"></empty-glass-icon
                ><span class="text-2xl font-normal"
                  >{{ drinkList.dynamic.capacity }}ml</span
                ></base-button
              >

              <button
                class="p-4"
                aria-label="Przycisk do zmiany parametrów napoju"
                @click="openPopup(drinkList.dynamic)"
              >
                <edit-icon class="w-4 h-4 fill-dark"></edit-icon>
              </button>
            </div>
            <base-button @click="openPopup()"
              ><add-icon class="fill-light w-6 h-6"></add-icon
            ></base-button>
          </div>
          <ul class="flex justify-between">
            <li v-for="drink in drinkList.statics" :key="drink">
              <SmallButton @click="addDrink(drink)"
                ><empty-glass-icon class="w-4 h-4 fill-dark"></empty-glass-icon
                ><span class="font-normal"
                  >{{ drink.capacity }}ml</span
                ></SmallButton
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <dynamic-heading :level="3" class="text-xl"
          >Ostatnie napoje</dynamic-heading
        >
        <TransitionGroup
          class="flex flex-col gap-3 h-32 overflow-y-auto drink-history-list"
          name="slide"
          tag="ul"
          appear=""
          v-if="drink.history.length"
        >
          <li
            class="flex px-4 items-center justify-between"
            v-for="drink in drink.history"
            :key="drink.date"
          >
            <div class="flex gap-4 items-center">
              <full-glass-icon class="fill-dark w-6 h-6"></full-glass-icon>
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
                <close-icon class="w-4 h-4 fill-dark"></close-icon>
              </button>
            </div>
          </li>
        </TransitionGroup>
        <p v-else>
          Jest tu całkowicie sucho... zacznij uzupełniać płyny, aby to zmienić
        </p>
      </div>
    </div>
    <main-navbar></main-navbar>
    <edit-drink-popup
      v-if="popupData.isOpen"
      :drink="popupData.drink"
      @close-popup="closePopup"
      @save-data="changeDynamicDrink"
      >{{ popupDrinkText }}</edit-drink-popup
    >
  </main>
  <wave-icon
    class="fixed h-screen w-screen top-full transition-all"
    :style="wave.transfromStyle"
  ></wave-icon>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import MoonIcon from "../components/icons/MoonIcon.vue";
import SunIcon from "../components/icons/SunIcon.vue";
import FullGlassIcon from "../components/icons/FullGlassIcon.vue";
import EmptyGlassIcon from "../components/icons/EmptyGlassIcon.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import AddIcon from "../components/icons/AddIcon.vue";
import CloseIcon from "../components/icons/CloseIcon.vue";
import SmallButton from "../components/buttons/SmallButton.vue";
import MainNavbar from "../components/TheNavbar.vue";
import UserAvatar from "../components/TheAvatar.vue";
import EditDrinkPopup from "../components/popups/EditDrinkPopup.vue";
import { useProfile } from "../stores/profile";
import { useSettings } from "../stores/settings";
import { useDrink } from "../stores/drink";
import { useWavePosition } from "@/stores/wavePosition";
import localforage from "localforage";
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
  title: "Edytuj napój",
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
  const time = date.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
};
const openPopup = (drinkItem = null) => {
  if (drinkItem !== null) {
    popupData.value.drink = { ...drinkItem };
  } else {
    popupData.value.drink = {
      capacity: 10,
      name: "woda",
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
    useSettings().updateSettingsData("drink", useSettings().settings.drink);
    popupData.value.drink = null;
  }
  closePopup();
};
const closePopup = () => {
  popupData.value.isOpen = false;
  popupData.value.autoAdd = false;
};
const popupDrinkText = computed(() => {
  return popupData.value.autoAdd ? "Dodaj napój" : "Edytuj napój";
});

const date = ref(new Date());
const day = ref({
  hour: date.value.getHours(),
  minutes: date.value.getMinutes(),
});
const dayProgressPercentage = computed(() => {
  return (((day.value.hour * 60 + day.value.minutes) * 100) / 1440).toFixed();
});
watch(date, () => {
  day.value.minutes = date.value.getMinutes();
  day.value.hour = date.value.getHours();
});

let intervalDrinkFromNotifications, intervalDayProgress;
onMounted(() => {
  intervalDayProgress = setInterval(() => {
    date.value = new Date();
  }, 60000);
  // Get data from localforage (indexeddb) when user CTA in Notification
  intervalDrinkFromNotifications = setInterval(() => {
    localforage.keys().then((keys) => {
      keys.forEach(async (key) => {
        const drinkItem = await localforage.getItem(key, (err, val) => {
          return val;
        });
        addDrink(drinkItem);
        localforage.removeItem(key);
      });
    });
  }, 2000);
});
onUnmounted(() => {
  clearInterval(intervalDayProgress);
  clearInterval(intervalDrinkFromNotifications);
});

const translateY = computed(() => {
  return `transform: translateY(-${drinkProgressPercentage.value}%)`;
});
wave.updateTransformStyle(translateY.value);

watch(drinkProgressPercentage, () => {
  wave.updateTransformStyle(translateY.value);
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
  stroke-dasharray: 470px;
  stroke-dashoffset: 470px;
}

circle:nth-child(1) {
  stroke-dashoffset: calc(626px - (626px * 0.75));
  stroke: theme("colors.blue");
  opacity: 10%;
}

circle:nth-child(2) {
  stroke-dashoffset: calc(
    626px - (626px * v-bind(drinkProgressPercentage) * 0.75) / 100
  );
  stroke: theme("colors.blue");
}
.circle-box--medium circle:nth-child(1) {
  stroke-dashoffset: calc(470px - (470px * 0.75));
  stroke: theme("colors.blue");
  opacity: 10%;
}

.circle-box--medium circle:nth-child(2) {
  stroke-dashoffset: calc(
    470px - (470px * v-bind(dayProgressPercentage) * 0.75) / 100
  );
  stroke: theme("colors.blue-500");
}

.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
</style>
