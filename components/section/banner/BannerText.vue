<template>
  <div>
    <div class="mini-spacer bg-extra-light">
      <img :src="bannerPrincipal" alt="logo"/>
    </div>
  </div>
</template>
<script>
import BannerPrincipal from '/images/banner/banner-1-obscd.png';
export default {
  name: "BannerText",
  data() {
    return {
      bannerPrincipal: BannerPrincipal,
    };
  },
  methods: {},
};
</script>
