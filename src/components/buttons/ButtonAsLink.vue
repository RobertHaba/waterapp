<template>
  <router-link :to="props.link" class="px-8 py-3 font-bold bg-blue text-light rounded-full text-lg">
    {{ props.text }}
  </router-link>
</template>

<script setup>
const props = defineProps({
  text: String,
  link: {
    type: String,
    default: "/"
  }
})
</script>
