<template>
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
      <div class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
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
        <span class="text-2xl font-bold pt-2">{{ props.drink.total }}ml</span>
        <span class="text-sm">{{ props.drink.goal }}ml</span>
      </div>
    </div>
  </div>
</template>

<script setup>
/* Icons */
import MoonIcon from "@/components/icons/MoonIcon.vue";
import SunIcon from "@/components/icons/SunIcon.vue";
import FullGlassIcon from "@/components/icons/FullGlassIcon.vue";
import EmptyGlassIcon from "@/components/icons/EmptyGlassIcon.vue";
import { computed, ref, watch } from "vue";
import { useCalcPercentages } from "@/composables/useCalcPercentages";
/* Props */
const props = defineProps({
  drink: Object,
});
/* Refs */

const date = ref(new Date());
const day = ref({
  hour: date.value.getHours(),
  minutes: date.value.getMinutes(),
});

/* Computed */

const drinkProgressPercentage = computed(() => {
  return useCalcPercentages(props.drink.total, props.drink.goal);
});
const dayProgressPercentage = computed(() => {
  return (((day.value.hour * 60 + day.value.minutes) * 100) / 1440).toFixed();
});
/* watch */
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
</style>