<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-14">
    <div
      class="relative h-full max-w-sm flex flex-col items-center gap-8 mx-auto"
    >
      <header class="w-full flex items-center">
        <return-button></return-button>
        <first-config-progress
          :num-of-steps="steps"
          :active="props.stepNumber"
        ></first-config-progress>
      </header>
      <title-and-description :level="1" class="text-center">
        <template v-slot:title> {{ props.headerTitle }} </template>
        <template v-slot:text> {{ props.headerText }} </template>
      </title-and-description>
      <div class="flex w-48 h-48">
        <slot name="illustration" class="flex w-48 h-48"> </slot>
      </div>
      <div class="flex flex-col gap-3"><slot name="form"></slot></div>
    </div>
    <wave-icon
      class="fixed left-0 h-screen w-screen top-full fill-blue-500"
      :style="wave.transfromStyle"
    ></wave-icon>
  </main>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import FirstConfigProgress from "@/components/FirstConfigProgress.vue";
import { useWavePosition } from "@/stores/wavePosition";
const props = defineProps({
  stepNumber: Number,
  headerTitle: String,
  headerText: String,
});
const steps = ref(7);
const stepNumber = ref(props.stepNumber - 1);
const wave = useWavePosition();

const translateValue = computed(() => {
  return (100 / steps.value - 3) * stepNumber.value;
});
const translateY = computed(() => {
  return `transform: translateY(-${translateValue.value}%)`;
});
onMounted(() => {
  setTimeout(() => {
    stepNumber.value += 1;
    wave.updateTransformStyle(translateY.value);
  }, 300);
});
</script>
