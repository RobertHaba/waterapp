<template>
  <div>
    <div class="relative">
      <label
        for=""
        class="absolute px-2 -top-1/2 bg-white rounded-full translate-y-1/2 ml-4"
        >e-mail</label
      >
      <input
        type="email"
        placeholder="Wprowadź hasło"
        :value="props.email"
        @input="$emit('update:email', $event.target.value)"
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
  email: {
    type: String,
  },
  hasError: {
    type: Function,
  },
  formHasLunched: {
    type: Boolean,
  },
  errorCode: {
    type: String,
  },
});
defineEmits(['update:email']);
const error = ref({ name: 'email', msg: 'Podaj adres email.', status: null });

const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const inputValidation = () => {
  if (regex.test(props.email)) {
    error.value.status = false;
    props.hasError(error.value);
  } else if (props.email) {
    error.value.status = true;
    props.hasError(error.value);

    error.value.msg = 'Wprowadź poprawny adres email';
  } else {
    error.value.status = true;
    props.hasError(error.value);

    error.value.msg = 'Podaj adres email.';
  }
};
const errorFromFirebaseAuth = () => {
  switch (props.errorCode) {
    case 'auth/email-already-in-use':
      error.value.msg = 'Adres email jest już w użyciu.';
      error.value.status = true;
      break;
    case 'auth/invalid-email':
      error.value.msg = 'Wprowadź poprawny adres email ex. nazwa@poczta.pl';
      error.value.status = true;
      break;
    case 'auth/user-not-found':
      error.value.msg =
        'Konto nie istnieje. Sprawdź adres email lub utwórz konto';
      error.value.status = true;
      break;
  }
};
watch(
  () => props.errorCode,
  () => errorFromFirebaseAuth()
);
</script>
