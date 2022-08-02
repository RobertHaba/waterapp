<template>
  <div>
    <router-link to="/app">a</router-link>
    <button @click="saveToDB">save</button>
  </div>
</template>

<script setup>
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firestore/index';
import { useAuth } from '@/stores/auth';
import { useUserFirstConfig } from '@/stores/userFirstConfig';
const saveToDB = async () => {
  await setDoc(
    doc(db, useAuth().user.uid, 'profile'),
    useUserFirstConfig().user
  );
};
</script>

<style lang="scss" scoped></style>
