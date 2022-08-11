<template>
  <div>
    <button class="w-16 h-10 bg-blue" @click="saveData">save</button>
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
const saveData = () => {
  useUserFirstConfig().settings.drink.goal = useCalcGoal(
    useUserFirstConfig().user
  );
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
};
</script>
