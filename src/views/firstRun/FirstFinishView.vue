<template>
  <div>
    <a class="w-16 h-10 bg-blue" @click="saveData">Zapisz dane</a>
  </div>
</template>

<script setup>
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firestore/index";
import { useAuth } from "@/stores/auth";
import { useSettings } from "@/stores/settings";
import { useUserFirstConfig } from "@/stores/userFirstConfig";
import { useCalcGoal } from "@/composables/useCalcDrinkGoal.js";
import { useSaveInLocalStorage } from "@/composables/useLocalStorage.js";
import { useToday } from "@/composables/useDate.js";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
// Variable
const router = useRouter();
// Methods
const saveData = () => {
  if (useUserFirstConfig().user.weight) {
    const calculatedGoal = useCalcGoal(useUserFirstConfig().user);
    useUserFirstConfig().settings.water.goal = calculatedGoal;
    useUserFirstConfig().settings.drink.goal = calculatedGoal;
  }
  if (useAuth().token !== null) {
    saveToDB();
    return;
  }
  saveInLocalStorage();
};
const saveToDB = async () => {
  await setDoc(
    doc(db, useAuth().user.uid, "profile"),
    useUserFirstConfig().user
  );
  await setDoc(
    doc(db, useAuth().user.uid, "settings"),
    useUserFirstConfig().settings
  );
  await useSettings().setChangeInGoalHistoryDB(
    useUserFirstConfig().settings.drink.goal
  );
  await router.push({ name: "home" });
};
const saveInLocalStorage = () => {
  useSaveInLocalStorage("user", { name: useUserFirstConfig().user.name });
  useSaveInLocalStorage("profile", useUserFirstConfig().user);
  useSaveInLocalStorage("settings", useUserFirstConfig().settings);
  useSaveInLocalStorage("goalHistory", [
    {
      [useToday()]: {
        total: 0,
        goal: useUserFirstConfig().settings.drink.goal,
      },
    },
  ]);
  router.push({ name: "home" });
};
onMounted(() => {
  saveData();
});
</script>
