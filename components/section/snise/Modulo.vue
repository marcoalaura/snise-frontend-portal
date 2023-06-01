<template>
  <div >
    <div class="formbanner1-component mini-spacer bg-extra-light">
      <v-container>
        <v-select
          v-if="!visible"
          v-model="idModulo"
          label="Módulos"
          :items="modulos"
          item-value="id"
          item-title="nombre"
          @update:modelValue="actualizarModulo()"
        ></v-select>
        <v-card v-if="visible">
          <v-toolbar
            color="gray"
          >
            <v-toolbar-title>{{ modulo }}</v-toolbar-title>
          </v-toolbar>
          <div class="d-flex flex-row">
            <v-tabs
              v-model="tab"
              direction="vertical"
              color="green"
            >
              <v-tab v-if="graficoHabilitado" value="option-1">
                <v-icon start>
                  mdi-monitor-dashboard
                </v-icon>
                Gráficos
              </v-tab>
              <v-tab v-if="mapaHabilitado" value="option-2">
                <v-icon start>
                  mdi-map
                </v-icon>
                Mapas
              </v-tab>
              <v-tab v-if="documentoHabilitado" value="option-3">
                <v-icon start>
                  mdi-file-star
                </v-icon>
                Investigaciones
              </v-tab>
              <v-tab v-if="descargaHabilitado" value="option-4">
                <v-icon start>
                  mdi-download
                </v-icon>
                Descargar datos
              </v-tab>
              <v-tab value="option-5" @click="retornar()">
                <v-icon start>
                  mdi-keyboard-return
                </v-icon>
                Retornar
              </v-tab>
            </v-tabs>
            <v-window v-model="tab" class="overflow-y-auto" style="height: 600px; width: 100%;">
              <v-window-item v-if="graficoHabilitado" value="option-1">
                <v-row>
                  <v-card width="100%">
                    <v-card-title>
                      <v-spacer />
                      <h4 class="text-center"> {{ titulo }} </h4>
                      <v-spacer />
                    </v-card-title>
                  </v-card>
                </v-row>
                <v-row>
                  <v-col cols="12" :md="graficoLinea?.ancho">
                    <Line v-if="graficoLinea?.habilitado" :data="graficoLinea" :options="options" />
                  </v-col>              
                  <v-col v-if="graficoBarra?.habilitado" cols="12" :md="graficoBarra?.ancho">
                    <Bar :data="graficoBarra" :options="options" />
                  </v-col>
                  <v-col v-if="graficoPie?.habilitado" cols="12" :md="graficoPie?.ancho">
                    <Pie :data="graficoPie" :options="options" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-card width="100%" v-if="graficoLinea?.habilitado || graficoBarra?.habilitado || graficoPie?.habilitado">
                    <v-card-title>
                      <v-spacer />
                      <v-label class="text-justify"> <pre>{{ notaPie ? notaPie: '' }}</pre> </v-label>
                      <v-spacer />
                    </v-card-title>
                  </v-card>
                </v-row>
              </v-window-item>
              <v-window-item value="option-2">
                <v-card flat>
                  <v-card-text>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="option-3">
                <v-row>
                  <v-card 
                    v-for="(documento, id) in documentos"
                    v-bind:key="id"
                    width="250px"
                    class="pa-4"
                  >
                    <v-card-text>{{ documento.titulo }}</v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn            
                        @click="downloadDocumento(documento)"
                        class="indigo accent-4 white--text"
                      >
                        <v-icon color="red">mdi-file-pdf</v-icon>
                        <span>Descargar</span>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-row>
              </v-window-item>
            </v-window>
          </div>
        </v-card>
      </v-container>
    </div>
  </div>
</template>
<script>
import constants from '@/common/mixins/constants';
import { Line, Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const runtimeConfig = useRuntimeConfig();

export default {
  name: "Modulo",
  components: { Line, Bar, Pie },
  data() {
    return {
      tab: 'option-1',
      idModulo: null,
      modulo: null,
      modulos: [],
      documentos: [],
      dialogLoading: false,
      graficoLinea: null,
      graficoBarra: null,
      graficoPie: null,
      titulo: null,
      notaPie: null,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        // pointBorderColor: "#2196F3",
        // pointBackgroundColor: "#2196F3",
        // backgroundColor: "#2196F3",
      },
      constants,
      runtimeConfig: runtimeConfig,
    };
  },
  computed: {
    visible() {
      return parseInt(this.idModulo) > 0 ? true : false;
    },
    graficoHabilitado() {
      return this.graficoLinea?.habilitado || this.graficoBarra?.habilitado || this.graficoPie?.habilitado;
    },
    mapaHabilitado() {
      return false;
    },
    documentoHabilitado() {
      return true;
    },
    descargaHabilitado() {
      return true;
    },
  },
  created() {
    this.obtenerModulos();
    this.initialize();
  },
  methods: {
    async obtenerModulos() {
      const rtaMod = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/modulos`);
      if (rtaMod.data?._rawValue) this.modulos = rtaMod.data?._rawValue;
    },
    async actualizarModulo(){
      const modSeleccionado = this.modulos.find(mod => mod.id === this.idModulo);
      this.modulo = modSeleccionado?.nombre;
      localStorage.setItem("fidmodulo", this.idModulo);
      localStorage.setItem("fmodulo", this.modulo);
      this.initialize();
    },
    async initialize() {
      this.graficoLinea = null;
      this.graficoBarra = null;
      this.graficoPie = null;
      this.titulo = null;
      this.notaPie = null;

      this.idModulo = localStorage.getItem("fidmodulo");
      this.modulo = localStorage.getItem("fmodulo");

      if (this.idModulo) {
        try {
          const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/graficos/${this.idModulo}`);
  
          if (rta.data?._rawValue) {
            this.titulo = rta.data?._rawValue?.titulo;
            this.notaPie = rta.data?._rawValue?.nota;
      
            // grafico de serie temporal
            this.graficoLinea = rta.data?._rawValue?.linea;
      
            // grafico de barras
            this.graficoBarra = rta.data?._rawValue?.barra;
      
            // grafico los pies
            this.graficoPie = rta.data?._rawValue?.pie;
          }
        } catch (error) { };

        try {
          let rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/documentos/${this.idModulo}`);
          if (rta.data?._rawValue) {
            this.documentos = rta.data?._rawValue;
          }
        } catch (error) { }
      }
    },
    retornar() {
      localStorage.setItem("fidmodulo", '');
      localStorage.setItem("fmodulo", '');
      this.idModulo = '';
      this.modulo = '';
    },
    async downloadDocumento(item) {
      this.dialogLoading = true;
      try {
        await this.axios({
          method: "get",
          url: "/archivo/documento/" + item.id,
          responseType: "blob",
        }).then(function (response) {
          let fileURL = window.URL.createObjectURL(new Blob([response.data]));
          let fileLink = document.createElement("a");
          const fileExtension = item.file_url.split(".").pop();
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SUIN-documento." + fileExtension);
          document.body.appendChild(fileLink);
          fileLink.click();
        });
        this.dialogLoading = false;
      } catch (error) {
        this.dialogLoading = false;
        this.snackbar = true;
        this.textSnackbar = "Ocurrió un error, intente nuevamente.";
        this.colorSnackbar = "red";
      }
    },
  },
};
</script>
