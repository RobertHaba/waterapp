<template>
  <button class="p-2" @click="routerGoBack">
    <ArrowLeftIcon class="icon h-6 w-6"></ArrowLeftIcon>
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  link: {
    default: "",
  },
});
const routerGoBack = () => {
  if (props.link === "") {
    router.back();
  } else {
    router.go(props.link);
  }
};
</script>
