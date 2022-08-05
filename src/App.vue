<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
