<template>
  <div
    class="fixed top-0 left-0 w-full h-screen flex justify-center items-center p-4 bg-black/50 z-20"
  >
    <div
      class="realitve w-full max-w-sm flex flex-col gap-8 bg-light p-6 shadow-lg rounded-lg"
    >
      <div class="w-full flex justify-center">
        <forms-illustration></forms-illustration>
      </div>
      <div class="flex flex-col gap-4">
        <dynamic-heading :level="2" class="text-lg">
          Twoje dane zostały zmienione, czy chcesz wyliczyć nowe zapotrzebowanie
          płynów?
        </dynamic-heading>
        <ul>
          <li>
            <p>
              Ustawione zapotrzebowanie:
              <span class="font-bold"
                >{{ useSettings().settings.water.goal }}ml</span
              >
            </p>
          </li>
          <li>
            <p>
              Nowe wyliczone zapotrzebowanie:
              <span class="font-bold">{{ useCalcGoal() }}ml</span>
            </p>
          </li>
        </ul>
      </div>
      <popup-navbar
        class="relative px-0"
        @close-popup="closePopup"
        @save-data="saveData"
        :has-changes="true"
      >
        <template #close>Nie</template>
        <template #save>Tak</template>
      </popup-navbar>
    </div>
  </div>
</template>

<script setup>
import FormsIllustration from '@/components/illustrations/FormsIllustration.vue';
import PopupNavbar from './PopupNavbar.vue';
import { useSettings } from '@/stores/settings';
import { useCalcGoal } from '@/composables/useCalcDrinkGoal';

const emit = defineEmits(['closePopup', 'saveData']);

const closePopup = () => {
  emit('closePopup');
};
const saveData = () => {
  emit('saveData');
};
</script>
