<template>
  <settings-layout :has-changes="hasChanges" @save-data="saveData">
    <template #title>Ustawienia napojów</template>
    <shadow-list>
      <li class="flex gap-2 justify-between">
        <text-and-icon>
          <template #icon
            ><trophy-icon class="fill-dark w-4 h-4 -mt-0.5"></trophy-icon
          ></template>
          <template #text>Dzienny cel</template>
        </text-and-icon>
        <div class="flex h-fit">
          <input
            type="number"
            name=""
            id="goal"
            class="
              w-24
              text-right text-lg
              font-bold
              border-b border-dark
              leading-none
            "
            v-model="drinkSettings.goal"
            :placeholder="drinkSettings.goal"
            min="1"
            max="99999"
            @keyup="checkInputChange"
            @click="checkInputChange"
          />
          <label for="goal" class="border-b border-dark pl-2">ml</label>
        </div>
      </li>
      <li class="flex gap-2 justify-between">
        <div class="flex flex-col gap-4">
          <text-and-icon>
            <template #icon
              ><trophy-icon class="fill-dark w-4 h-4 -mt-0.5"></trophy-icon
            ></template>
            <template #text>Wylicz dzienny cel</template>
          </text-and-icon>
          <p class="text-sm leading-4">
            Automatycznie oblicza dzienne zapotrzebowanie wody dla organizmu
          </p>
        </div>
        <SmallButton
          class="text-sm !px-4"
          :class="{ active: drinkSettings.autoCalc === true }"
          @click="calcDailyDrinkGoal"
          >{{ textAutoCalcButton }}</SmallButton
        >
      </li>
    </shadow-list>
    <shadow-list>
      <li class="flex flex-col gap-6">
        <text-and-icon>
          <template #icon
            ><trophy-icon class="fill-dark w-4 h-4 -mt-0.5"></trophy-icon
          ></template>
          <template #text>Przypięte pojemności</template>
        </text-and-icon>
        <div class="flex flex-wrap justify-around gap-3">
          <SmallButton
            class="!gap-4 !bg-light"
            v-for="(drink, index) in drinkList"
            :key="drink"
            @click="openPopup(index)"
          >
            <div class="flex items-center gap-2">
              <trophy-icon class="fill-dark w-4 h-4 -mt-0.5"></trophy-icon>
              <span>{{ drink.capacity }}ml</span>
            </div>
            <edit-icon class="fill-dark w-4 h-4 -mt-0.5"></edit-icon>
          </SmallButton>
        </div>
      </li>
    </shadow-list>
    <edit-drink-popup
      v-if="popupData.isOpen"
      :drink="popupData.drink"
      @close-popup="closePopup"
      @save-data="changeStaticDrink"
      >Edytuj napój</edit-drink-popup
    >
  </settings-layout>
</template>

<script setup>
/* Imports */
import { computed, ref } from "@vue/runtime-core";
import SettingsLayout from "@/components/SettingsLayout.vue";
import EditDrinkPopup from "@/components/popups/EditDrinkPopup.vue";
import SmallButton from "../../components/buttons/SmallButton.vue";
import { useSettings } from "@/stores/settings";
import { useCalcGoal } from "@/composables/useCalcDrinkGoal.js";
const hasChanges = ref(false);
const drinkSettings = ref({ ...useSettings().settings.drink });
const drinkList = drinkSettings.value.list.statics;
const textAutoCalcButton = computed(() => {
  return drinkSettings.value.autoCalc ? "tak" : "nie";
});
const checkInputChange = () => {
  console.log(useSettings().settings.drink.goal);
  if (drinkSettings.value.goal !== useSettings().settings.drink.goal) {
    drinkSettings.value.autoCalc = false;
    hasChanges.value = true;
  } else {
    drinkSettings.value.autoCalc = useSettings().settings.drink.autoCalc;
    hasChanges.value = false;
  }
};
const calcDailyDrinkGoal = () => {
  if (!hasChanges.value) {
    return;
  }
  drinkSettings.value.goal = useCalcGoal();
  drinkSettings.value.autoCalc = true;
  hasChanges.value = true;
};
const saveData = () => {
  hasChanges.value = false;
  useSettings().updateSettingsData("drink", drinkSettings.value);

  resetRefs();
};
const resetRefs = () => {
  drinkSettings.value = { ...useSettings().settings.drink };
  hasChanges.value = false;
};
/* Popup */

const popupData = ref({
  isOpen: false,
  drink: null,
  drinkIndex: null,
});
const openPopup = (index) => {
  popupData.value.drinkIndex = index;
  popupData.value.drink = { ...drinkList[index] };
  popupData.value.isOpen = true;
};
const changeStaticDrink = () => {
  popupData.value.isOpen = false;
  useSettings().settings.drink.list.statics[popupData.value.drinkIndex] =
    popupData.value.drink;
  useSettings().updateSettingsData("drink", useSettings().settings.drink);
};
const closePopup = () => {
  popupData.value.isOpen = false;
};
/* ICONS */

import TrophyIcon from "@/components/icons/TrophyIcon.vue";
import TextAndIcon from "@/components/texts/TextAndIcon.vue";
import EditIcon from "../../components/icons/EditIcon.vue";
</script>
