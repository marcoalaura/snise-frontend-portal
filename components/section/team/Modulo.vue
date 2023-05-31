<template>
  <div>
    <div class="formbanner1-component mini-spacer bg-extra-light">
      <v-container>
        <v-card>
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
              <v-tab value="option-1">
                <v-icon start>
                  mdi-monitor-dashboard
                </v-icon>
                Gráficos
              </v-tab>
              <v-tab value="option-2">
                <v-icon start>
                  mdi-map
                </v-icon>
                Mapas
              </v-tab>
              <v-tab value="option-3">
                <v-icon start>
                  mdi-file-star
                </v-icon>
                Investigaciones
              </v-tab>
              <v-tab value="option-4">
                <v-icon start>
                  mdi-download
                </v-icon>
                Descargar datos
              </v-tab>
            </v-tabs>
            <v-window v-model="tab" style="min-height: 500px;">
              <v-window-item value="option-1">
                <v-row>
                  <v-col v-if="graficoLinea?.habilitado" cols="12" :md="graficoLinea?.ancho">
                    <Line :data="graficoLinea" :options="options" />
                  </v-col>
                <!--
                  <v-col v-if="graficoBarra?.habilitado" cols="12" :md="graficoBarra?.ancho">
                    <Bar :data="graficoBarra" :options="options" />
                  </v-col>
                  <v-col v-if="graficoPie?.habilitado" cols="12" :md="graficoPie?.ancho">
                    <Pie :data="graficoPie" :options="options" />
                  </v-col> -->
                </v-row>
              </v-window-item>
              <v-window-item value="option-2">
                <v-card flat>
                  <v-card-text>
                    <p>
                      Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                    </p>

                    <p>
                      Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                    </p>

                    <p>
                      Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                    </p>

                    <p>
                      Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                    </p>

                    <p class="mb-0">
                      Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                    </p>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="option-3">
                <v-card flat>
                  <v-card-text>
                    <p>
                      Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                    </p>

                    <p class="mb-0">
                      Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                    </p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </div>
        </v-card>
      </v-container>
    </div>
  </div>
</template>
<script>
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

export default {
  name: "Modulo",
  components: { Line },
  data() {
    return {
      tab: 'option-1',
      idModulo: null,
      modulo: null,
      graficoLinea: null,
      graficoBarra: null,
      graficoPie: null,
      titulo: null,
      notaPie: null,
      // Line: Line,
      // Bar: Bar,
      // Pie: Pie,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        // pointBorderColor: "#2196F3",
        // pointBackgroundColor: "#2196F3",
        // backgroundColor: "#2196F3",
      },
      modulos: [
        {
          img: "tratatrafico.jpg",
          title: "Trata y tráfico de personas",
          desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        },
        {
          img: "narcotrafico.jpg",
          title: "Narcotráfico",
          desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        },
        {
          img: "sustancias.jpg",
          title: "Venta de sustancias controladas",
          desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        },
      ]
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.graficoLinea = null;
      this.graficoBarra = null;
      this.graficoPie = null;
      this.titulo = null;
      this.notaPie = null;

      this.idModulo = localStorage.getItem("fidmodulo");
      this.modulo = localStorage.getItem("fmodulo");

      this.graficoLinea = {
        habilitado: true,
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      };

      // let rta = await this.axios.get("/repositorio/graficos/" + idModulo);
      // console.log('========================> rta', rta);
      // if (rta) {
      //   this.titulo = rta.data?.titulo;
      //   this.notaPie = rta.data?.nota;
  
      //   // grafico de serie temporal
      //   this.graficoLinea = rta.data?.linea;
  
      //   // grafico de barras
      //   this.graficoBarra = rta.data?.barra;
  
      //   // grafico los pies
      //   this.graficoPie = rta.data?.pie;
      // }
    }
  },
};
</script>
