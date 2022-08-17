<template>
  <main
    class="fixed w-full min-h-screen p-4 py-10 pb-28 top-0 left-0 bg-light z-20"
  >
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <dynamic-heading class="text-2xl"><slot></slot></dynamic-heading>
      <form @submit.prevent="">
        <shadow-list
          class="fixed w-[calc(100%-2rem)] max-w-sm bottom-1/2 translate-y-1/2"
        >
          <li class="flex flex-col gap-2 justify-between">
            <label for="capacity"
              ><text-and-icon>
                <template #icon
                  ><trophy-icon class="fill-dark w-4 h-4 -mt-0.5"></trophy-icon
                ></template>
                <template #text>Pojemność</template>
              </text-and-icon></label
            >
            <div class="flex items-end">
              <input
                type="number"
                id="capacity"
                class="
                  w-full
                  text-center text-2xl
                  font-bold
                  border-b border-dark
                  leading-none
                  pl-5
                "
                v-model="drink.capacity"
                min="10"
                max="10000"
                ref="capacityInput"
                @input="
                  watchForValueChange(1, drink.capacity, props.drink.capacity)
                "
              />
              <span for="goal" class="border-b border-dark pl-2 right-0"
                >ml</span
              >
            </div>
            <p class="text-red text-sm" v-if="!isValid">
              Wprowadź pojemność z zakresu 10 - 10000
            </p>
          </li>
          <li
            class="flex flex-col gap-2 justify-between"
            v-if="props.mode === 'drink'"
          >
            <text-and-icon>
              <template #icon
                ><trophy-icon class="fill-dark w-4 h-4 -mt-0.5"></trophy-icon
              ></template>
              <template #text>Typ</template>
            </text-and-icon>
            <div class="flex items-end">
              <select
                name="drinkName"
                class="w-full text-center border-b border-dark text-xl bg-light"
                v-model="drink.name"
              >
                <option
                  :value="drink.name"
                  v-for="drink in drinksList"
                  :key="drink.name"
                  :selected="drink.name === drink.name"
                >
                  {{ drink.name }} ({{ drink.kcal }} kcal)
                </option>
              </select>
            </div>
          </li>
        </shadow-list>

        <popup-navbar
          @save-data="saveData"
          @close-popup="closePopup"
          :has-changes="hasChanges"
        ></popup-navbar>
      </form>
    </div>
  </main>
</template>
<script setup>
import TextAndIcon from "@/components/texts/TextAndIcon.vue";
import PopupNavbar from "@/components/popups/PopupNavbar.vue";
import TrophyIcon from "@/components/icons/TrophyIcon.vue";
import { useSettings } from "@/stores/settings.js";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import {
  useCheckForLogChanges,
  useAddChangeLog,
} from "../../composables/useWatchForValueChange";
const drinksList = useSettings().settings.drinks;
const capacityInput = ref(null);
const props = defineProps({
  drink: Object,
  autoAdd: Boolean,
  mode: {
    type: String,
    default: "water",
  },
});
const emit = defineEmits(["closePopup", "saveData"]);
const hasChanges = ref(props.autoAdd);
const changesLog = ref([]);
const isValid = ref(true);
const drink = ref({ ...props.drink });
const watchForValueChange = (elID, newVal, oldVal) => {
  changesLog.value = useAddChangeLog(changesLog.value, elID, newVal, oldVal);
  hasChanges.value = useCheckForLogChanges(changesLog.value);
};
const saveData = () => {
  if (drink.value.capacity >= 10 && drink.value.capacity <= 10000) {
    emit("saveData", drink.value);
  } else {
    isValid.value = false;
  }
};
const closePopup = () => {
  emit("closePopup");
};
onMounted(() => {
  capacityInput.value.focus();
});
</script>
