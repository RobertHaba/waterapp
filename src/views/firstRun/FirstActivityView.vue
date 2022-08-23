<template>
  <first-config-layout
    :stepNumber="3"
    header-title="Aktywność"
    header-text="Postaraj się prawidłowo ocenić swoją aktywność. Różnica pomiędzy małą, a wysoką aktywnością wynosi prawie 1000ml."
  >
    <template v-slot:illustration>
      <sport-illustration></sport-illustration>
    </template>
    <template v-slot:form>
      <dynamic-heading :level="2" class="text-xl text-center">Wybierz płeć</dynamic-heading>
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="flex gap-4 items-center">
          <input-radio
            :class="{ 'font-bold': activeItem === 'low' }"
            @click="activeItem = 'low'"
            input-name="low"
            >mała</input-radio
          >
          <span class="w-px h-4 border border-dark opacity-60"></span>
          <input-radio
            :class="{ 'font-bold': activeItem === 'medium' }"
            @click="activeItem = 'medium'"
            input-name="medium"
            >średnia</input-radio
          >
          <span class="w-px h-4 border border-dark opacity-60"></span>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import FirstConfigLayout from "@/components/FirstConfigLayout.vue";
import SportIllustration from "@/components/illustrations/SportIllustration.vue";
import InputRadio from "@/components/inputs/InputRadio.vue";
import { useUserFirstConfig } from "@/stores/userFirstConfig";
const router = useRouter();
const activeItem = ref("medium");
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = () => {
  user.value.activity = activeItem.value;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: "year" });
};
onMounted(() => {
  if (user.value.activity) {
    activeItem.value = user.value.activity;
  }
});
</script>
