<template>
  <base-layout class="flex flex-col items-center">
    <header class="flex w-full">
      <return-button link="/signin"></return-button>
      <div class="w-[calc(100%-4rem)] flex justify-center items-center">
        <dynamic-heading class="text-2xl"
          ><slot name="title"></slot
        ></dynamic-heading>
      </div>
    </header>

    <title-and-description :level="2" class="text-center">
      <template v-slot:title> Dzienna dawka wody </template>
      <template v-slot:text>
        Wylicz dzienne zapotrzebowanie wody dla twojego organizmu
      </template>
    </title-and-description>
    <div class="flex w-full justify-center">
      <mode-illustration class="flex w-48 h-48"></mode-illustration>
    </div>
    <title-and-description :level="2" class="text-center">
      <template v-slot:title> Wprowadź swoje dane </template>
      <template v-slot:text>
        Postępuj dalej zgodnie z instrukcją a wyliczymu za ciebie twoje dzienne
        zapotrzebowanie wody!
      </template>
    </title-and-description>
    <div class="flex flex-col gap-4 items-center">
      <base-button @click="changeRoute" class="w-fit">Zaczynajmy!</base-button>
      <router-link to="/finish" class="px-4 py-2">pomiń</router-link>
    </div>
  </base-layout>
</template>
<script setup>
import ModeIllustration from "@/components/illustrations/ModeIllustration.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const changeRoute = () => {
  router.push({ name: "gender" });
};
</script>