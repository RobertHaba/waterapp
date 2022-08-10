<template>
  <first-config-layout
    :stepNumber="3"
    header-title="Potrzebujemy Aktywność"
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
            :class="{ 'font-bold': activeItem === 'low' }"
            @click="activeItem = 'low'"
            input-name="low"
            >mała</input-radio
          >
          <span class="w-px h-4 border border-blue-500"></span>
          <input-radio
            :class="{ 'font-bold': activeItem === 'medium' }"
            @click="activeItem = 'medium'"
            input-name="medium"
            >średnia</input-radio
          >
          <span class="w-px h-4 border border-blue-500"></span>
          <input-radio
            :class="{ 'font-bold': activeItem === 'high' }"
            @click="activeItem = 'high'"
            input-name="high"
            >wysoka</input-radio
          >
        </div>
        <div class="flex justify-center">
          <base-button type="submit">Dalej</base-button>
        </div>
      </form>
    </template>
  </first-config-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FirstConfigLayout from '@/components/FirstConfigLayout.vue';
import HelloIllustration from '@/components/illustrations/Hello.vue';
import InputRadio from '@/components/inputs/InputRadio.vue';
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const router = useRouter();
const activeItem = ref('medium');
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = () => {
  user.value.activity = activeItem.value;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: 'year' });
};
onMounted(() => {
  if (user.value.activity) {
    activeItem.value = user.value.activity;
  }
});
</script>
