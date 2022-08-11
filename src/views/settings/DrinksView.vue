<template>
  <settings-layout :has-changes="hasChanges" @save-data="saveData">
    <template #title>Napoje</template>
    <shadow-list class="gap-6"></shadow-list
  ></settings-layout>
</template>

<script setup>
import SettingsLayout from '@/components/SettingsLayout.vue';
import ShadowListItem from '@/components/ShadowListItem.vue';
</script>
