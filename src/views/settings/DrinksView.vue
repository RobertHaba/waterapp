<template>
  <settings-layout>
    <template #title>Napoje</template>
    <shadow-list class="gap-6"
      ><div class="relative flex flex-col gap-6 overflow-y-auto max-h-96">
        <li
          class="flex justify-between"
          v-for="drink in drinkList"
          :key="drink"
        >
          <div>
            <p class="font-bold text-xl leading-none">{{ drink.name }}</p>
            <span class="text-sm">{{ drink.kcal }} kcal/100ml</span>
          </div>
          <small-button class="shadow-none bg-transparent"
            ><edit-icon class="fill-dark w-6 h-6"></edit-icon
          ></small-button>
        </li></div
    ></shadow-list>
    <shadow-list class="bg-blue text-white shadow-inset-blue">
      <li>
        <router-link :to="{ name: 'drinkItemAdd' }" class="flex flex-col gap-3"
          ><text-and-icon>
            <template #icon
              ><add-icon class="fill-white w-4 h-4"></add-icon
            ></template>
            <template #text>Dodaj nowy napój</template>
          </text-and-icon>
          <p class="text-sm leading-4">
            Kliknij tutaj aby dodać twój nowy napój oraz wprowadzić jego kalorie
          </p></router-link
        >
      </li>
    </shadow-list>
  </settings-layout>
</template>

<script setup>
import { ref } from "vue";
/* Components */
import SettingsLayout from "@/components/SettingsLayout.vue";
import SmallButton from "../../components/buttons/SmallButton.vue";
import TextAndIcon from "../../components/texts/TextAndIcon.vue";

/* ICONS */
import EditIcon from "../../components/icons/EditIcon.vue";
import AddIcon from "../../components/icons/AddIcon.vue";

/* Stores */
import { useSettings } from "../../stores/settings";
/* Refs */
const drinkList = ref(useSettings().settings.drinks);
</script>
