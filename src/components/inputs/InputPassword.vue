<template>
  <div>
    <div class="relative">
      <label
        for=""
        class="absolute px-2 -top-1/2 bg-white translate-y-1/2 ml-4 rounded-full"
        >hasło</label
      >
      <input
        type="password"
        placeholder="Wprowadź hasło"
        :value="props.password"
        @input="$emit('update:password', $event.target.value)"
        class="w-full px-8 py-3 rounded-full border border-dark"
        @keyup="inputValidation"
      />
    </div>
    <div class="h-5">
      <p
        class="text-sm text-red-500"
        v-show="
          (props.formHasLunched && error.status) ||
          (props.formHasLunched && error.status == null)
        "
      >
        {{ error.msg }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  password: String,
  hasError: {
    type: Function,
  },
  formHasLunched: {
    type: Boolean,
  },
  errorCode: String,
});
defineEmits(['update:password']);
const error = ref({ name: 'password', msg: 'Wprowadź hasło', status: null });
const inputValidation = () => {
  if (props.password.length >= 6) {
    error.value.status = false;
    props.hasError(error.value);
  } else {
    error.value.status = true;
    props.hasError(error.value);
    error.value.msg = 'Hasło musi posiadać minimum 6 znaków';
  }
};
const errorFromFirebaseAuth = () => {
  switch (props.errorCode) {
    case 'auth/weak-password':
      error.value.msg = 'Twoje hasło jest za słabe.';
      error.value.status = true;
      break;
    case 'auth/wrong-password':
      error.value.msg = 'Złe hasło';
      error.value.status = true;
      break;
  }
};
watch(
  () => props.errorCode,
  () => errorFromFirebaseAuth()
);
</script>
