<template>
  <div class="flex flex-col gap-6">
    <dynamic-heading :level="3" class="text-xl"><slot></slot></dynamic-heading>
    <TransitionGroup
      class="flex flex-col gap-3 max-h-32 overflow-y-auto drink-history-list"
      name="slide"
      tag="ul"
      appear=""
      v-if="props.drinkHistory.length"
    >
      <li
        class="flex px-4 items-center justify-between"
        v-for="drink in props.drinkHistory"
        :key="drink.date"
      >
        <div class="flex gap-4 items-center">
          <full-glass-icon class="fill-dark w-6 h-6"></full-glass-icon>
          <div class="flex gap-2 items-center">
            <span class="font-bold text-lg leading-5"
              >{{ drink.capacity }}ml</span
            >
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
</template>

<script setup>
/* Icons */

import FullGlassIcon from "@/components/icons/FullGlassIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
/* Props and emitts */
const props = defineProps({
  drinkHistory: Array,
});
const emit = defineEmits(["removeDrink"]);
/* Methods */
const getDateFromDrink = (drinkDate) => {
  const date = new Date(drinkDate);
  const time = date.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
};
const removeDrink = (drink) => {
  emit("removeDrink", drink);
};
</script>

<style scoped>
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