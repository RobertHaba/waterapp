<template>
  <FirstConfigLayout
    :stepNumber="3"
    header-title="Potrzebujemy Aktywność"
    header-text="asd"
  >
    <template v-slot:illustration>
      <HelloIllustration></HelloIllustration>
    </template>
    <template v-slot:form>
      <DynamicHeading :level="2" class="text-xl">Wybierz płeć</DynamicHeading>
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="flex gap-4 items-center">
          <InputRadio
            :class="{ 'font-bold': activeItem === 'low' }"
            @click="activeItem = 'low'"
            input-name="low"
            >mała</InputRadio
          >
          <span class="w-px h-4 border border-blue-500"></span>
          <InputRadio
            :class="{ 'font-bold': activeItem === 'medium' }"
            @click="activeItem = 'medium'"
            input-name="medium"
            >średnia</InputRadio
          >
          <span class="w-px h-4 border border-blue-500"></span>
          <InputRadio
            :class="{ 'font-bold': activeItem === 'high' }"
            @click="activeItem = 'high'"
            input-name="high"
            >wysoka</InputRadio
          >
        </div>
        <div class="flex justify-center">
          <DefaultButton type="submit">Dalej</DefaultButton>
        </div>
      </form>
    </template>
  </FirstConfigLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FirstConfigLayout from '@/components/firstConfig/BaseLayout.vue';
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
