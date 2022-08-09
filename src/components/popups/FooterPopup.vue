<template>
  <nav
    class="fixed bottom-0 w-full h-20 left-1/2 -translate-x-1/2 flex items-center justify-center px-4"
  >
    <ul class="flex w-full max-w-sm gap-10 justify-between">
      <DefaultButton class="!bg-light !text-dark" @click="closePopup"
        ><slot name="close">Anuluj</slot></DefaultButton
      >
      <DefaultButton @click="saveData"
        ><slot name="save">Zapisz</slot></DefaultButton
      >
    </ul>
  </nav>
</template>

<script setup>
const emit = defineEmits(['saveData', 'closePopup']);
const closePopup = () => {
  emit('closePopup');
};
const saveData = () => {
  emit('saveData');
};
</script>
