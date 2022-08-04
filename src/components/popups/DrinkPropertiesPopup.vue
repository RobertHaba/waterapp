<template>
  <main class="fixed w-full min-h-screen p-4 py-10 pb-28 top-0 left-0 bg-light">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <DynamicHeading><slot></slot></DynamicHeading>
      <ListInsetShadow>
        <li class="flex flex-col gap-2 justify-between">
          <label for="capacity"
            ><TextWithIcon>
              <template #icon
                ><TrophyIcon class="fill-dark w-4 h-4 -mt-0.5"></TrophyIcon
              ></template>
              <template #text>Pojemność</template>
            </TextWithIcon></label
          >
          <div class="flex items-end">
            <input
              type="number"
              id="capacity"
              class="w-full text-center text-2xl font-bold border-b border-dark leading-none pl-5"
              v-model="props.drink.capacity"
              min="1"
              max="99999"
            />
            <span for="goal" class="border-b border-dark pl-2 right-0">ml</span>
          </div>
        </li>
        <li class="flex flex-col gap-2 justify-between">
          <TextWithIcon>
            <template #icon
              ><TrophyIcon class="fill-dark w-4 h-4 -mt-0.5"></TrophyIcon
            ></template>
            <template #text>Typ</template>
          </TextWithIcon>
          <div class="flex items-end">
            <select
              name="drinkName"
              class="w-full text-center border-b border-dark text-xl bg-light"
              v-model="props.drink.name"
            >
              <option
                :value="drink.name"
                v-for="drink in drinksList"
                :key="drink.name"
                :selected="drink.name === props.drink.name"
              >
                {{ drink.name }} ({{ drink.kcal }} kcal)
              </option>
            </select>
          </div>
        </li>
      </ListInsetShadow>
    </div>
    <FooterPopup @save-data="saveData" @close-popup="closePopup"></FooterPopup>
  </main>
</template>
<script setup>
import TextWithIcon from '@/components/texts/TextWithIcon.vue';
import FooterPopup from '@/components/popups/FooterPopup.vue';
import TrophyIcon from '@/components/icons/Trophy.vue';
import { useSettings } from '@/stores/settings.js';
const drinksList = useSettings().settings.drinks;
const props = defineProps({
  drink: Object,
});
const emit = defineEmits(['closePopup', 'saveData']);
const saveData = () => {
  emit('saveData');
};
const closePopup = () => {
  emit('closePopup');
};
</script>
