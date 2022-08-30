<template>
  <header class="flex justify-between">
    <dynamic-heading class="w-fit text-3xl"><slot></slot></dynamic-heading>
    <div>
      <user-avatar></user-avatar>
    </div>
  </header>
</template>

<script setup>
import UserAvatar from "@/components/TheAvatar.vue";
</script>