<template>
  <base-layout>
    <app-header>DrinkApp</app-header>
    <title-and-description>
      <template #title>Świetnie Ci idzie!</template>
      <template #text
        >Utrzymuj takie tempo, a Twoje nawodnienie będzie na idealnym
        poziomie.</template
      >
    </title-and-description>
    <app-progress-bar :drink="drink"> </app-progress-bar>
    <app-drinks-refill @add-drink="addDrink" :mode="'drink'"
      >Wprowadź napój!</app-drinks-refill
    >
    <app-drinks-today
      :drinkHistory="drink.history"
      @remove-drink="removeDrink"
      :mode="'drink'"
      >Dzisiejsze napoje</app-drinks-today
    >
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
import MainNavbar from "@/components/TheNavbar.vue";
/* Composables */
import { useCalcPercentages } from "@/composables/useCalcPercentages";
/* Refs */
const drink = ref({
  total: useDrink().drink.total,
  goal: useSettings().settings.drink.goal,
  history: useDrink().drinkHistory.today,
});
/* Computed */
const drinkProgressPercentage = computed(() => {
  return useCalcPercentages(drink.value.total, drink.value.goal);
});
/* Methods */
const addDrink = (drinkItem) => {
  drink.value.total += drinkItem.capacity;
  useDrink().addDrink(drinkItem, "drink");
};
const removeDrink = (drinkToRemove) => {
  drink.value.total -= drinkToRemove.capacity;
  useDrink().removeDrink(drinkToRemove, "drink");
};

/*WAVE */
const wave = useWavePosition();
const translateY = computed(() => {
  return `transform: translateY(-${drinkProgressPercentage.value}%)`;
});
wave.updateTransformStyle(translateY.value);

watch(drinkProgressPercentage, () => {
  wave.updateTransformStyle(translateY.value);
});
</script>
