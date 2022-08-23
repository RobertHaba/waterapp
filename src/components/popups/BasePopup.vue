<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen z-50 w-full bg-dark/50 p-4"
    @click="closePopup"
  >
    <div
      class="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-sm"
      @click.stop=""
    >
      <div
        class="
          flex
          items-center
          gap-4
          bg-blue-100
          p-4
          box-border
          rounded-lg
          shadow-lg
        "
      >
        <div class="flex h-16 w-16"><slot name="illustration"></slot></div>
        <div class="flex flex-col w-full gap-2">
          <dynamic-heading class="text-lg leading-none"
            ><slot name="title"></slot
          ></dynamic-heading>
          <div class="text-xs"><slot></slot></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closePopup"]);
const closePopup = () => {
  emit("closePopup");
};
</script>

<style lang="scss" scoped>
</style>