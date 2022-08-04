<template>
  <nav
    class="fixed bottom-0 w-full h-20 left-1/2 -translate-x-1/2 flex items-center justify-center px-4"
  >
    <ul class="flex w-full max-w-sm gap-10 justify-between">
      <DefaultButton class="!bg-light !text-dark" @click="routerGoBack"
        >Anuluj</DefaultButton
      >
      <DefaultButton @click="saveData">Zapisz</DefaultButton>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const routerGoBack = () => {
  router.back();
};
const emit = defineEmits('saveData');
const saveData = () => {
  emit('saveData');
};
</script>
