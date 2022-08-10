<template>
  <button
    class="flex gap-2 items-center justify-center bg-blue-500 px-5 py-3 rounded-full shadow-inset-light w-fit h-fit"
    :type="props.type"
  >
    <slot></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
});
</script>
