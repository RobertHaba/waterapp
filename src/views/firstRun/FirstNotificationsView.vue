<template>
  <first-config-layout
    :stepNumber="6"
    header-title=" powiadomienia"
    header-text="asd"
  >
    <template v-slot:illustration>
      <hello-illustration></hello-illustration>
    </template>
    <template v-slot:form>
      <dynamic-heading :level="2" class="text-xl">Wybierz płeć</dynamic-heading>
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="flex gap-4 items-center">
          <input-radio
            :class="{ 'font-bold': activeItem === false }"
            @click="activeItem = false"
            input-name="notyficationsOff"
            >wyłączone</input-radio
          >
          <span class="w-px h-4 border border-dark opacity-60"></span>
          <input-radio
            :class="{ 'font-bold': activeItem === true }"
            @click="activeItem = true"
            input-name="notyficationsOn"
            >włączone</input-radio
          >
        </div>
        <div class="flex justify-center">
          <base-button type="submit">Dalej</base-button>
        </div>
      </form>
      <div class="w-full flex justify-center py-2">
        <router-link to="/finish" class="px-4 py-2">pomiń</router-link>
      </div>
    </template>
  </first-config-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FirstConfigLayout from "@/components/FirstConfigLayout.vue";
import HelloIllustration from "@/components/illustrations/Hello.vue";
import InputRadio from "@/components/inputs/InputRadio.vue";
import { useUserFirstConfig } from "@/stores/userFirstConfig";

import { useRequestForNotificationPermission } from "@/composables/usePushNotifications.js";
const router = useRouter();
const activeItem = ref(true);
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = async () => {
  user.value.notifications.active = activeItem.value
    ? await useRequestForNotificationPermission()
    : false;
  useUserFirstConfig().updateUserData(user.value);
  if (user.value.notifications.active) {
    router.push({ name: "activityHours" });
  } else {
    router.push({ name: "finish" });
  }
};
</script>
