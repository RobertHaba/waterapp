<template>
  <p class="text-red text-sm"><slot></slot></p>
</template>

<script setup>
const props = defineProps(["validation"]);
</script>
