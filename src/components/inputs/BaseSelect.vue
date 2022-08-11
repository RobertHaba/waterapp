<template>
  <select
    :value="props.modelValue"
    v-on:input="updateValue($event.target.value)"
  >
    <option
      v-for="option in props.selectOptions"
      :value="option.value"
      :key="option.name"
    >
      {{ option.name }}
    </option>
  </select>
</template>
<script setup>
const props = defineProps({
  selectOptions: Array,
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>
