<template>
  <div >
    <div class="formbanner1-component mini-spacer bg-extra-light">
      <v-container>
        <h4 class="mb-5" v-if="!visible">Seleccione el módulo que desea revisar</h4>
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
          <div>
            <v-tabs
              v-model="tab"
              direction="horizontal"
              color="blue"
              grow
            >
              <v-tab v-if="graficoHabilitado" value="option-1">
                <v-icon start>
                  mdi-monitor-dashboard
                </v-icon>
                <div class="d-none d-sm-block">Gráficos</div>
              </v-tab>
              <v-tab v-if="mapaHabilitado" value="option-2">
                <v-icon start>
                  mdi-map
                </v-icon>
                <div class="d-none d-sm-block">Mapas</div>
              </v-tab>
              <v-tab v-if="documentoHabilitado" value="option-3">
                <v-icon start>
                  mdi-file-star
                </v-icon>
                <div class="d-none d-sm-block">Investigaciones</div>
              </v-tab>
              <v-tab v-if="descargaHabilitado" value="option-4">
                <v-icon start>
                  mdi-download
                </v-icon>
                <div class="d-none d-sm-block">Descargar datos</div>
              </v-tab>
              <v-tab value="option-5" @click="retornar()">
                <v-icon start>
                  mdi-keyboard-return
                </v-icon>
                <div class="d-none d-sm-block">Otros módulos</div>
              </v-tab>
            </v-tabs>
            <v-window v-model="tab" class="overflow-y-auto" style="height: 650px; width: 100%;">
              <v-window-item v-if="graficoHabilitado" value="option-1">
                <v-row>
                  <v-card width="100%">
                    <v-card-text>
                      <v-spacer />
                      <h2 class="text-center"> {{ titulo }} </h2>
                      <v-spacer />
                    </v-card-text>
                  </v-card>
                </v-row>
                <v-row>
                  <v-col cols="12" :md="graficoLinea?.ancho">
                    <!-- <h3 class="text-center"> {{ graficoLinea?.titulo }} </h3> -->
                    <Line v-if="graficoLinea?.habilitado" :data="graficoLinea" :options="options" />
                  </v-col>   
                  <v-col v-if="graficoPie?.habilitado" cols="12" :md="graficoPie?.ancho">
                    <!-- <h3 class="text-center"> {{ graficoPie?.titulo }} </h3> -->
                    <Pie :data="graficoPie" :options="options" />
                  </v-col>           
                  <v-col v-if="graficoBarra?.habilitado" cols="12" :md="graficoBarra?.ancho">
                    <!-- <h3 class="text-center"> {{ graficoBarra?.titulo }} </h3> -->
                    <Bar :data="graficoBarra" :options="options" />
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
                <v-row>
                  <v-card width="100%" v-if="graficoMapa?.habilitado">
                    <v-card-text>
                      <v-spacer />
                      <h2 class="text-center"> {{ titulo }} </h2>
                      <v-spacer />
                    </v-card-text>
                  </v-card>
                </v-row>
                <v-row>
                  <v-col v-if="graficoMapa?.habilitado" cols="12" :md="graficoMapa?.ancho">
                    <v-card height="500" class="leaflet-container">
                      <h2 class="text-center"> {{ graficoMapa?.titulo }} </h2>
                      <div id="map" ref="mapElement"></div>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-card width="100%" v-if="graficoMapa?.habilitado">
                    <v-card-title>
                      <v-spacer />
                      <v-label class="text-justify"> <pre>{{ notaPie ? notaPie: '' }}</pre> </v-label>
                      <v-spacer />
                    </v-card-title>
                  </v-card>
                </v-row>
              </v-window-item>
              <v-window-item value="option-3">
                <v-row>
                  <v-card width="100%">
                    <v-card-text>
                      <h2 class="text-center"> Documentos de investigacion </h2>
                    </v-card-text>
                  </v-card>
                </v-row>
                <v-row>
                  <v-card 
                    v-for="(documento, id) in documentos"
                    v-bind:key="id"
                    color="light-green"
                    width="200px"
                    class="ma-4"
                  >
                    <v-img
                      src="/images/banner/banner-superior.png"
                      height="15px" width="100%"
                    >
                    </v-img>
                    <v-card-text>{{ documento.titulo }}</v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn            
                        @click="downloadDocumento(documento)"
                        class="indigo accent-4 white--text"
                      >
                      <v-icon color="red">mdi-file-pdf-box</v-icon>
                        <span>Descargar</span>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-row>
              </v-window-item>
              <v-window-item value="option-4">
                <v-row>
                  <v-card width="100%">
                    <v-card-text>
                      <h2 class="text-center"> Seleccione la información que desea descargar</h2>
                    </v-card-text>
                  </v-card>
                </v-row>
                <br><br>
                <v-row >
                    <v-expansion-panels 
                    variant="accordion"
                    v-model="panel">
                      <v-expansion-panel>
                        <v-expansion-panel-title>Descargar Datos</v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-card 
                            width="80%" 
                            v-for="(descarga, id) in descargas"
                            v-bind:key="id"
                            flat
                          ><v-btn
                              class="ma-2"
                              color="green"
                              icon="mdi-file-excel"
                              @click="downloadDescarga(descarga)"
                              outlined
                              tile
                            ></v-btn>
                              {{ descarga.titulo }}
                          </v-card>
                        </v-expansion-panel-text>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-title>Consultar otros datos</v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-form ref="descargaForm">
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <p>Usted puede generar su propia descarga según sus necesidades. Para ello, debe realizar lo siguiente:</p>
                                </v-row>
                                <v-row>
                                  <div class="ml-4">
                                    <ul>
                                      <li>Seleccionar un conjunto de datos.</li>
                                      <li>Indicar la variable que irá como "columna".</li>
                                      <li>Indicar la variable que irá como "fila".</li>
                                      <li>Hacer clic en el botón "Generar Archivo".</li>
                                    </ul>
                                  </div>
                                </v-row>
                                <v-row>
                                  <v-select
                                    v-model="editedItem.idConfDataset"
                                    label="Conjunto de datos"
                                    :items="datasets"
                                    item-value="id"
                                    item-title="descripcion"
                                    :rules="rules"
                                    @update:modelValue="actualizarAtributos()"
                                  ></v-select>
                                  <v-select
                                      v-model="editedItem.configuracion.valor"
                                      label="Valor"
                                      :items="datasets"
                                      item-value="nombre_metrica"
                                      item-text="nombre_metrica"
                                      disabled
                                      :rules="rules"
                                      class="ml-2"
                                    ></v-select>
                                </v-row>
                                <v-row>
                                    <v-select
                                      v-model="editedItem.configuracion.varx"
                                      label="Columnas"
                                      :items="atributos"
                                      item-value="nombre"
                                      item-title="nombre"
                                      :rules="rules"
                                    ></v-select>
                                    <v-select
                                      v-model="editedItem.configuracion.vary"
                                      label="Filas"
                                      :items="atributos"
                                      item-value="nombre"
                                      item-title="nombre"
                                      :rules="rules"
                                      class="ml-2"
                                    ></v-select>                                  
                                </v-row>
                                <v-row>
                                  <v-btn @click="downloadConsulta()" color="blue">
                                    Generar Archivo
                                  </v-btn>
                                </v-row>
                              </v-container>
                            </v-card-text>
                          </v-form>
                        </v-expansion-panel-text>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-title>¿No encuentras lo que necesitas?</v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-form ref="solicitarForm">
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <p>Si no encontró la información que necesita, puede enviarnos un mensaje, le solicitamos que nos pueda proporcionar:</p>
                                </v-row>
                                <v-row>
                                  <div class="ml-4">
                                    <ul>
                                      <li>Su nombre y apellido.</li>
                                      <li>Un correo electrónico para que podamos responderle.</li>
                                      <li>La solicitud de datos detallando los datos y variables, el periodo del que se requiere la información y la finalidad con la que se utilizará la información.</li>
                                      <li>Hacer clic en el botón "Enviar solicitud".</li>
                                    </ul>
                                  </div>
                                </v-row>
                                <v-row>
                                  <v-text-field label="Nombre" prepend-inner-icon="mdi-account"></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-text-field label="Correo electrónico" prepend-inner-icon="mdi-email"></v-text-field>
                                </v-row>
                                <v-row>
                                  <v-textarea label="Solicitud de datos"></v-textarea>
                                </v-row>
                                <v-row>
                                  <v-btn @click="enviarSolicitud" color="blue">
                                    Enviar solicitud
                                  </v-btn>
                                </v-row>
                              </v-container>
                            </v-card-text>
                          </v-form>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                </v-row>

              </v-window-item>
            </v-window>
          </div>
        </v-card>
      </v-container>
    </div>
  </div>
  <v-container>
    <div>
      <v-snackbar v-model="snackbar">
        {{ textSnackbar }}
        <template v-slot:actions>
          <v-btn
            :color="colorSnackbar"
            variant="text"
            @click="snackbar = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>
