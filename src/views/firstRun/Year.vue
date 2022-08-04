<template>
  <FirstConfigLayout
    :stepNumber="4"
    header-title="Rok jest potrzebna"
    header-text="asd"
  >
    <template v-slot:illustration>
      <HelloIllustration></HelloIllustration>
    </template>
    <template v-slot:form>
      <DynamicHeading :level="2" class="text-xl"
        >Wprowadź swoją rok urodzenia</DynamicHeading
      >
      <form class="flex flex-col gap-8" @submit.prevent="pushDataToStorage">
        <div class="relative flex gap-4 items-center justify-center max-w-xs">
          <label for="weight" class="sr-only"
            >Wprowadź swoją rok urodzenia</label
          >
          <div class="relative">
            <input
              type="number"
              name="weight"
              id="weight"
              v-model="inputValue"
              placeholder="np. 2000"
              min="1850"
              class="border-b border-dark bg-transparent text-dark text-center text-2xl font-bold"
              required
            />
            <span class="absolute right-8 bottom-1">rok</span>
          </div>
        </div>
        <div class="flex justify-center">
          <DefaultButton type="submit">Dalej</DefaultButton>
        </div>
      </form>
      <div class="w-full flex justify-center py-2">
        <router-link
          to="/name"
          class="px-4 py-2"
          @click="
            inputValue = null;
            pushDataToStorage();
          "
          >pomiń</router-link
        >
      </div>
    </template>
  </FirstConfigLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FirstConfigLayout from '@/components/firstConfig/BaseLayout.vue';
import HelloIllustration from '../../components/illustrations/Hello.vue';
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const router = useRouter();
const inputValue = ref(null);
const user = ref(useUserFirstConfig().user);

const pushDataToStorage = () => {
  user.value.year = inputValue.value;
  useUserFirstConfig().updateUserData(user.value);
  router.push({ name: 'name' });
};
onMounted(() => {
  if (user.value.year) {
    inputValue.value = user.value.year;
  }
});
</script>
