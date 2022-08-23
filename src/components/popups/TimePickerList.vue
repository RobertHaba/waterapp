<template>
  <ul
    class="
      relative
      flex flex-col
      max-h-40
      items-center
      overflow-auto
      gap-1
      snap-y
      pr-2
      hide-scroll
    "
    id="startMinute"
  >
    <div class="sticky top-0 w-full min-h-[52px] bg-white/60"></div>
    <li v-for="num in maxNumber" class="text-5xl snap-center" :key="num">
      {{ numberText(num) }}
    </li>
    <div class="sticky bottom-0 w-full min-h-[52px] bg-white/60"></div>
  </ul>
</template>

<script setup>
const props = defineProps({
  maxNumber: {
    type: Number,
  },
});
const numberText = (num) => {
  const newNum = num - 1;
  return newNum < 10 ? "0" + newNum.toString() : newNum;
};
</script>
<style scoped>
.hide-scroll {
  -ms-overflow-style: 1px; /* Internet Explorer 10+ */
  scrollbar-width: 1px; /* Firefox */
}
.hide-scroll::-webkit-scrollbar {
  display: 1px; /* Safari and Chrome */
}
</style>

