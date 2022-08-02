<template>
  <label :for="props.inputName" class="text-2xl transition-all cursor-pointer">
    <input
      type="radio"
      :name="props.inputName"
      :id="props.inputName"
      class="appearance-none" />
    <slot></slot
  ></label>
</template>

<script setup>
const props = defineProps({
  inputName: String,
});
</script>
