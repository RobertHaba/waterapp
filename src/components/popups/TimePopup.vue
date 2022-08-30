<template>
  <main
    class="
      fixed
      w-full
      min-h-screen
      flex
      justify-center
      items-center
      p-4
      py-10
      pb-28
      left-0
      top-0
      bg-dark/30
      z-30
    "
  >
    <div
      class="
        relative
        h-full
        w-full
        max-w-sm
        flex flex-col
        gap-8
        mx-autu
        bg-light
        rounded-lg
        p-6
        py-8
      "
    >
      <dynamic-heading class="text-2xl"
        ><slot>Ustawienia godzin</slot></dynamic-heading
      >
      <div class="flex flex-col w-full items-center gap-8">
        <dynamic-heading class="w-full">Początek aktywności</dynamic-heading>
        <div class="flex gap-4">
          <time-picker-list id="startHour" :max-number="24"></time-picker-list>
          <span class="flex items-center justify-center text-5xl -mt-2">:</span>
          <time-picker-list
            id="startMinute"
            :max-number="60"
          ></time-picker-list>
        </div>
      </div>
      <div class="flex flex-col w-full items-center gap-8">
        <dynamic-heading class="w-full">Koniec aktywności</dynamic-heading>
        <div class="flex gap-4">
          <time-picker-list id="endHour" :max-number="24"></time-picker-list>
          <span class="flex items-center justify-center text-5xl -mt-2">:</span>
          <time-picker-list id="endMinute" :max-number="60"></time-picker-list>
        </div>
      </div>
      <popup-navbar
        class="relative px-0 h-auto"
        @save-data="saveData"
        @close-popup="closePopup"
        :has-changes="true"
      ></popup-navbar>
    </div>
  </main>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";
import TimePickerList from "./TimePickerList.vue";
import PopupNavbar from "./PopupNavbar.vue";
// Stores
import { useProfile } from "../../stores/profile";
//Emit and props
const emit = defineEmits(["saveData", "closePopup"]);
const props = defineProps(["notificationSettings"]);
//REFS
const timeData = ref({
  startMinute: 0,
  startHour: 7,
  endMinute: 0,
  endHour: 23,
});
const gap = 0;
//metohds

const getChoosenNumber = (el, event) => {
  const wrapper = event.target;
  const numberBoxHeight = wrapper.firstChild.offsetHeight + gap;
  timeData.value[el] = (wrapper.scrollTop / numberBoxHeight).toFixed();
};
const addScrollWatch = (el) => {
  const wrapper = document.querySelector("#" + el);
  scrollToActiveData(wrapper, el);
  wrapper.addEventListener("scroll", (event) => {
    getChoosenNumber(el, event);
  });
};
const removeScrollWatch = (el) => {
  document.querySelector("#" + el).removeEventListener("scroll", () => {
    getChoosenNumber();
  });
};
const saveData = () => {
  const timeActivity = {
    bedtime: timeData.value.endHour + ":" + timeData.value.endMinute,
    wakeUp: timeData.value.startHour + ":" + timeData.value.startMinute,
  };
  useProfile().user.notifications.bedtime = timeActivity.bedtime;
  useProfile().user.notifications.wakeUp = timeActivity.wakeUp;
  useProfile().updateUserData(useProfile().user);
  emit("saveData", timeActivity);
  closePopup();
};
const closePopup = () => {
  emit("closePopup");
};
const loadData = () => {
  const notifications = props.notificationSettings;
  const wakeUp = notifications.wakeUp.split(":");
  const bedtime = notifications.bedtime.split(":");
  timeData.value.startHour = wakeUp[0];
  timeData.value.startMinute = wakeUp[1];
  timeData.value.endHour = bedtime[0];
  timeData.value.endMinute = bedtime[1];
};
const scrollToActiveData = (wrapper, el) => {
  const children = wrapper.children;
  children[Number(timeData.value[el])].scrollIntoView();
};
// Mounted
onMounted(() => {
  loadData();
  addScrollWatch("startMinute");
  addScrollWatch("startHour");
  addScrollWatch("endHour");
  addScrollWatch("endMinute");
});
onBeforeUnmount(() => {
  removeScrollWatch("startMinute");
  removeScrollWatch("startHour");
  removeScrollWatch("endHour");
  removeScrollWatch("endMinute");
});
</script>
