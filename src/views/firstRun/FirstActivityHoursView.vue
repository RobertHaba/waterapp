<template>
  <first-config-layout
    :stepNumber="7"
    header-title="Godziny aktywności"
    header-text="Podaj nam, w jakim przedziale czasowym chciałbyś otrzymywać cogodzinne przypomnienia o nawodnieniu."
  >
    <template v-slot:illustration>
      <time-illustration></time-illustration>
    </template>
    <template v-slot:form>
      <form
        class="flex flex-col gap-8 max-w-xs"
        @submit.prevent="pushDataToStorage"
      >
        <div class="grid grid-cols-2 gap-4 items-center max-w-sm">
          <div class="flex flex-col w-full gap-2">
            <label for="" class="text-center text-xl font-bold">Pobudka</label>
            <input
              type="time"
              name="weight"
              id="weight"
              v-model="hours.wakeUp"
              maxlength=""
              class="border-b border-dark bg-transparent text-dark text-center text-2xl appearance-none w-full px-4"
              required
            />
          </div>
          <div class="flex flex-col w-full gap-2">
            <label for="" class="text-center text-xl font-bold">Sen</label>
            <input
              type="time"
              name="weight"
              id="weight"
              v-model="hours.bedtime"
              class="border-b border-dark bg-transparent text-dark text-center text-2xl appearance-none w-full px-4"
              required
            />
          </div>
        </div>
        <div class="flex justify-center">
          <base-button type="submit">Dalej</base-button>
        </div>
      </form>
      <div class="w-full flex justify-center py-2">
        <router-link to="/finish" class="px-4 py-2">pomiń</router-link>
      </div>
    </template>
  </first-config-layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import FirstConfigLayout from '@/components/FirstConfigLayout.vue';
import TimeIllustration from '@/components/illustrations/TimeIllustration.vue';
import InputRadio from '@/components/inputs/InputRadio.vue';
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const router = useRouter();
const hours = ref({ active: true, wakeUp: '07:00', bedtime: '23:00' });
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = () => {
  if (hours.value.wakeUp === null && hours.value.bedtime === null) {
    return;
  }
  user.value.notifications.wakeUp = hours.value.wakeUp;
  user.value.notifications.bedtime = hours.value.bedtime;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: 'finish' });
};
</script>
