<template>
  <base-layout>
    <app-header></app-header>
    <title-and-description>
      <template #title>{{ progressText.title }}</template>
      <template #text>{{ progressText.text }}</template>
    </title-and-description>
    <app-progress-bar :drink="water"> </app-progress-bar>
    <app-drinks-refill @add-drink="addDrink" :mode="'water'"
      >Uzupełnij wodę!</app-drinks-refill
    >
    <app-drinks-today :drinkHistory="water.history" @remove-drink="removeDrink"
      >Dzisiejsze spożycie wody</app-drinks-today
    >
    <app-yesterday-goal></app-yesterday-goal>
    <main-navbar></main-navbar>
  </base-layout>
  <wave-icon
    class="fixed h-screen w-screen top-full transition-all fill-blue-100"
    :style="wave.transfromStyle"
  ></wave-icon>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import localforage from "localforage";
/* Stores */
import { useSettings } from "@/stores/settings";
import { useDrink } from "@/stores/drink";
import { useWavePosition } from "@/stores/wavePosition";
import { useProgressText } from "@/stores/progressText";
/* Components */
import AppHeader from "@/components/app/AppHeader.vue";
import AppProgressBar from "@/components/app/AppProgressBar.vue";
import AppDrinksRefill from "@/components/app/AppDrinksRefill.vue";
import AppDrinksToday from "@/components/app/AppDrinksToday.vue";
import AppYesterdayGoal from "@/components/app/AppYesterdayGoal.vue";
import MainNavbar from "@/components/TheNavbar.vue";
/* Composables */
import { useCalcPercentages } from "@/composables/useCalcPercentages";
/* Refs */
const date = ref(new Date());
const water = ref({
  total: useDrink().water.total,
  goal: useSettings().settings.water.goal,
  history: useDrink().waterHistory.today,
});
const progressText = computed(() => {
  return useProgressText().activeData.water;
});

/* Computed */
const drinkProgressPercentage = computed(() => {
  return useCalcPercentages(water.value.total, water.value.goal);
});
/* Methods */
const addDrink = (drinkItem) => {
  water.value.total += drinkItem.capacity;
  useDrink().addDrink(drinkItem, "water");
  tryToSetNewProgressText();
};
const removeDrink = (drinkToRemove) => {
  water.value.total -= drinkToRemove.capacity;
  useDrink().removeDrink(drinkToRemove, "water");
  tryToSetNewProgressText();
};
const tryToSetNewProgressText = () => {
  let id = 0;
  let percentage = drinkProgressPercentage.value;
  switch (true) {
    case percentage == 0:
      useProgressText().setActiveData("water", 0);
      break;
    case percentage > 0 && percentage < 20:
      useProgressText().setActiveData("water", 1);
      break;
    case percentage >= 20 && percentage < 40:
      useProgressText().setActiveData("water", 2);
      break;
    case percentage >= 40 && percentage < 50:
      useProgressText().setActiveData("water", 3);
      break;
    case percentage >= 50 && percentage < 70:
      useProgressText().setActiveData("water", 4);
      break;
    case percentage >= 70 && percentage < 90:
      useProgressText().setActiveData("water", 5);
      break;
    case percentage >= 90 && percentage < 100:
      useProgressText().setActiveData("water", 6);
      break;
    case percentage === 100:
      useProgressText().setActiveData("water", 7);
      break;
  }

  // if (drinkProgressPercentage.value >= 50) {
  //   useProgressText().setActiveData("water", 1);
  // }
};
/* Notifications */

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
/*WAVE */
const wave = useWavePosition();
watch(drinkProgressPercentage, () => {
  useWavePosition().updateTransformStyleBy("water");
});
onMounted(() => {
  tryToSetNewProgressText();
  useWavePosition().updateTransformStyleBy("water");
});
</script>

