<template>
  <base-layout class="pb-14">
    <span class="icon icon--hello h-screen max-h-32"></span>
    <div class="flex flex-col justify-start">
      <p>Dołącz do nas</p>
      <dynamic-heading :level="1" class="w-fit text-3xl"
        >Utwórz konto</dynamic-heading
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
      <base-button button-type="submit" class="w-full"
        >Zarejestruj się</base-button
      >
    </form>
    <sign-in-footer
      ><p>Posiadasz konto?</p>
      <router-link to="/signin" class="font-bold text-blue"
        >Zaloguj się</router-link
      ></sign-in-footer
    >
  </base-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import InputEmail from "../components/inputs/InputEmail.vue";
import InputPassword from "../components/inputs/InputPassword.vue";
import SignInFooter from "@/components/SignInFooter.vue";
const router = useRouter();
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
    register();
  }
};

const register = () => {
  createUserWithEmailAndPassword(
    getAuth(),
    user.value.email.value,
    user.value.password.value
  )
    .then((data) => {
      router.push("/signin");
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
