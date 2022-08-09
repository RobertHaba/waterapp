<template>
  <SettingsLayout :has-changes="hasChanges" @save-data="saveData">
    <template #title>Konto</template>
    <ListInsetShadow class="gap-6">
      <AccountListItem input-id="name"
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
      </AccountListItem>
      <AccountListItem input-id="gender"
        ><template #title>Płeć</template>
        <BaseSelect
          class="w-32 text-right text-lg bg-light"
          id="gender"
          required
          :select-options="genderSelectOptions"
          @input="watchForValueChange(2, user.gender, useProfile().user.gender)"
          v-model="user.gender"
        ></BaseSelect>
      </AccountListItem>
      <AccountListItem input-id="weight"
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
      </AccountListItem>
      <AccountListItem input-id="year"
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
      </AccountListItem>
      <AccountListItem input-id="activity"
        ><template #title>Aktywność</template>
        <BaseSelect
          class="w-32 text-right text-lg bg-light"
          id="activity"
          :select-options="activitySelectOptions"
          required
          @input="
            watchForValueChange(5, user.activity, useProfile().user.activity)
          "
          v-model="user.activity"
        ></BaseSelect>
      </AccountListItem>
    </ListInsetShadow>
    <AccountDataChangedPopup
      v-if="isPopupOpen"
      @close-popup="closePopup"
      @save-data="updateGoal"
    ></AccountDataChangedPopup>
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';
import AccountListItem from '@/components/layouts/AccountListItem.vue';
import BaseSelect from '../../components/inputs/BaseSelect.vue';
import AccountDataChangedPopup from '@/components/popups/AccountDataChangedPopup.vue';

import { computed, ref } from 'vue';
import { useProfile } from '@/stores/profile.js';
import { useCalcGoal } from '@/composables/calcDrinkGoal';
import { useSettings } from '@/stores/settings';
import { useWatchForValueChange } from '@/composables/watchForValueChange';
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
  const index = changesLog.value.findIndex((item) => item.id === elID);
  if (index === -1) {
    changesLog.value.push({
      id: elID,
      status: useWatchForValueChange(newVal, oldVal),
    });
  } else {
    changesLog.value[index].status = useWatchForValueChange(newVal, oldVal);
  }
  checkIfLogHasChanges();
};
const checkIfLogHasChanges = () => {
  hasChanges.value = changesLog.value.find((item) => item.status === true)
    ? true
    : false;
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
