<template>
  <div>
    <!-- <div class="mini-spacer bg-extra-light">
      <img :src="bannerPrincipal" alt="logo"/>
    </div> -->
    <v-carousel
      cycle 
      :interval="constants.intervaloBannerMS"
      show-arrows="hover"
      hide-delimiter-background >
      <v-carousel-item
        v-for="(banner, i) in banners"
        :key="i"
        :src="banner.urlRemoto"
        cover >
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-center text-sm-left" v-html="banner?.descripcion"></div>
          </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import constants from '@/common/mixins/constants';

const runtimeConfig = useRuntimeConfig();

export default {
  name: "Banner",
  data() {
    return {
      banners: [],
      constants,
      runtimeConfig: runtimeConfig,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        this.$nextTick(async() => {
          const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/parametros/${this.constants.TIPOS_PARAMETROS[1]}`);
          this.banners = rta.data?._rawValue;

          this.banners.forEach(async (banner) => {
            banner.urlRemoto = await this.getImage(banner.url);
          });
        });
        console.log('========================> this.banners', this.banners);
      } catch (error) {
        console.log('=======================> Error', error);
      };
    },
    async getImage(url) {
      try {
        const settings = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        };
        const result = await fetch(`${this.runtimeConfig?.public?.apiBase}publico/archivo-image`, settings)
          .then((response) => {
          return response.arrayBuffer();
        });
        if (result) {
          const b64 = btoa(String.fromCharCode(...new Uint8Array(result)));
          const imgData = "data:image/jpeg;base64," + b64;
          return imgData;
        }
        return null;
      } catch (error) {
        console.log('========================> error', error);
        this.snackbar = true;
        this.textSnackbar = "Ocurrió un error, intente nuevamente.";
        this.colorSnackbar = "red";
      }
    },
  },
};
</script>
