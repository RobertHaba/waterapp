<template>
  <FirstConfigLayout
    :stepNumber="1"
    header-title="Potrzebujemy płeć"
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
            :class="{ 'font-bold': activeItem === 'woman' }"
            @click="activeItem = 'woman'"
            input-name="woman"
            >Kobieta</InputRadio
          >
          <span class="w-px h-4 border border-blue-500"></span>
          <InputRadio
            :class="{ 'font-bold': activeItem === 'man' }"
            @click="activeItem = 'man'"
            input-name="man"
            >Mężczyna</InputRadio
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
import FirstConfigLayout from '@/components/FirstConfigLayout.vue';
import HelloIllustration from '@/components/illustrations/Hello.vue';
import InputRadio from '@/components/inputs/InputRadio.vue';
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const router = useRouter();
const user = ref(useUserFirstConfig().user);
const activeItem = ref('man');

const pushDataToStorage = () => {
  user.value.gender = activeItem.value;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: 'weight' });
};
onMounted(() => {
  if (user.value.gender) {
    activeItem.value = user.value.gender;
  }
});
</script>
