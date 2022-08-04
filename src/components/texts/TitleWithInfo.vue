<template>
  <div class="flex flex-col w-full max-w-xs">
    <DynamicHeading class="text-2xl" :level="props.level"
      ><slot name="title"></slot
    ></DynamicHeading>
    <p class="text-dark"><slot name="text"></slot></p>
  </div>
</template>

<script setup>
const props = defineProps({
  level: {
    type: Number,
    default: 2,
  },
});
</script>

<style lang="scss" scoped></style>
