<template>
  <main class="relative w-full min-h-screen p-4 py-10 pb-14">
    <div class="relative h-full max-w-sm flex flex-col gap-8 mx-auto">
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
        <base-button button-type="submit" class="w-full"
          >Zaloguj się</base-button
        >
      </form>
      <div class="relative flex">
        <span class="h-px w-full bg-blue-100"></span>
        <p
          class="absolute -top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-4 font-bold rounded-full"
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
        <p>Nie masz konta?</p>
        <router-link to="/register" class="font-bold text-blue"
          >Zarejestruj się</router-link
        >
      </footer>
    </div>
    <wave-icon
      class="fixed left-0 right-0 top-full -translate-y-24"
    ></wave-icon>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useAuth } from '@/stores/auth';
import InputEmail from '../components/inputs/InputEmail.vue';
import InputPassword from '../components/inputs/InputPassword.vue';
import GoogleIcon from '../components/icons/GoogleIcon.vue';
import UserIcon from '../components/icons/UserIcon.vue';
const router = useRouter();

const user = ref({
  email: {
    value: '',
    error: null,
  },
  password: {
    value: '',
    error: null,
  },
});
const errCode = ref(null);
const formHasLunched = ref(false);
const getInputsStatus = (input) => {
  if (input.name === 'email') {
    user.value.email.error = input.status;
  } else if (input.name === 'password') {
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
      router.push('/');
    })
    .catch((err) => {
      console.log(err);
      errCode.value = err.code;
    });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((res) => {
      router.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
};
const continueAsGuest = () => {
  useAuth().user = 'Guest';
  router.push('/');
};
</script>

<style>
.icon--hello {
  background-image: url('../assets/illustrations/hello.svg');
}
</style>
