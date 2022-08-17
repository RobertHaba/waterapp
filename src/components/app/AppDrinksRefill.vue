<template>
  <div class="flex flex-col gap-6">
    <dynamic-heading :level="3" class="text-xl"><slot></slot></dynamic-heading>
    <div class="flex flex-col gap-6">
      <div class="flex justify-between">
        <div
          class="shadow-inset-light bg-blue-500 w-fit flex rounded-full pr-2"
        >
          <base-button
            class-colors="pr-2 rounded-none"
            @click="addDrink(drinkList.dynamic)"
            ><empty-glass-icon class="w-6 h-6 fill-dark"></empty-glass-icon
            ><span class="text-2xl font-normal"
              >{{ drinkList.dynamic.capacity }}ml</span
            ></base-button
          >

          <button
            class="p-4"
            aria-label="Przycisk do zmiany parametrów napoju"
            @click="openPopup(drinkList.dynamic)"
          >
            <edit-icon class="w-4 h-4 fill-dark"></edit-icon>
          </button>
        </div>
        <base-button @click="openPopup()"
          ><add-icon class="fill-light w-6 h-6"></add-icon
        ></base-button>
      </div>
      <ul class="flex justify-between">
        <li v-for="drink in drinkList.statics" :key="drink">
          <SmallButton @click="addDrink(drink)"
            ><empty-glass-icon class="w-4 h-4 fill-dark"></empty-glass-icon
            ><span class="font-normal"
              >{{ drink.capacity }}ml</span
            ></SmallButton
          >
        </li>
      </ul>
    </div>
    <edit-drink-popup
      v-if="popupData.isOpen"
      :drink="popupData.drink"
      :mode="props.mode"
      :auto-add="popupData.autoAdd"
      @close-popup="closePopup"
      @save-data="changeDrink"
      >{{ popupDrinkText }}</edit-drink-popup
    >
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
/* Icons */
import EmptyGlassIcon from "@/components/icons/EmptyGlassIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
/* Components */
import SmallButton from "@/components/buttons/SmallButton.vue";
import EditDrinkPopup from "@/components/popups/EditDrinkPopup.vue";
/* Stores */
import { useSettings } from "@/stores/settings";
/* Props */
const props = defineProps({
  mode: String,
});
/* Emit */
const emit = defineEmits(["addDrink"]);
/* Refs */
const drinkSettingsStore = useSettings().settings[props.mode];
const drinkList = drinkSettingsStore.list;
const popupData = ref({
  isOpen: false,
  drink: null,
  autoAdd: false,
  title: "Edytuj napój",
});
/* Methods */
const addDrink = (drinkItem) => {
  emit("addDrink", drinkItem);
};
const openPopup = (drinkItem = null) => {
  if (drinkItem !== null) {
    popupData.value.drink = { ...drinkItem };
  } else {
    popupData.value.drink = {
      capacity: 10,
      name: "woda",
    };
    popupData.value.autoAdd = true;
  }
  popupData.value.isOpen = true;
};
const changeDrink = (drink) => {
  console.log(drink);
  if (popupData.value.autoAdd) {
    addDrink(drink);
  } else {
    useSettings().settings[props.mode].list.dynamic = drink;
    useSettings().updateSettingsData(
      props.mode,
      useSettings().settings[props.mode]
    );
    popupData.value.drink = null;
  }
  closePopup();
};
const closePopup = () => {
  popupData.value.isOpen = false;
  popupData.value.autoAdd = false;
};
/* Computed */
const modeText = computed(() => (props.mode === "water" ? "wode" : "napój"));
const popupDrinkText = computed(() => {
  return popupData.value.autoAdd
    ? "Dodaj " + modeText.value
    : "Edytuj " + modeText.value;
});
</script>