<script>
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import { deptosData } from "@/data/bo-deptos.js";

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

const info = L.control();
// get color related in 100 percent
function getColor(d) {
  return d > 100 ? '#800026' :
    d > 81  ? '#BD0026' :
    d > 65  ? '#E31A1C' :
    d > 49  ? '#FC4E2A' :
    d > 33   ? '#FD8D3C' :
    d > 17   ? '#FEB24C' :
    d > 1   ? '#FED976' : '#FFEDA0';
}

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.value),
  };
}

function highlightFeature(e) {
  const layer = e.target;

  layer.bringToFront();

  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

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
      descargas: [],
      graficoLinea: null,
      graficoBarra: null,
      graficoPie: null,
      graficoMapa: null,
      titulo: null,
      notaPie: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // pointBorderColor: "#2196F3",
        // pointBackgroundColor: "#2196F3",
        // backgroundColor: "#2196F3",
      },
      snackbar: false,
      textSnackbar: "",
      colorSnackbar: "",
      constants,
      deptosData,
      info,
      runtimeConfig: runtimeConfig,
      
      panel: [0],
      rules: [(value) => !!value || "Requerido"],
      datasets: [],
      atributos: [],
      editedIndex: -1,
      editedItem: {
        idModulo: null,
        idConfDataset: null,
        titulo: "",
        restringido: false,
        configuracion: {
          tabla: null,
          valor: null,
          varx: null,
          vary: null,
        },
        fileUrl: null,
      },
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
      return this.graficoMapa?.habilitado;
    },
    documentoHabilitado() {
      return this.documentos.length > 0;
    },
    descargaHabilitado() {
      return this.descargas.length > 0;
    },
  },
  created() {
    this.obtenerModulos();
  },
  mounted() {
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

    async actualizarAtributos(){
      try {

        await this.limpiarConf();
        // Variable y seleccionar
        const datasetSeleccionado = this.datasets.find(dataset => dataset.id === this.editedItem.idConfDataset);
        this.editedItem.configuracion.valor = datasetSeleccionado.metrica_nombre;
        this.editedItem.configuracion.tabla = datasetSeleccionado.tabla;
        console.log(this.editedItem.idConfDataset)

        if (this.editedItem.idConfDataset){
          const atributos = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/datasets/atributos/${this.editedItem.idConfDataset}`);
          this.atributos = atributos.data ? atributos.data : [];
          console.log(this.atributos)
        }

      } catch (error) {}
    },

    async limpiarConf() {
      this.editedItem.configuracion.tabla = '';
      this.editedItem.configuracion.valor = '';
      this.editedItem.configuracion.varx = '';
      this.editedItem.configuracion.vary = '';
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

        // Grafica del mapa
        try {
          this.graficoMapa = null;
          this.titulo = null;
          this.notaPie = null;

          const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/mapas/${this.idModulo}`);

          if (rta.data?._rawValue) {
            this.titulo = rta.data?._rawValue.titulo;
            this.notaPie = rta.data?._rawValue.nota;

            // grafico de mapa
            this.graficoMapa = rta.data?._rawValue.mapa;
          
            if (this.graficoMapa?.habilitado) {
              this.$nextTick(() => {
            
                var baseLayer = L.tileLayer(
                  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  {
                    attribution:
                      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                    maxZoom: 12,
                  }
                );
      
                var map = new L.Map(this.$refs["mapElement"], {
                  center: new L.LatLng(-16.2835167, -63.5493712), //ubicacion bolivia
                  zoom: 6,
                  layers: [baseLayer],
                });

                // Información de la selección
                info.onAdd = function (map) {
                  this._div = L.DomUtil.create('div', 'info');
                  this.update();
                  return this._div;
                };

                info.update = function (props) {
                  const contents = props ? `<b>${props.NOM_DEP}</b><br />${ props.DESCRIP }` : 'Seleccione un departamento';
                  this._div.innerHTML = `${contents}`;
                };

                info.addTo(map);

                deptosData.features.forEach((d) => {
                  const dep = this.graficoMapa?.datos.find(m => m[2] === d.properties.COD_DEP);
                  d.properties.DESCRIP = dep ? dep[1] : '';
                  d.properties.value = dep ? dep[3] : '';
                });

                L.geoJson(deptosData, {
                  style,
                  onEachFeature
                }).addTo(map);

              });
            }
          }
            
        } catch (e) {
          console.log('========================> e', e);
        }

        // documentos
        try {
          let rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/documentos/${this.idModulo}`);
          if (rta.data?._rawValue) {
            this.documentos = rta.data?._rawValue;
          }
        } catch (error) { }

        // descargas datos
        try {
          let rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/descargas/${this.idModulo}`);
          if (rta.data?._rawValue) {
            this.descargas = rta.data?._rawValue;
          }
        } catch (error) { }

        // crear descarga
        try {
          let rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/datasets/${this.idModulo}`);
          if (rta.data?._rawValue) {
            this.datasets = rta.data?._rawValue;
            console.log(this.datasets)
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
      try {
        await fetch(`${this.runtimeConfig?.public?.apiBase}publico/archivo-documento/${item.id}`)
          .then((response) => response.blob())
          .then((responseBlob) => {
          let fileURL = window.URL.createObjectURL(new Blob([responseBlob]));
          let fileLink = document.createElement("a");
          const fileExtension = item.file_url.split(".").pop();
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SUIN-documento." + fileExtension);
          document.body.appendChild(fileLink);
          fileLink.click();
        });
      } catch (error) {
        console.log('========================> error', error);
        this.snackbar = true;
        this.textSnackbar = "Ocurrió un error, intente nuevamente.";
        this.colorSnackbar = "red";
      }
    },
    async downloadDescarga(item) {
      try {
        await fetch(`${this.runtimeConfig?.public?.apiBase}publico/archivo-descarga/${item.id}`)
          .then((response) => response.blob())
          .then((responseBlob) => {
          let fileURL = window.URL.createObjectURL(new Blob([responseBlob]));
          let fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SUIN-descarga.xlsx");
          document.body.appendChild(fileLink);
          fileLink.click();
        });
      } catch (error) {
        this.snackbar = true;
        this.textSnackbar = "Ocurrió un error, intente nuevamente.";
        this.colorSnackbar = "red";
      }
    },

    async downloadConsulta(){
      
      try {
        console.log(this.editedItem)
        let consulta = this.editedItem;
        const settings = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ consulta }),
        };

        console.log("descargar consulta....")
        await fetch(`${this.runtimeConfig?.public?.apiBase}publico/archivo-consulta`, settings)
          .then((response) => response.blob())
          .then((responseBlob) => {
          let fileURL = window.URL.createObjectURL(new Blob([responseBlob]));
          let fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SUIN-descarga.xlsx");
          document.body.appendChild(fileLink);
          fileLink.click();
        });
      } catch(error){
        console.log("salio errror")
        console.log(error)
      }
    },

    async enviarSolicitud(){
      try {

      } catch(error){}
    },
  },
};
</script>
<style lang="css">
#map {
  height: 100%;
}
.leaflet-container {
  background: rgb(255, 255, 255) !important;
  box-shadow: none;
}
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;
}
</style>
