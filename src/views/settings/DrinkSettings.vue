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
              >{{ btnText }}</SlimButton
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
                v-for="drink in drinkList"
                :key="drink"
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
      <NavbarSettings @save-data="saveData"></NavbarSettings>
    </footer>
  </main>
</template>

<script setup>
import ButtonReturnAsIcon from '../../components/buttons/ButtonReturnAsIcon.vue';
import TrophyIcon from '@/components/icons/Trophy.vue';
import TextWithIcon from '@/components/texts/TextWithIcon.vue';
import SlimButton from '../../components/buttons/SlimButton.vue';
import EditIcon from '../../components/icons/Edit.vue';
import NavbarSettings from '../../components/NavbarSettings.vue';
import { useSettings } from '@/stores/settings';
import { useCalcGoal } from '@/composables/calcDrinkGoal.js';
import { computed, ref } from '@vue/runtime-core';
const drinkSettings = ref({ ...useSettings().settings.drink });
const drinkList = drinkSettings.value.list.statics;
const btnText = computed(() => {
  return drinkSettings.value.autoCalc ? 'włączone' : 'wyłączone';
});
const saveData = () => {
  useSettings().updateSettingsData('drink', drinkSettings);
};
const checkValueChange = () => {
  if (drinkSettings.value.goal !== useSettings().settings.drink.goal) {
    drinkSettings.value.autoCalc = false;
  }
};
const calcDailyDrinkGoal = () => {
  drinkSettings.value.goal = useCalcGoal();
  drinkSettings.value.autoCalc = true;
};
</script>

<style scoped></style>
