<template>
  <button class="p-2" @click="routerGoBack">
    <ArrowLeftIcon class="icon h-6 w-6"></ArrowLeftIcon>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const routerGoBack = () => {
  router.back();
};
</script>
