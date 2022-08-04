<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-14">
    <div
      class="relative h-full max-w-sm flex flex-col items-center gap-8 mx-auto"
    >
      <header class="w-full flex items-center">
        <ReturnButton></ReturnButton>
        <SteppersProgressDot
          :num-of-steps="steps"
          :active="props.stepNumber"
        ></SteppersProgressDot>
      </header>
      <TitleWithInfo :level="1" class="text-center">
        <template v-slot:title> {{ props.headerTitle }} </template>
        <template v-slot:text> {{ props.headerText }} </template>
      </TitleWithInfo>
      <div>
        <slot name="illustration"> </slot>
      </div>
      <div class="flex flex-col gap-3"><slot name="form"></slot></div>
    </div>
    <MobileWaveSVG
      class="fixed left-0 right-0 top-full transition-all"
      :style="wave.transfromStyle"
    ></MobileWaveSVG>
  </main>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import SteppersProgressDot from '@/components/firstConfig/SteppersProgressDot.vue';
import { useWavePosition } from '@/stores/wavePosition';
const props = defineProps({
  stepNumber: Number,
  headerTitle: String,
  headerText: String,
});
const steps = ref(7);
const stepNumber = ref(props.stepNumber - 1);
const wave = useWavePosition();

const translateValue = computed(() => {
  console.log((100 / steps.value - 3) * stepNumber.value);
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
