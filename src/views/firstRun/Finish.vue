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
import { useCalcGoal } from '@/composables/calcDrinkGoal.js';
const saveToDB = async () => {
  useUserFirstConfig().settings.drink.goal = useCalcGoal(
    useUserFirstConfig().user
  );
  await setDoc(
    doc(db, useAuth().user.uid, 'profile'),
    useUserFirstConfig().user
  );
  await setDoc(
    doc(db, useAuth().user.uid, 'settings'),
    useUserFirstConfig().settings
  );
  await setDoc(
    doc(db, useAuth().user.uid, 'drink'),
    useUserFirstConfig().drink
  );
};
</script>

<style lang="scss" scoped></style>
