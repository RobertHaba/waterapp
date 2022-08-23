<template>
  <settings-layout :has-changes="hasChanges" @save-data="saveData">
    <template #title>Powiadomienia</template>
    <shadow-list class="gap-6">
      <li class="flex gap-6 justify-between flex-wrap">
        <text-and-icon>
          <template #icon
            ><bell-icon class="fill-dark w-4 h-4 -mt-0.5"></bell-icon
          ></template>
          <template #text>Powiadomienia</template>
        </text-and-icon>
        <SmallButton
          class="text-sm !px-4"
          @click="toggleStatus('active', 1, notificationSettings.active)"
          :class="{ active: notificationSettings.active === true }"
          >{{ buttonText(notificationSettings.active) }}</SmallButton
        >
      </li>
    </shadow-list>
    <shadow-list
      :class="{ 'mask cursor-default': !notificationSettings.active }"
    >
      <li class="flex gap-6 justify-between flex-wrap">
        <text-and-icon>
          <template #icon
            ><sound-icon class="fill-dark w-4 h-4 -mt-0.5"></sound-icon
          ></template>
          <template #text>Dźwięki</template>
        </text-and-icon>
        <SmallButton
          :disabled="!notificationSettings.active"
          class="text-sm !px-4"
          @click="toggleStatus('sound', 2, notificationSettings.sound)"
          :class="{ active: notificationSettings.sound === true }"
          >{{ buttonText(notificationSettings.sound) }}</SmallButton
        >
      </li>
      <li class="flex gap-6 justify-between flex-wrap">
        <text-and-icon>
          <template #icon
            ><bell-ring-icon class="fill-dark w-4 h-4 -mt-0.5"></bell-ring-icon
          ></template>
          <template #text>Wibracje</template>
        </text-and-icon>
        <SmallButton
          :disabled="!notificationSettings.active"
          class="text-sm !px-4"
          @click="
            toggleStatus('vibrations', 3, notificationSettings.vibrations)
          "
          :class="{ active: notificationSettings.vibrations === true }"
          >{{ buttonText(notificationSettings.vibrations) }}</SmallButton
        >
      </li>

      <li class="">
        <button
          class="flex gap-3 justify-between flex-col"
          @click="toggleTimePopup"
          type="button"
        >
          <text-and-icon>
            <template #icon
              ><clock-icon class="fill-dark w-4 h-4 -mt-0.5"></clock-icon
            ></template>
            <template #text>Godziny aktywności</template>
          </text-and-icon>
          <p class="text-sm text-left leading-4">
            Ustaw godziny, w których chcesz otrzymywać powiadomienia. <br />
            Aktualne godziny:
            <span
              v-if="
                notificationSettings.wakeUp !== null &&
                notificationSettings.bedtime !== null
              "
            >
              {{ notificationStore.wakeUp }} -
              {{ notificationStore.bedtime }}</span
            >
            <span v-else>7:00-23:00</span>
          </p>
        </button>
      </li>
      <li class="flex gap-3 justify-between flex-wrap" v-if="false">
        <text-and-icon>
          <template #icon
            ><bell-icon class="fill-dark w-4 h-4 -mt-0.5"></bell-icon
          ></template>
          <template #text>Dni</template>
        </text-and-icon>
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
    </shadow-list>
    <time-popup
      v-if="isTimePopupOpen"
      @close-popup="toggleTimePopup"
      @save-data="saveData"
      :notification-settings="notificationSettings"
    ></time-popup>
  </settings-layout>
</template>

<script setup>
// Components import
import SettingsLayout from "@/components/SettingsLayout.vue";
import TextAndIcon from "@/components/texts/TextAndIcon.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";
import TimePopup from "@/components/popups/TimePopup.vue";
// ICONS
import BellIcon from "@/components/icons/BellIcon.vue";
import SoundIcon from "../../components/icons/SoundIcon.vue";
import BellRingIcon from "@/components/icons/BellRingIcon.vue";
import ClockIcon from "@/components/icons/ClockIcon.vue";
// Composables import
import {
  useCheckForLogChanges,
  useAddChangeLog,
} from "@/composables/useWatchForValueChange";
import { useRequestForNotificationPermission } from "@/composables/usePushNotifications.js";

import { useProfile } from "@/stores/profile.js";
import { ref } from "vue";
// REFS
const notificationStore = useProfile().user.notifications;
const notificationSettings = ref({ ...notificationStore });
const hasChanges = ref(false);
const changesLog = ref([]);
const isTimePopupOpen = ref(false);
// Methods
const buttonText = (status) => {
  return status ? "Włączone" : "Wyłączone";
};
const toggleStatus = async (name, elID, value) => {
  console.log();
  if (
    Notification.permission === "granted" &&
    notificationSettings.value.active
  ) {
    console.log("Normal toggle");
    notificationSettings.value[name] = !value;
  } else if (Notification.permission === "granted" && name === "active") {
    notificationSettings.value.active = !value;
  } else if (Notification.permission !== "granted" && name === "active") {
    notificationSettings.value.active =
      await useRequestForNotificationPermission();
    saveData();
  } else {
    return;
  }
  watchForValueChange(
    elID,
    notificationSettings.value[name],
    useProfile().user.notifications[name]
  );
};
const saveData = (updatedTime = null) => {
  console.log("Save asd");
  if (updatedTime === null) {
    console.log("Save");
    useProfile().user.notifications = notificationSettings;
    useProfile().updateUserData(useProfile().user);
    resetRefs();
  } else {
    notificationSettings.value.bedtime = updatedTime.bedtime;
    notificationSettings.value.wakeUp = updatedTime.wakeUp;
  }
};
const resetRefs = () => {
  changesLog.value = [];
  notificationSettings.value = { ...useProfile().user.notifications };
  hasChanges.value = false;
};
const watchForValueChange = (elID, newVal, oldVal) => {
  console.log(newVal);
  console.log(oldVal);
  changesLog.value = useAddChangeLog(changesLog.value, elID, newVal, oldVal);
  hasChanges.value = useCheckForLogChanges(changesLog.value);
};
const toggleTimePopup = () => {
  isTimePopupOpen.value = !isTimePopupOpen.value;
};
</script>
<style scoped>
.mask {
  opacity: 0.4;
}
</style>
