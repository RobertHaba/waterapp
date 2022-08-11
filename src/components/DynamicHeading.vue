<template>
  <component :is="`h${$props.level}`" class="font-bold text-dark"
    ><slot>WaterApp</slot></component
  >
</template>

<script setup>
const props = defineProps({
  level: {
    type: Number,
    default: 1,
  },
});
</script>
