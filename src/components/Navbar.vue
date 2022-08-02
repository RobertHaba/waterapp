<template>
  <nav
    class="fixed bottom-0 w-full h-20 left-1/2 -translate-x-1/2 flex items-center justify-center bg-blue-100"
  >
    <ul class="flex w-full max-w-sm gap-10 justify-center">
      <NavbarItem
        :class="activeRouterName === 'stats' ? 'shadow-inset-light' : ''"
        label="Przejdź do statystyk"
        path="/"
      >
        <ChartIcon class="w-6 h-6 fill-dark"></ChartIcon>
      </NavbarItem>
      <NavbarItem
        :class="activeRouterName === 'home' ? 'shadow-inset-light' : ''"
        label="Przejdź do strony głównej"
        path="/"
      >
        <WaterDropIcon class="w-6 h-6 fill-dark"></WaterDropIcon>
      </NavbarItem>

      <NavbarItem
        :class="activeRouterName === 'settings' ? 'shadow-inset-light' : ''"
        label="Przejdź do ustawień"
        path="/"
      >
        <ChartIcon class="w-6 h-6 fill-dark"></ChartIcon>
      </NavbarItem>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ChartIcon from './icons/Chart.vue';
import NavbarItem from './icons/NavbarItem.vue';
import WaterDropIcon from './icons/WaterDrop.vue';

const router = useRouter();
const activeRouterName = ref(router.currentRoute.value.name);
</script>
