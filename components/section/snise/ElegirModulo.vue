<template>
  <div>
    <div class="team-component mini-spacer">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center section-title font-weight-medium">
              Seleccione el módulo que desea revisar
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4" sm="6" v-for="modulo in modulos" :key="modulo.id">
            <v-card elevation="0" class="team-card mb-7" @click="seleccionar(modulo)">
              <v-card-title>{{ modulo.nombre }}</v-card-title>
              <div class="social-overlay overflow-hidden">
                <!-- <img :src="`/images/team/narcotrafico.jpg`" :alt="modulo.id" class="img-fluid"/> -->
                <img :src="modulo.urlRemote" :alt="modulo.id" class="img-fluid" />
                <div class="img-overlay">
                  <div>
                    <h5 class="team-title font-weight-medium font-18 mt-5">
                      {{ modulo.nombre }}
                    </h5>
                  </div>
                  <v-divider></v-divider>
                  <p class="text-white" align="justify">{{ modulo.descripcion }}</p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
const runtimeConfig = useRuntimeConfig();

export default {
  name: "ElegirModulo",
  data() {
    return {
      modulos: [],
      runtimeConfig: runtimeConfig,
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/modulos`);

        if (rta.data?._rawValue) {
          this.modulos = rta.data?._rawValue;

          this.modulos.forEach(async (mod) => {
            mod.urlRemote = await this.getImage(mod.url);
          });
        }
      } catch (error) { }
    },
    seleccionar(modulo) {
      localStorage.setItem("fidmodulo", modulo.id);
      localStorage.setItem("fmodulo", modulo.nombre);
      this.$router.push({ name: "modulos" });
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
