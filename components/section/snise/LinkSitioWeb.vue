<template>
  <div class="coming-wrapper">
    <v-container>
      <div class="text-center" width="100%" v-html="enlaces?.descripcion"></div>
    </v-container>  
  </div>
  <!-- <div class="coming-wrapper">
    <v-container>
      <div class="text-center" width="100%">
        <h2 class="coming-title font-weight-bold text-white">
          Visita el sitio oficial del Observatorio
        </h2>
        <div class="mt-8">
          <v-btn
            class="linking bg-white feature2-action-btn mt-sm-0 mt-n5"
            href="https://obscd.mingobierno.gob.bo/"
            target="_blank"
          >
            Visitar<i class="mdi mdi-arrow-right"></i>
          </v-btn>
        </div>
      </div>
    </v-container>
  </div> -->
</template>
<script>
import constants from '@/common/mixins/constants';

const runtimeConfig = useRuntimeConfig();

export default {
  name: "Footer",
  data() {
    return {
      enlaces: null,
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
        const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/parametros/${this.constants.TIPOS_PARAMETROS[9]}`);

        if (rta.data?._rawValue) {
          this.enlaces = rta.data?._rawValue[0];
        }
      } catch (error) {
        console.log('=======================> Error', error);
      };
    },
  },
};
</script>