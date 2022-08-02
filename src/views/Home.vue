<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-14">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
      <header class="flex justify-between">
        <DynamicHeading class="w-fit"></DynamicHeading>
        <div>
          <button type="button">
            <span
              class="icon bg-blue-500 w-10 h-10 rounded-full icon--avatar"
              :style="avatarURL"
            ></span>
          </button>
        </div>
      </header>
      <div>
        <TitleWithInfo>
          <template #title>Świetnie Ci idzie!</template>
          <template #text
            >Utrzymuj takie tempo, a Twoje nawodnienie będzie na idealnym
            poziomie.</template
          >
        </TitleWithInfo>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useAuth } from '@/stores/auth';
import { computed } from 'vue';

const avatarURL = computed(() => {
  return useAuth().user.photoURL
    ? `background-image: url(${useAuth().user.photoURL})`
    : '';
});
</script>
