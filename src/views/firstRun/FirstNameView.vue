<template>
  <first-config-layout
    :stepNumber="5"
    header-title="Imie jest potrzebna"
    header-text="asd"
  >
    <template v-slot:illustration>
      <hello-illustration></hello-illustration>
    </template>
    <template v-slot:form>
      <dynamic-heading :level="2" class="text-xl"
        >Wprowadź swoją imie
      </dynamic-heading>
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="relative flex gap-4 items-center justify-center max-w-xs">
          <label for="weight" class="sr-only"
            >Wprowadź swoją rok urodzenia</label
          >
          <div class="relative">
            <input
              type="text"
              name="weight"
              id="weight"
              v-model="inputValue"
              minlength="1"
              maxlength="30"
              placeholder="np. Jan"
              class="border-b border-dark bg-transparent text-dark text-center text-2xl font-bold"
              required
            />
          </div>
        </div>
        <div class="flex justify-center">
          <base-button type="submit">Dalej</base-button>
        </div>
      </form>
      <div class="w-full flex justify-center py-2">
        <router-link
          to="/notifications"
          class="px-4 py-2"
          @click="
            inputValue = 'Gość';
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
import HelloIllustration from '../../components/illustrations/Hello.vue';
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const router = useRouter();
const inputValue = ref();
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = () => {
  user.value.name = inputValue.value;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: 'notifications' });
};
onMounted(() => {
  if (user.value.name) {
    inputValue.value = user.value.name;
  }
});
</script>
