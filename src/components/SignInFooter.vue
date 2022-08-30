<template>
  <div class="relative flex">
    <span class="h-px w-full bg-blue-100"></span>
    <p
      class="
        absolute
        -top-1/2
        -translate-y-1/2
        left-1/2
        -translate-x-1/2
        bg-white
        px-4
        font-bold
        rounded-full
      "
    >
      lub użyj
    </p>
  </div>
  <div class="flex justify-between">
    <base-button
      class="text-dark"
      classColors="bg-blue-500 shadow-inset-light"
      @click="signInWithGoogle"
    >
      <google-icon class="w-5 h-5"></google-icon> Google</base-button
    >
    <base-button
      class="text-dark"
      classColors="bg-blue-500 shadow-inset-light"
      @click="continueAsGuest"
    >
      <user-icon class="w-5 h-5"></user-icon> Gość</base-button
    >
  </div>
  <footer class="flex justify-between py-5">
    <slot></slot>
  </footer>
  <wave-icon
    class="fixed left-0 h-screen w-screen top-full fill-blue-500"
    :style="wave.transfromStyle"
  ></wave-icon>
</template>

<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import { useAuth } from "@/stores/auth";
import { useWavePosition } from "../stores/wavePosition";
import { useRouter } from "vue-router";
import { useSaveInLocalStorage } from "@/composables/useLocalStorage.js";
import { useGetAppData } from "@/composables/useGetAppData.js";
const router = useRouter();
const wave = useWavePosition();
useWavePosition().updateTransformStyle("transform: translateY(-20%)");
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      useSaveInLocalStorage("isFirebaseAccount", true);
      useGetAppData();
      useAuth().bindUserFromFirebase();
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
const continueAsGuest = () => {
  useAuth().user = "Guest";
  useGetAppData();
  useSaveInLocalStorage("isFirebaseAccount", false);
  useAuth().bindUserFromLocalStorage();
  router.push("/");
};
</script>
