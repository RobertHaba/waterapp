<template>
  <base-layout>
    <header class="flex w-full">
      <return-button></return-button>
      <div class="w-[calc(100%-4rem)] flex justify-center items-center">
        <dynamic-heading class="text-2xl"
          ><slot name="title"></slot
        ></dynamic-heading>
      </div>
    </header>

    <form @submit.prevent="saveData">
      <div class="flex flex-col gap-4">
        <slot></slot>
      </div>
      <footer>
        <settings-navbar :has-changes="props.hasChanges"></settings-navbar>
      </footer>
    </form>
  </base-layout>
</template>

<script setup>
import SettingsNavbar from '@/components/SettingsNavbar.vue';
const props = defineProps({
  hasChanges: Boolean,
});
const emit = defineEmits(['saveData']);
const saveData = () => {
  emit('saveData');
};
</script>
