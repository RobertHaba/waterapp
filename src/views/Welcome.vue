<script setup></script>

<template>
  <main
    class="relative w-full h-screen max-h-screen overflow-hidden p-4 py-10 pb-32"
  >
    <div class="h-full max-w-sm flex flex-col justify-between mx-auto">
      <header><DynamicHeading level="1"></DynamicHeading></header>
      <div class="flex flex-col gap-4">
        <span class="icon w-auto h-screen max-h-64 icon--hello"></span>
        <TitleWithInfo class="mx-auto text-center">
          <template v-slot:title>Zadbaj o swoje nawodnienie</template>
          <template v-slot:text>
            Utrzymuj takie tempo, a Twoje nawodnienie będzie na idealnym
            poziomie.
          </template>
        </TitleWithInfo>
      </div>
      <footer class="flex justify-center">
        <ButtonAsLink text="Zaczynajmy" link="/register"></ButtonAsLink>
      </footer>
    </div>
    <MobileWaveSVG
      class="absolute -z-10 left-0 w-full h-auto top-[calc(100%-5rem)]"
    ></MobileWaveSVG>
  </main>
</template>
<style>
.icon--hello {
  background-image: url('../assets/illustrations/hello.svg');
}
</style>
