<template>
  <div>
    <div class="mini-spacer bg-extra-light">
      <img :src="bannerPrincipal" alt="logo"/>
    </div>
  </div>
</template>
<script>
import BannerPrincipal from '/images/banner/banner-1-obscd.jpg';
export default {
  name: "Banner",
  data() {
    return {
      bannerPrincipal: BannerPrincipal,
    };
  },
  methods: {},
};
</script>
