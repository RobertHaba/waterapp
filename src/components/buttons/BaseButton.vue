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
    default: 'text-light bg-blue shadow',
  },
});
</script>
<style scoped>
.shadow {
  box-shadow: inset 0px 0px 12px rgba(42, 47, 180, 0.3);
}
.shadow-light {
  box-shadow: inset 0px 0px 12px rgba(42, 47, 180, 0.3);
}
</style>
