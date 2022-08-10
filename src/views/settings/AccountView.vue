<template>
  <settings-layout :has-changes="hasChanges" @save-data="saveData">
    <template #title>Konto</template>
    <shadow-list class="gap-6">
      <shadow-list-item input-id="name"
        ><template #title>Imię</template>
        <input
          type="text"
          id="name"
          autocomplete="name"
          v-model="user.name"
          @input="watchForValueChange(1, user.name, useProfile().user.name)"
          maxlength="13"
          class="w-32 text-right text-lg border-b border-dark leading-none"
        />
      </shadow-list-item>
      <shadow-list-item input-id="gender"
        ><template #title>Płeć</template>
        <base-select
          class="w-32 text-right text-lg bg-light"
          id="gender"
          required
          :select-options="genderSelectOptions"
          @input="watchForValueChange(2, user.gender, useProfile().user.gender)"
          v-model="user.gender"
        ></base-select>
      </shadow-list-item>
      <shadow-list-item input-id="weight"
        ><template #title>Waga</template>
        <template #error v-if="!isWeightDataValid"
          >Podaj wagę z przedziału od 3 do 300kg</template
        >
        <input
          type="number"
          id="weight"
          autocomplete="weight"
          v-model="user.weight"
          min="3"
          max="300"
          required
          @input="watchForValueChange(3, user.weight, useProfile().user.weight)"
          class="w-26 text-right text-lg border-b border-dark leading-none"
        />
        <span for="goal" class="border-b text-right w-6 border-dark">kg</span>
      </shadow-list-item>
      <shadow-list-item input-id="year"
        ><template #title>Rok urodzenia</template>
        <template #error v-if="!isYearDataValid"
          >Podaj rok z przedziału od {{ yearNow - 150 }} do
          {{ yearNow }}</template
        >
        <input
          type="number"
          id="year"
          autocomplete="year"
          v-model="user.year"
          :min="minYear"
          :max="yearNow"
          class="w-32 text-right text-lg border-b border-dark leading-none"
          @input="watchForValueChange(4, user.year, useProfile().user.year)"
          placeholder="np. 2000"
        />
      </shadow-list-item>
      <shadow-list-item input-id="activity"
        ><template #title>Aktywność</template>
        <base-select
          class="w-32 text-right text-lg bg-light"
          id="activity"
          :select-options="activitySelectOptions"
          required
          @input="
            watchForValueChange(5, user.activity, useProfile().user.activity)
          "
          v-model="user.activity"
        ></base-select>
      </shadow-list-item>
    </shadow-list>
    <account-updated-popup
      v-if="isPopupOpen"
      @close-popup="closePopup"
      @save-data="updateGoal"
    ></account-updated-popup>
  </settings-layout>
</template>

<script setup>
import SettingsLayout from '@/components/SettingsLayout.vue';
import ShadowListItem from '@/components/ShadowListItem.vue';
import BaseSelect from '../../components/inputs/BaseSelect.vue';
import AccountUpdatedPopup from '@/components/popups/AccountUpdatedPopup.vue';

import { computed, ref } from 'vue';
import { useProfile } from '@/stores/profile.js';
import { useCalcGoal } from '@/composables/useCalcDrinkGoal';
import { useSettings } from '@/stores/settings';
import {
  useCheckForLogChanges,
  useAddChangeLog,
} from '@/composables/useWatchForValueChange';
const settingsStore = useSettings();
const user = ref({ ...useProfile().user });
const hasChanges = ref(false);
const isPopupOpen = ref(false);
const changesLog = ref([]);
const date = new Date();
const yearNow = ref(date.getFullYear());
const minYear = ref(yearNow.value - 150);
const saveData = () => {
  if (!isWeightDataValid.value && !isYearDataValid.value) {
    return;
  }
  user.value.name = newUserName.value;
  useProfile().updateUserData(user.value);
  if (settingsStore.settings.drink.autoCalc) {
    updateGoal();
    resetRefs();
    return;
  }
  const isImportantValueChanged = changesLog.value.find(
    (log) => log.id === 5 || log.id === 3
  );
  resetRefs();
  if (
    isImportantValueChanged &&
    useSettings().settings.drink.goal !== useCalcGoal()
  ) {
    isPopupOpen.value = true;
  }
};
const resetRefs = () => {
  changesLog.value = [];
  user.value = { ...useProfile().user };
  hasChanges.value = false;
};
const newUserName = computed(() => {
  return user.value.name == useProfile().user.name || user.value.name.length > 0
    ? user.value.name
    : 'Gość';
});

const isWeightDataValid = computed(() => {
  return (
    (user.value.weight >= 3 && user.value.weight <= 300) ||
    useProfile().user.weight == user.value.weight
  );
});
const isYearDataValid = computed(() => {
  return (
    (user.value.year >= minYear.value && user.value.year <= yearNow.value) ||
    useProfile().user.year == user.value.year
  );
});
const watchForValueChange = (elID, newVal, oldVal) => {
  changesLog.value = useAddChangeLog(changesLog.value, elID, newVal, oldVal);
  hasChanges.value = useCheckForLogChanges(changesLog.value);
};

const updateGoal = () => {
  settingsStore.updateSettingsData('drink', {
    autoCalc: true,
    goal: useCalcGoal(),
    list: settingsStore.settings.drink.list,
  });
  closePopup();
};
const closePopup = () => {
  isPopupOpen.value = false;
};
const activitySelectOptions = [
  { name: 'mała', value: 'low' },
  { name: 'średnia', value: 'medium' },
  { name: 'wysoka', value: 'high' },
];
const genderSelectOptions = [
  { name: 'mężczyna', value: 'man' },
  { name: 'kobieta', value: 'woman' },
];
</script>
