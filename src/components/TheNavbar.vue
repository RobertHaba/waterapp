<template>
  <nav
    class="
      fixed
      bottom-0
      w-full
      h-16
      left-1/2
      -translate-x-1/2
      flex
      items-center
      justify-center
    "
    :class="activeRouterName === 'drinkApp' ? 'bg-orange-100' : 'bg-blue-100'"
  >
    <ul class="flex w-full max-w-sm gap-10 justify-center">
      <navbar-list-item
        :class="activeRouterName === 'stats' ? 'shadow-inset-light' : ''"
        label="Przejdź do statystyk"
        path="/"
      >
        <chart-icon class="w-6 h-6 fill-dark"></chart-icon>
      </navbar-list-item>
      <navbar-list-item
        :class="activeRouterName === 'home' ? 'shadow-inset-light' : ''"
        label="Przejdź do strony głównej"
        path="/"
      >
        <home-icon class="w-6 h-6 fill-dark"></home-icon>
      </navbar-list-item>
      <navbar-list-item
        :class="activeRouterName === 'drinkApp' ? 'shadow-inset-light' : ''"
        label="Przejdź do strony głównej"
        path="/drink"
      >
        <bottle-icon class="w-6 h-6 fill-dark"></bottle-icon>
      </navbar-list-item>

      <navbar-list-item
        :class="activeRouterName === 'settings' ? 'shadow-inset-light' : ''"
        label="Przejdź do ustawień"
        path="/settings"
      >
        <settings-icon class="w-6 h-6 fill-dark"></settings-icon>
      </navbar-list-item>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavbarListItem from "./NavbarListItem.vue";
/* Icons */

import HomeIcon from "./icons/HomeIcon.vue";
import ChartIcon from "./icons/ChartIcon.vue";
import SettingsIcon from "./icons/SettingsIcon.vue";
import BottleIcon from "./icons/BottleIcon.vue";

const router = useRouter();
const activeRouterName = ref(router.currentRoute.value.name);
</script>
