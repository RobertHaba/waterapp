<template>
  <SettingsLayout :has-changes="hasChanges" @save-data="saveData">
    <template #title>Napoje</template>
    <ListInsetShadow class="gap-6"></ListInsetShadow
  ></SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';
import AccountListItem from '@/components/layouts/AccountListItem.vue';
</script>
