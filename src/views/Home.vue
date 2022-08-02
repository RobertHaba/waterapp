<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-14">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <header class="flex justify-between">
        <DynamicHeading class="w-fit"></DynamicHeading>
        <div>
          <button type="button">
            <span
              class="icon bg-blue-500 w-10 h-10 rounded-full icon--avatar"
              :style="avatarURL"
            ></span>
          </button>
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
              <FullGlassIcon class="icon w-6 h-6"></FullGlassIcon>
              <EmptyGlassIcon class="icon w-6 h-6"></EmptyGlassIcon>
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
              <MoonIcon class="icon w-4 h-4"></MoonIcon>
              <SunIcon class="icon w-4 h-4"></SunIcon>
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
            <span class="text-2xl font-bold pt-2">{{ drink.now }}ml</span>
            <span class="text-sm">{{ drink.goal }}ml</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useAuth } from '@/stores/auth';
import { computed, ref, watch } from 'vue';
import MoonIcon from '../components/icons/Moon.vue';
import SunIcon from '../components/icons/Sun.vue';
import FullGlassIcon from '../components/icons/FullGlass.vue';
import EmptyGlassIcon from '../components/icons/EmptyGlass.vue';
const avatarURL = computed(() => {
  return useAuth().user.photoURL
    ? `background-image: url(${useAuth().user.photoURL})`
    : '';
});
const drink = {
  now: 1000,
  goal: 2800,
};
const date = ref(new Date());
const hour = ref(date.value.getHours());
const minutes = ref(date.value.getMinutes());
setInterval(() => {
  date.value = new Date();
  console.log(dayProgressPercentage.value);
}, 60000);
const drinkProgressPercentage = computed(() => {
  return ((drink.now * 100) / drink.goal).toFixed();
});
const dayProgressPercentage = computed(() => {
  return (((hour.value * 60 + minutes.value) * 100) / 1440).toFixed();
});
watch(date, () => {
  minutes.value = date.value.getMinutes();
  hour.value = date.value.getHours();
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
  stroke: theme('colors.blue-100');
}

circle:nth-child(2) {
  stroke-dashoffset: calc(
    631 - (626 * v-bind(drinkProgressPercentage) * 0.75) / 100
  );
  stroke: theme('colors.blue');
}
.circle-box--medium circle:nth-child(1) {
  stroke-dashoffset: calc(470 - (470 * 0.75));
  stroke: theme('colors.blue-100');
}

.circle-box--medium circle:nth-child(2) {
  stroke-dashoffset: calc(
    470 - (470 * v-bind(dayProgressPercentage) * 0.75) / 100
  );
  stroke: theme('colors.blue-500');
}
</style>
