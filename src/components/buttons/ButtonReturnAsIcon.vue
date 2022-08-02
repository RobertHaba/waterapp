<template>
  <button class="p-2" @click="routerGoBack">
    <ArrowLeftSVG class="icon h-6 w-6"></ArrowLeftSVG>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const routerGoBack = () => {
  router.back();
};
</script>
