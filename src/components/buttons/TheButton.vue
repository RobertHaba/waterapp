<template>
  <button
    :type="props.buttonType"
    class="px-8 py-3 font-bold rounded-full text-lg flex gap-3 items-center justify-center"
    :class="props.classColors"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  buttonType: {
    type: String,
    default: 'button',
  },
  classColors: {
    type: String,
    default: 'text-light bg-blue',
  },
});
</script>
