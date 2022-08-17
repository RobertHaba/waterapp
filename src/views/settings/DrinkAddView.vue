<template>
  <base-layout>
    <header class="flex items-center justify-between">
      <dynamic-heading class="text-2xl">Dodaj napój</dynamic-heading>
      <trash-icon class="w-6 h-6 fill-dark"></trash-icon>
    </header>
    <shadow-list
      class="fixed w-[calc(100%-2rem)] max-w-sm bottom-1/2 translate-y-1/2"
    >
      <li class="flex flex-col gap-2 justify-between">
        <label for="drinkName"
          ><text-and-icon>
            <template #icon
              ><full-glass-icon class="w-4 h-4 fill-dark"></full-glass-icon>
            </template>
            <template #text>Nazwa</template>
          </text-and-icon></label
        >
        <input
          type="text"
          name="drinkName"
          id="drinkName"
          minlength="2"
          maxlength="20"
          v-model="drink.name"
          placeholder="np. Pepsi"
          required
          ref="inputNameEl"
          @input="watchForValueChange(1, drink.name, props.drink.name)"
          class="
            w-full
            text-center text-2xl
            font-bold
            border-b border-dark
            leading-none
          "
        />
        <text-validation
          v-if="validationStatus.launched && !validationStatus.name"
        >
          Długość wyrazu musi mieścić się w przedziale od 2 do 20
        </text-validation>
      </li>
      <li class="flex flex-col gap-2 justify-between">
        <label for="drinkName"
          ><text-and-icon>
            <template #icon
              ><calories-icon class="w-4 h-4 fill-dark"></calories-icon>
            </template>
            <template #text>Kalorie</template>
          </text-and-icon></label
        >
        <div class="flex items-end">
          <input
            type="number"
            name="drinkName"
            id="drinkName"
            minlength="0"
            max="10000"
            required
            v-model="drink.kcal"
            @input="watchForValueChange(2, drink.kcal, props.drink.kcal)"
            class="
              w-full
              text-center text-2xl
              font-bold
              border-b border-dark
              leading-none
            "
          />
          <p class="border-b border-dark">kcal/100ml</p>
        </div>
        <text-validation
          v-if="validationStatus.launched && !validationStatus.kcal"
        >
          Wprowadź liczbę z przedziału 0-10000
        </text-validation>
      </li>
    </shadow-list>
    <settings-navbar
      @save-data="saveData"
      @close-popup="closeView"
      :has-changes="hasChanges"
    ></settings-navbar>
  </base-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
/* Components */
import TextAndIcon from "../../components/texts/TextAndIcon.vue";
import SettingsNavbar from "../../components/SettingsNavbar.vue";
import TextValidation from "../../components/inputs/TextValidation.vue";
/* Stores */
import { useSettings } from "../../stores/settings";
/* Composables */
import {
  useNumValidation,
  useTextValidation,
} from "@/composables/useInputValidation.js";
import {
  useCheckForLogChanges,
  useAddChangeLog,
} from "../../composables/useWatchForValueChange";
/* ICONS */
import TrashIcon from "@/components/icons/TrashIcon.vue";
import FullGlassIcon from "@/components/icons/FullGlassIcon.vue";
import CaloriesIcon from "../../components/icons/CaloriesIcon.vue";
/* Props */
const props = defineProps({
  drink: {
    default: {
      name: "",
      kcal: 0,
    },
  },
});
/* REFS */
const inputNameEl = ref();
const validationStatus = ref({
  name: false,
  kcal: false,
  launched: false,
});
const changesLog = ref([]);
const hasChanges = ref(false);
const drink = ref({
  name: "",
  kcal: 0,
});
const settingsDrinks = ref(useSettings().settings.drinks);
const router = useRouter();
/* Methods */
const saveData = () => {
  validationStatus.value.launched = true;

  if (validationStatus.value.name && validationStatus.value.kcal) {
    settingsDrinks.value.push(drink.value);
    useSettings().updateSettingsData("drinks", settingsDrinks.value);
    router.back();
    return;
  } else {
    return;
  }
};
const checkValidation = () => {
  validationStatus.value.name = useTextValidation(drink.value.name, 20, 2);
  validationStatus.value.kcal = useNumValidation(drink.value.kcal, 10000, 0);
};
const watchForValueChange = (elID, newVal, oldVal) => {
  checkValidation();
  changesLog.value = useAddChangeLog(changesLog.value, elID, newVal, oldVal);
  hasChanges.value = useCheckForLogChanges(changesLog.value);
};
const closeView = () => {};
/* Mounted */
onMounted(() => {
  inputNameEl.value.focus();
});
</script>