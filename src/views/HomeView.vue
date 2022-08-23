<template>
  <base-layout>
    <app-header></app-header>
    <title-and-description>
      <template #title>Świetnie Ci idzie!</template>
      <template #text
        >Utrzymuj takie tempo, a Twoje nawodnienie będzie na idealnym
        poziomie.</template
      >
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
    class="fixed h-screen w-screen top-full transition-all"
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
/* Computed */
const drinkProgressPercentage = computed(() => {
  return useCalcPercentages(water.value.total, water.value.goal);
});
/* Methods */
const addDrink = (drinkItem) => {
  water.value.total += drinkItem.capacity;
  useDrink().addDrink(drinkItem, "water");
};
const removeDrink = (drinkToRemove) => {
  water.value.total -= drinkToRemove.capacity;
  useDrink().removeDrink(drinkToRemove, "water");
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
  useWavePosition().updateTransformStyleBy("water");
});
</script>

