<template>
  <first-config-layout
    :stepNumber="1"
    header-title="Płeć"
    header-text="Wprowadzenie prawidłowej płci pomoże nam w dokładniejszym obliczeniu dziennego zapotrzebowania wody."
  >
    <template v-slot:illustration>
      <gender-illustration></gender-illustration>
    </template>
    <template v-slot:form>
      <dynamic-heading :level="2" class="text-xl text-center">Wybierz płeć</dynamic-heading>
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="flex gap-4 items-center">
          <input-radio
            :class="{ 'font-bold': activeItem === 'woman' }"
            @click="activeItem = 'woman'"
            input-name="woman"
            >Kobieta</input-radio
          >
          <span class="w-px h-4 border border-blue-500"></span>
          <input-radio
            :class="{ 'font-bold': activeItem === 'man' }"
            @click="activeItem = 'man'"
            input-name="man"
            >Mężczyna</input-radio
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import FirstConfigLayout from "@/components/FirstConfigLayout.vue";
import GenderIllustration from "@/components/illustrations/GenderIllustration.vue";
import InputRadio from "@/components/inputs/InputRadio.vue";
import { useUserFirstConfig } from "@/stores/userFirstConfig";
const router = useRouter();
const user = ref(useUserFirstConfig().user);
const activeItem = ref("man");

const pushDataToStorage = () => {
  user.value.gender = activeItem.value;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: "weight" });
};
onMounted(() => {
  if (user.value.gender) {
    activeItem.value = user.value.gender;
  }
});
</script>
