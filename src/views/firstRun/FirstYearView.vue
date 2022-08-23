<template>
  <first-config-layout
    :stepNumber="4"
    header-title="Rok"
    header-text="Dbamy o twoją prywatność, dlatego nie wymagamy Twojej dokładnej daty urodzenia."
  >
    <template v-slot:illustration>
      <birthday-illustration></birthday-illustration>
    </template>
    <template v-slot:form>
      <dynamic-heading :level="2" class="text-xl"
        >Wprowadź swój rok urodzenia</dynamic-heading
      >
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="relative flex gap-4 items-center justify-center max-w-xs">
          <label for="weight" class="sr-only"
            >Wprowadź swój rok urodzenia</label
          >
          <div class="relative">
            <input
              type="number"
              name="weight"
              id="weight"
              v-model="inputValue"
              placeholder="np. 2000"
              min="1850"
              class="border-b border-dark bg-transparent text-dark text-center text-2xl font-bold"
              required
            />
            <span class="absolute right-8 bottom-1">rok</span>
          </div>
        </div>
        <div class="flex justify-center">
          <base-button type="submit">Dalej</base-button>
        </div>
      </form>
      <div class="w-full flex justify-center py-2">
        <router-link
          to="/name"
          class="px-4 py-2"
          @click="
            inputValue = null;
            pushDataToStorage();
          "
          >pomiń</router-link
        >
      </div>
    </template>
  </first-config-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FirstConfigLayout from '@/components/FirstConfigLayout.vue';
import BirthdayIllustration from '../../components/illustrations/BirthdayIllustration.vue';
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const router = useRouter();
const inputValue = ref(null);
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = () => {
  user.value.year = inputValue.value;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: 'name' });
};
onMounted(() => {
  if (user.value.year) {
    inputValue.value = user.value.year;
  }
});
</script>
