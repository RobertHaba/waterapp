<template>
  <button type="button" class="flex w-10 h-10">
    <span
      class="icon rounded-full w-full h-full icon--avatar border border-dark"
      :style="avatarURL"
    ></span>
  </button>
</template>

<script setup>

import { computed } from 'vue';
import { useAuth } from '../stores/auth.js';
const avatarURL = computed(() => {
  return useAuth().user.photoURL
    ? `background-image: url(${useAuth().user.photoURL})`
    : '';
});
</script>

<style lang="scss" scoped></style>
