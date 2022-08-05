<template>
  <nav
    class="fixed bottom-0 w-full h-20 left-1/2 -translate-x-1/2 flex items-center justify-center px-4 bg-light"
  >
    <ul class="flex w-full max-w-sm gap-10 justify-between">
      <DefaultButton class="!bg-light !text-dark" @click="routerGoBack">{{
        buttonText
      }}</DefaultButton>
      <transition-group tag="div" name="fade">
        <DefaultButton
          @click="saveData"
          v-if="props.hasChanges"
          button-type="submit"
          >Zapisz</DefaultButton
        >
      </transition-group>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
const router = useRouter();
const routerGoBack = () => {
  router.back();
};
const props = defineProps({
  hasChanges: Boolean,
});
const emit = defineEmits(['saveData']);
const buttonText = computed(() => {
  return props.hasChanges ? 'Anuluj' : 'Zamknij';
});
const saveData = () => {
  emit('saveData');
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
