<template>
  <li class="flex gap-2 flex-col">
    <div class="flex w-full gap-2 justify-between">
      <label class="font-bold text-lg" :for="props.inputId"
        ><slot name="title"></slot
      ></label>
      <div class="flex h-fit">
        <slot></slot>
      </div>
    </div>
    <p class="h-2 text-sm text-red"><slot name="error"></slot></p>
  </li>
</template>

<script setup>
const props = defineProps({
  inputId: String,
});
</script>
