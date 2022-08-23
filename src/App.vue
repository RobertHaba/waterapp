
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
    return Array.from({ length: arrayLength }, (v, k) => {
      if (k + start >= 24) {
        k = k - 24;
      }
      return k + start + ":" + suffix;
    });
  };
  const wakeUp = userSettings.value.notifications.wakeUp.split(":");
  const bedtime = userSettings.value.notifications.bedtime.split(":");
  let range = {
    start: parseInt(wakeUp[0]),
    end: parseInt(bedtime[0]),
    suffix: wakeUp[1],
  };
  const arrayLength =
    range.end - range.start > 0
      ? range.end - range.start
      : 24 - (range.start - range.end);
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
      console.log(hourNow);
      if (availableHours.find((avHour) => avHour === hourNow)) {
        sendNotification();
        console.log("Wysłano powiadomienie");
      }
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
