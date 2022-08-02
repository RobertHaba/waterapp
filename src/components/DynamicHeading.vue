<template>
  <component
    :is="`h${$props.level}`"
    class="w-full text-center font-bold text-dark text-3xl"
    ><slot>WaterApp</slot></component
  >
</template>

<script setup>
const props = defineProps({
  level: String,
});
</script>
