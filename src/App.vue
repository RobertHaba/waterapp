
<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { RouterView } from "vue-router";
import { useSendNotification } from "./composables/usePushNotifications.js";
import { useProfile } from "./stores/profile";
const userSettings = ref(useProfile().user);

const getAvailableHours = () => {
  Array.range = (start, end, suffix) => {
    return Array.from(
      { length: end - start },
      (v, k) => k + start + ":" + suffix
    );
  };
  let range = {
    start: parseInt(userSettings.value.notifications.wakeUp.slice(0, 2)),
    end: parseInt(userSettings.value.notifications.bedtime.slice(0, 2)),
    suffix: userSettings.value.notifications.wakeUp.slice(3, 5),
  };
  return Array.range(range.start, range.end, range.suffix);
};

const intervalToSendNotification = () => {
  if (!useProfile().user) {
    return;
  } else if (useProfile().user.notifications.active) {
    const availableHours = getAvailableHours();
    setInterval(() => {
      const date = new Date();
      const hourNow = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      if (availableHours.find((avHour) => avHour === hourNow))
        sendNotification();
    }, 59000);
  }
};

const sendNotification = () => {
  if (!useProfile().user) {
    return;
  } else if (useProfile().user.notifications.active) {
    useSendNotification();
  }
};
intervalToSendNotification();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
