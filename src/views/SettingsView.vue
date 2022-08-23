<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-28">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <dynamic-heading class="text-3xl"></dynamic-heading>
      <div class="relative w-full flex flex-col items-center gap-4 mt-24 mb-8">
        <user-avatar class="w-24 h-24"></user-avatar>
        <p v-if="profile" class="text-2xl font-bold">{{ profile.user.name }}</p>
      </div>
      <div class="relative">
        <ul class="flex flex-col gap-5">
          <li v-for="routerItem in routersList" :key="routerItem.path">
            <router-link
              :to="routerItem.path"
              class="flex justify-between items-center h-10"
            >
              <div class="flex gap-5 items-center">
                <component
                  :is="routerItem.icon"
                  class="w-5 h-5 fill-blue"
                ></component>
                <p class="text-xl font-bold">{{ routerItem.name }}</p>
              </div>
              <ArrowRightIcon class="w-4 h-4 fill-blue"></ArrowRightIcon>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <main-navbar></main-navbar>
  </main>
  <wave-icon
    class="fixed h-screen w-screen top-full transition-all"
    :style="wave.transfromStyle"
  ></wave-icon>
</template>

<script setup>
import BellIcon from "../components/icons/BellIcon.vue";
import ListIcon from "../components/icons/ListIcon.vue";
import InfoIcon from "../components/icons/InfoIcon.vue";
import UserStrokeIcon from "../components/icons/UserStrokeIcon.vue";
import ArrowRightIcon from "../components/icons/ArrowRightIcon.vue";
import { onMounted, ref, shallowRef } from "vue";
import UserAvatar from "../components/TheAvatar.vue";
import MainNavbar from "../components/TheNavbar.vue";
import { useProfile } from "../stores/profile.js";
import { useWavePosition } from "@/stores/wavePosition";
const wave = useWavePosition();
const profile = ref(useProfile());
const routersList = shallowRef([
  {
    icon: UserStrokeIcon,
    name: "Konto",
    path: "/settings/account",
  },
  {
    icon: UserStrokeIcon,
    name: "Ustawienia napojów",
    path: "/settings/drink",
  },
  {
    icon: ListIcon,
    name: "Lista napojów",
    path: "/settings/drinks",
  },
  {
    icon: BellIcon,
    name: "Powiadomienia",
    path: "/settings/notifications",
  },
  {
    icon: InfoIcon,
    name: "Informacje",
    path: "/",
  },
]);
onMounted(() => {
  useWavePosition().updateTransformStyleBy("water");
});
</script>
