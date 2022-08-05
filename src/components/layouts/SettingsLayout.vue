<template>
  <BaseLayout>
    <header class="flex w-full">
      <ReturnButton></ReturnButton>
      <div class="w-[calc(100%-4rem)] flex justify-center items-center">
        <DynamicHeading class="text-2xl"
          ><slot name="title"></slot
        ></DynamicHeading>
      </div>
    </header>

    <form @submit.prevent="saveData">
      <div class="flex flex-col gap-4">
        <slot></slot>
      </div>
      <footer>
        <NavbarSettings :has-changes="props.hasChanges"></NavbarSettings>
      </footer>
    </form>
  </BaseLayout>
</template>

<script setup>
import NavbarSettings from '@/components/NavbarSettings.vue';
const props = defineProps({
  hasChanges: Boolean,
});
const emit = defineEmits(['saveData']);
const saveData = () => {
  emit('saveData');
};
</script>
