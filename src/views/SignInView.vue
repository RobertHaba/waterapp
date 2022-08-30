<template>
  <base-layout>
    <span class="icon icon--hello h-screen max-h-32"></span>
    <div class="flex flex-col justify-start">
      <p>Witaj ponownie</p>
      <dynamic-heading :level="1" class="w-fit text-3xl"
        >Zaloguj się</dynamic-heading
      >
    </div>
    <form @submit.prevent="handlerForm" class="flex flex-col gap-2">
      <input-email
        v-model:email="user.email.value"
        :has-error="getInputsStatus"
        :form-has-lunched="formHasLunched"
        :error-code="errCode"
      ></input-email>
      <input-password
        v-model:password="user.password.value"
        :has-error="getInputsStatus"
        :form-has-lunched="formHasLunched"
        :error-code="errCode"
      ></input-password>
      <base-button button-type="submit" class="w-full">Zaloguj się</base-button>
    </form>
    <sign-in-footer
      ><p>Nie masz konta?</p>
      <router-link to="/register" class="font-bold text-blue"
        >Zarejestruj się</router-link
      ></sign-in-footer
    >
  </base-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/stores/auth";

import InputEmail from "../components/inputs/InputEmail.vue";
import InputPassword from "../components/inputs/InputPassword.vue";
import SignInFooter from "@/components/SignInFooter.vue";
import { useSaveInLocalStorage } from "@/composables/useLocalStorage.js";
import { useGetAppData } from "@/composables/useGetAppData.js";

import { useWavePosition } from "../stores/wavePosition";

const router = useRouter();
const wave = useWavePosition();
// REFS
const user = ref({
  email: {
    value: "",
    error: null,
  },
  password: {
    value: "",
    error: null,
  },
});
const errCode = ref(null);
const formHasLunched = ref(false);
// METHODS
const getInputsStatus = (input) => {
  if (input.name === "email") {
    user.value.email.error = input.status;
  } else if (input.name === "password") {
    user.value.password.error = input.status;
  }
};
const handlerForm = () => {
  formHasLunched.value = true;
  if (user.value.email.error === false && user.value.password.error === false) {
    signIn();
  }
};

const signIn = () => {
  signInWithEmailAndPassword(
    getAuth(),
    user.value.email.value,
    user.value.password.value
  )
    .then((data) => {
      useSaveInLocalStorage("isFirebaseAccount", true);
      useGetAppData();
      useAuth().bindUserFromFirebase();
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
      errCode.value = err.code;
    });
};
</script>

<style>
.icon--hello {
  background-image: url("../assets/illustrations/hello.svg");
}
</style>
