<template>
  <li class="flex items-center justify-center w-20 h-12 rounded-full">
    <router-link
      :to="props.path"
      class="flex items-center justify-center w-full h-full"
      :aria-label="props.label"
      ><slot></slot
    ></router-link>
  </li>
</template>

<script setup>
const props = defineProps({
  label: String,
  path: String,
});
</script>
