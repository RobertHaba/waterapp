<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-28">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <DynamicHeading></DynamicHeading>
      <div class="relative w-full flex flex-col items-center gap-4 mt-24 mb-8">
        <Avatar class="w-24 h-24"></Avatar>
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
    <Navbar></Navbar>
  </main>
</template>

<script setup>
import BellIcon from '../components/icons/Bell.vue';
import UserStrokeIcon from '../components/icons/UserStroke.vue';
import ArrowRightIcon from '../components/icons/ArrowRight.vue';
import { ref, shallowRef } from 'vue';
import Avatar from '../components/TheAvatar.vue';
import Navbar from '../components/TheNavbar.vue';
import { useProfile } from '../stores/profile.js';
const profile = ref(useProfile());
const routersList = shallowRef([
  {
    icon: BellIcon,
    name: 'Powiadomienia',
    path: '/',
  },
  {
    icon: UserStrokeIcon,
    name: 'Konto',
    path: '/',
  },
  {
    icon: UserStrokeIcon,
    name: 'Ustawienia napojów',
    path: '/settings/drink',
  },
  {
    icon: UserStrokeIcon,
    name: 'Lista napojów',
    path: '/',
  },
  {
    icon: UserStrokeIcon,
    name: 'Informacje',
    path: '/',
  },
]);
</script>
