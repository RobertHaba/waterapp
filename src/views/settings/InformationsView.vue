<template>
  <settings-layout>
    <template #title>Informacje</template>
    <shadow-list>
      <li class="flex flex-col gap-1">
        <text-and-icon
          ><template #icon
            ><code-icon class="flex fill-dark w-4 h-4"></code-icon></template
          ><template #text>Wykonanie:</template></text-and-icon
        >
        <a href="https://www.linkedin.com/in/hapka/">Robert Hapka</a>
      </li>
      <li class="flex flex-col gap-1">
        <text-and-icon
          ><template #icon
            ><design-icon class="flex fill-dark w-4 h-4"></design-icon></template
          ><template #text>Projekt:</template></text-and-icon
        >
        <div class="flex flex-col">
          <a href="https://www.linkedin.com/in/hapka/">Robert Hapka</a>
          <a href="https://www.linkedin.com/in/robert-hamerski-31a19621b/"
            >Robert Hamerski</a
          >
        </div>
      </li>
    </shadow-list></settings-layout
  >
</template>

<script setup>
import SettingsLayout from "../../components/SettingsLayout.vue";
import TextAndIcon from "../../components/texts/TextAndIcon.vue";
import CodeIcon from "@/components/icons/CodeIcon.vue";
import DesignIcon from "@/components/icons/DesignIcon.vue";
</script>

<style lang="scss" scoped>
</style>