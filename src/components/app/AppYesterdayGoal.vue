<template>
  <div class="flex flex-col gap-4">
    <dynamic-heading :level="3" class="text-xl"
      >Wczorajszy dzień</dynamic-heading
    >
    <div class="px-4" v-if="Object.keys(yesterdayGoal).length !== 0">
      <text-and-icon>
        <template #icon>
          <trophy-icon class="fill-dark h-4 w-4"></trophy-icon>
        </template>
        <template #text>
          <span class="text-lg">
            {{ yesterdayGoal.total }}/{{ yesterdayGoal.goal }}ml
          </span>
        </template>
      </text-and-icon>
      <p>
        Udało Ci się osiągnąć {{ yesterdayGoalPercentages }}% wczorajszego celu!
      </p>
    </div>
    <div v-else>
      <p>Brak danych. Uzupełniaj swoje płyny codziennie!</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
/* Icons */
import TrophyIcon from "@/components/icons/TrophyIcon.vue";
/* Components */
import TextAndIcon from "@/components/texts/TextAndIcon.vue";
/* Composables */
import { useCalcPercentages } from "../../composables/useCalcPercentages";
/* Stores */
import { useSettings } from "@/stores/settings";
/* Refs */
const yesterdayGoal = useSettings().goalHistory.yesterday;
const yesterdayGoalPercentages = computed(() => {
  return useCalcPercentages(yesterdayGoal.total, yesterdayGoal.goal);
});
</script>
