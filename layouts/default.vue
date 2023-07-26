<script setup lang="ts">
const title = ref("YUPANA");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - OBSCD`
      : "YUPANA";
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
