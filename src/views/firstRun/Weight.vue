<template>
  <FirstConfigLayout
    :stepNumber="2"
    header-title="Waga jest potrzebna"
    header-text="asd"
  >
    <template v-slot:illustration>
      <HelloIllustration></HelloIllustration>
    </template>
    <template v-slot:form>
      <DynamicHeading level="2" class="text-xl"
        >Wprowadź swoją wagę</DynamicHeading
      >
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="relative flex gap-4 items-center justify-center max-w-xs">
          <label for="weight" class="sr-only">Wprowadź swoją wagę</label>
          <div class="relative">
            <input
              type="number"
              name="weight"
              id="weight"
              v-model="inputValue"
              max="350"
              class="border-b border-dark bg-transparent text-dark text-center text-2xl font-bold"
            />
            <span class="absolute right-8 bottom-1">kg</span>
          </div>
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
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const router = useRouter();
const inputValue = ref(70);
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = () => {
  user.value.weight = inputValue.value;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: 'activity' });
};

onMounted(() => {
  if (user.value.weight) {
    inputValue.value = user.value.weight;
  }
});
</script>
