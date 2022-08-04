<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-28">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <header class="flex w-full">
        <ButtonReturnAsIcon></ButtonReturnAsIcon>
        <div class="w-[calc(100%-4rem)] flex justify-center items-center">
          <DynamicHeading class="text-2xl">Ustawienia napojów</DynamicHeading>
        </div>
      </header>
      <div class="flex flex-col gap-4">
        <ListInsetShadow>
          <li class="flex gap-2 justify-between">
            <TextWithIcon>
              <template #icon
                ><TrophyIcon class="fill-dark w-4 h-4 -mt-0.5"></TrophyIcon
              ></template>
              <template #text>Dzienny cel</template>
            </TextWithIcon>
            <div class="flex h-fit">
              <input
                type="number"
                name=""
                id="goal"
                class="w-24 text-right text-lg font-bold border-b border-dark leading-none"
                v-model="drinkSettings.goal"
                :placeholder="drinkSettings.goal"
                min="1"
                max="99999"
                @keyup="checkValueChange"
                @click="checkValueChange"
              />
              <label for="goal" class="border-b border-dark pl-2">ml</label>
            </div>
          </li>
          <li class="flex gap-2 justify-between">
            <div class="flex flex-col gap-4">
              <TextWithIcon>
                <template #icon
                  ><TrophyIcon class="fill-dark w-4 h-4 -mt-0.5"></TrophyIcon
                ></template>
                <template #text>Wylicz dzienny cel</template>
              </TextWithIcon>
              <p class="text-sm leading-4">
                Automatycznie oblicza dzienne zapotrzebowanie wody dla organizmu
              </p>
            </div>
            <SlimButton
              :class="{ active: drinkSettings.autoCalc === true }"
              @click="calcDailyDrinkGoal"
              >{{ textAutoCalcButton }}</SlimButton
            >
          </li>
        </ListInsetShadow>
        <ListInsetShadow>
          <li class="flex flex-col gap-6">
            <TextWithIcon>
              <template #icon
                ><TrophyIcon class="fill-dark w-4 h-4 -mt-0.5"></TrophyIcon
              ></template>
              <template #text>Przypięte pojemności</template>
            </TextWithIcon>
            <div class="flex flex-wrap justify-around gap-3">
              <SlimButton
                class="!gap-4 !bg-light"
                v-for="(drink, index) in drinkList"
                :key="drink"
                @click="openPopup(index)"
              >
                <div class="flex items-center gap-2">
                  <TrophyIcon class="fill-dark w-4 h-4 -mt-0.5"></TrophyIcon>
                  <span>{{ drink.capacity }}ml</span>
                </div>
                <EditIcon class="fill-dark w-4 h-4 -mt-0.5"></EditIcon>
              </SlimButton>
            </div>
          </li>
        </ListInsetShadow>
      </div>
    </div>
    <footer>
      <NavbarSettings
        @save-data="saveData"
        :has-changes="hasChanges"
      ></NavbarSettings>
    </footer>
    <DrinkPropertiesPopup
      v-if="isPopupOpen"
      :drink="popupData"
      @close-popup="closePopup"
      @save-data="changeStaticDrink"
      >Edytuj napój</DrinkPropertiesPopup
    >
  </main>
</template>

<script setup>
import NavbarSettings from '../../components/NavbarSettings.vue';
import DrinkPropertiesPopup from '@/components/popups/DrinkPropertiesPopup.vue';
import SlimButton from '../../components/buttons/SlimButton.vue';
import ButtonReturnAsIcon from '../../components/buttons/ButtonReturnAsIcon.vue';
import TrophyIcon from '@/components/icons/Trophy.vue';
import TextWithIcon from '@/components/texts/TextWithIcon.vue';
import EditIcon from '../../components/icons/Edit.vue';
import { useSettings } from '@/stores/settings';
import { useCalcGoal } from '@/composables/calcDrinkGoal.js';
import { computed, ref } from '@vue/runtime-core';
const drinkSettings = ref({ ...useSettings().settings.drink });
const isPopupOpen = ref(false);
const hasChanges = ref(false);
const popupData = ref(null);
const indexOfDrinkInPopup = ref(null);
const drinkList = drinkSettings.value.list.statics;
const textAutoCalcButton = computed(() => {
  return drinkSettings.value.autoCalc ? 'tak' : 'nie';
});
const checkValueChange = () => {
  if (drinkSettings.value.goal !== useSettings().settings.drink.goal) {
    drinkSettings.value.autoCalc = false;
    hasChanges.value = true;
  } else {
    hasChanges.value = false;
  }
};
const calcDailyDrinkGoal = () => {
  drinkSettings.value.goal = useCalcGoal();
  drinkSettings.value.autoCalc = true;
  hasChanges.value = true;
};
const openPopup = (index) => {
  indexOfDrinkInPopup.value = index;
  popupData.value = { ...drinkList[index] };
  isPopupOpen.value = true;
};
const changeStaticDrink = () => {
  isPopupOpen.value = false;
  useSettings().settings.drink.list.statics[indexOfDrinkInPopup.value] =
    popupData.value;
  useSettings().updateSettingsData('drink', useSettings().settings.drink);
};
const saveData = () => {
  hasChanges.value = false;
  useSettings().updateSettingsData('drink', drinkSettings);
};
const closePopup = () => {
  isPopupOpen.value = false;
};
</script>

<style scoped></style>
