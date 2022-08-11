<template>
  <div class="w-full flex items-center justify-center gap-1">
    <span
      class="border border-dark w-3 h-3 rounded-full transition-all"
      v-for="index in props.numOfSteps"
      :key="index"
      :class="{ 'bg-dark': index <= props.active }"
    ></span>
  </div>
</template>

<script setup>
const props = defineProps({
  numOfSteps: {
    type: Number,
    default: 7,
  },
  active: Number,
});
</script>
