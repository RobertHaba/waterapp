<template>
  <div class="flex flex-col gap-6">
    <dynamic-heading :level="3" class="text-xl"><slot></slot></dynamic-heading>
    <div class="flex flex-col gap-6">
      <div class="flex justify-between">
        <div
          class="
            shadow-inset-light
            w-fit
            flex
            rounded-full
            flex-col
            items-center
          "
          :class="buttonColor"
        >
          <div class="w-fit flex pr-2">
            <base-button
              class-colors="pr-2 rounded-none pb-0"
              @click="addDrink(drinkList.dynamic)"
              ><component
                :is="drinkIconName"
                class="w-6 h-6 fill-dark"
              ></component
              ><span class="text-2xl font-normal"
                >{{ drinkList.dynamic.capacity }}ml</span
              ></base-button
            >

            <button
              class="p-4 pb-0"
              aria-label="Przycisk do zmiany parametrów napoju"
              @click="openPopup(drinkList.dynamic)"
            >
              <edit-icon class="w-4 h-4 fill-dark"></edit-icon>
            </button>
          </div>
          <p
            class="text-center text-xs truncate w-30 pb-3 cursor-pointer"
            @click="addDrink(drinkList.dynamic)"
          >
            <span v-if="mode === 'drink'">{{ drinkList.dynamic.name }}</span>
          </p>
        </div>
        <base-button
          @click="openPopup()"
          :class="[mode === 'drink' ? 'bg-orange' : ' ']"
          ><add-icon class="fill-light w-6 h-6"></add-icon
        ></base-button>
      </div>
      <ul class="flex justify-between">
        <li v-for="drink in drinkList.statics" :key="drink" :title="drink.name">
          <SmallButton
            @click="addDrink(drink)"
            class="flex flex-col gap-0"
            :class="buttonColor"
            ><div class="flex gap-2 items-center">
              <component
                :is="drinkIconName"
                class="w-4 h-4 fill-dark drink-refill"
              ></component
              ><span class="font-normal">{{ drink.capacity }}ml</span>
            </div>
            <p class="text-xs truncate max-w-20" v-if="mode === 'drink'">
              {{ drink.name }}
            </p></SmallButton
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
import DrinkIcon from "../icons/DrinkIcon.vue";
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
  mode: "drink",
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
      drinkID: 0,
      capacity: 10,
      name: "woda",
    };
    popupData.value.autoAdd = true;
  }
  popupData.value.isOpen = true;
};
const changeDrink = (drink) => {
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
const buttonColor = computed(() => {
  return props.mode === "drink" ? "bg-orange-500" : "bg-blue-500";
});
const drinkIconName = computed(() => {
  return props.mode === "drink" ? DrinkIcon : EmptyGlassIcon;
});
</script>
<style scoped>
@media screen and (max-width: 380px) {
  .drink-refill {
    display: none !important;
  }
}
</style>
