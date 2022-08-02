<template>
  <FirstConfigLayout
    :stepNumber="6"
    header-title=" powiadomienia"
    header-text="asd"
  >
    <template v-slot:illustration>
      <HelloIllustration></HelloIllustration>
    </template>
    <template v-slot:form>
      <DynamicHeading level="2" class="text-xl">Wybierz płeć</DynamicHeading>
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="flex gap-4 items-center">
          <InputRadio
            :class="{ 'font-bold': activeItem === false }"
            @click="activeItem = false"
            input-name="notyficationsOff"
            >wyłączone</InputRadio
          >
          <span class="w-px h-4 border border-dark opacity-60"></span>
          <InputRadio
            :class="{ 'font-bold': activeItem === true }"
            @click="activeItem = true"
            input-name="notyficationsOn"
            >włączone</InputRadio
          >
        </div>
        <div class="flex justify-center">
          <DefaultButton type="submit">Dalej</DefaultButton>
        </div>
      </form>
      <div class="w-full flex justify-center py-2">
        <router-link to="/finish" class="px-4 py-2">pomiń</router-link>
      </div>
    </template>
  </FirstConfigLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FirstConfigLayout from '@/components/FirstConfigLayout.vue';
import HelloIllustration from '@/components/illustrations/Hello.vue';
import InputRadio from '@/components/inputs/InputRadio.vue';
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const router = useRouter();
const activeItem = ref(true);
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = () => {
  user.value.notifications.active = activeItem.value;
  useUserFirstConfig().updateUserData(user.value);
  if (activeItem.value) {
    router.push({ name: 'activityHours' });
  } else {
    router.push({ name: 'finish' });
  }
};
</script>
