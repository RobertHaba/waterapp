<template>
  <SettingsLayout :has-changes="hasChanges" @save-data="saveData">
    <template #title>Powiadomienia</template>
    <ListInsetShadow class="gap-6">
      <li class="flex gap-6 justify-between flex-wrap">
        <TextWithIcon>
          <template #icon
            ><BellIcon class="fill-dark w-4 h-4 -mt-0.5"></BellIcon
          ></template>
          <template #text>Powiadomienia</template>
        </TextWithIcon>
        <SlimButton
          class="text-sm !px-4"
          @click="toggleStatus('active', 1, notificationSettings.active)"
          :class="{ active: notificationSettings.active === true }"
          >{{ buttonText(notificationSettings.active) }}</SlimButton
        >
      </li>
    </ListInsetShadow>
    <ListInsetShadow v-if="notificationSettings.active">
      <li class="flex gap-6 justify-between flex-wrap">
        <TextWithIcon>
          <template #icon
            ><BellIcon class="fill-dark w-4 h-4 -mt-0.5"></BellIcon
          ></template>
          <template #text>Dźwięki</template>
        </TextWithIcon>
        <SlimButton
          class="text-sm !px-4"
          @click="toggleStatus('sound', 2, notificationSettings.sound)"
          :class="{ active: notificationSettings.sound === true }"
          >{{ buttonText(notificationSettings.sound) }}</SlimButton
        >
      </li>
      <li class="flex gap-6 justify-between flex-wrap">
        <TextWithIcon>
          <template #icon
            ><BellIcon class="fill-dark w-4 h-4 -mt-0.5"></BellIcon
          ></template>
          <template #text>Wibracje</template>
        </TextWithIcon>
        <SlimButton
          class="text-sm !px-4"
          @click="
            toggleStatus('vibrations', 3, notificationSettings.vibrations)
          "
          :class="{ active: notificationSettings.vibrations === true }"
          >{{ buttonText(notificationSettings.vibrations) }}</SlimButton
        >
      </li>

      <li class="flex gap-3 justify-between flex-wrap">
        <TextWithIcon>
          <template #icon
            ><BellIcon class="fill-dark w-4 h-4 -mt-0.5"></BellIcon
          ></template>
          <template #text>Godziny aktywności</template>
        </TextWithIcon>
        <p class="text-sm leading-4">
          Ustaw godziny, w których chcesz otrzymywać powiadomienia. <br />
          Aktualne godziny:
          <span
            v-if="
              notificationSettings.wakeUp !== null &&
              notificationSettings.bedtime !== null
            "
          >
            {{ notificationSettings.wakeUp }} -
            {{ notificationSettings.bedtime }}</span
          >
          <span v-else>7:00-23:00</span>
        </p>
      </li>
      <li class="flex gap-3 justify-between flex-wrap">
        <TextWithIcon>
          <template #icon
            ><BellIcon class="fill-dark w-4 h-4 -mt-0.5"></BellIcon
          ></template>
          <template #text>Dni</template>
        </TextWithIcon>
        <p class="text-sm leading-4">
          Ustaw dni, w których powiadomienia mają być aktywne. <br />
          Aktualne dni:
          <span
            v-if="
              notificationSettings.wakeUp !== null &&
              notificationSettings.bedtime !== null
            "
          >
            {{ notificationSettings.wakeUp }} -
            {{ notificationSettings.bedtime }}
          </span>
          <span v-else>pn - ndz</span>
        </p>
      </li>
    </ListInsetShadow>
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';
import BellIcon from '@/components/icons/Bell.vue';
import TextWithIcon from '@/components/texts/TextWithIcon.vue';
import SlimButton from '@/components/buttons/SlimButton.vue';
import {
  useCheckForLogChanges,
  useAddChangeLog,
} from '@/composables/useWatchForValueChange';

import { useProfile } from '@/stores/profile.js';
import { ref } from 'vue';
const notificationSettings = ref({ ...useProfile().user.notifications });
const hasChanges = ref(false);
const changesLog = ref([]);
const buttonText = (status) => {
  return status ? 'Włączone' : 'Wyłączone';
};
const toggleStatus = (name, elID, value) => {
  notificationSettings.value[name] = !value;
  console.log(notificationSettings.value[name]);
  console.log(useProfile().user.notifications[name]);
  watchForValueChange(
    elID,
    notificationSettings.value[name],
    useProfile().user.notifications[name]
  );
};
const saveData = () => {
  useProfile().user.notifications = notificationSettings;
  useProfile().updateUserData(useProfile().user);
  resetRefs();
};
const resetRefs = () => {
  changesLog.value = [];
  notificationSettings.value = { ...useProfile().user.notifications };
  hasChanges.value = false;
};
const watchForValueChange = (elID, newVal, oldVal) => {
  changesLog.value = useAddChangeLog(changesLog.value, elID, newVal, oldVal);
  hasChanges.value = useCheckForLogChanges(changesLog.value);
};
</script>
