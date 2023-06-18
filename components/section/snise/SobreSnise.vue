<template>
  <div>
    <div class="formbanner1-component mini-spacer bg-extra-light">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" lg="5" class="d-flex align-center">
            <div class="text-center text-sm-left">
              <div class="text-center text-sm-left" v-html="sobreSnise?.descripcion"></div>
            </div>
          </v-col>
          <v-col cols="12" sm="5" lg="6" class="ml-auto">
            <!-- <img src="/images/form-banner/quienesSomos.jpg" alt="banner" class="img-fluid"/> -->
            <img :src="urlRemote" alt="banner" class="img-fluid" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import constants from '@/common/mixins/constants';

const runtimeConfig = useRuntimeConfig();

export default {
  name: "SobreSnise",
  data() {
    return {
      sobreSnise: null,
      urlRemote: null,
      constants,
      runtimeConfig: runtimeConfig,
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/parametros/${this.constants.TIPOS_PARAMETROS[0]}`);

        if (rta.data?._rawValue) {
          this.sobreSnise = rta.data?._rawValue[0];
          this.urlRemote = await this.getImage(this.sobreSnise.url);
        }
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
