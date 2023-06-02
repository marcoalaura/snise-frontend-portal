<script setup lang="ts">
const title = ref("SNISE");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - OBSCD`
      : "SNISE";
  },
});
</script>

<template>
  <v-app dark>
    <!-- <LcHeader/> -->
    <v-main>
      <slot />  
    </v-main>
    <LcFooter/>
  </v-app>
</template>
