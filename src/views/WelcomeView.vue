<script setup></script>

<template>
  <main
    class="relative w-full h-screen max-h-screen overflow-hidden p-4 py-10 pb-32"
  >
    <div class="h-full max-w-sm flex flex-col justify-between mx-auto">
      <header class="w-full">
        <dynamic-heading
          :level="1"
          class="text-center text-3xl"
        ></dynamic-heading>
      </header>
      <div class="flex flex-col gap-4">
        <span class="icon w-auto h-screen max-h-64 icon--hello"></span>
        <title-and-description class="mx-auto text-center">
          <template v-slot:title>Zadbaj o swoje nawodnienie</template>
          <template v-slot:text>
            Utrzymuj takie tempo, a Twoje nawodnienie będzie na idealnym
            poziomie.
          </template>
        </title-and-description>
      </div>
      <footer class="flex justify-center">
        <router-link
          to="/register"
          class="px-8 py-3 font-bold bg-blue text-light rounded-full text-lg"
        >
          Zaczynajmy
        </router-link>
      </footer>
    </div>
    <wave-icon
      class="absolute -z-10 left-0 w-full h-auto top-[calc(100%-5rem)]"
    ></wave-icon>
  </main>
</template>
<style>
.icon--hello {
  background-image: url('../assets/illustrations/hello.svg');
}
</style>
