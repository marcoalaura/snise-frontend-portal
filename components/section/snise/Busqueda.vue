<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          class="bg-green"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Resultado de la búsqueda: {{ totalBusqueda }} resultados para "{{ searchVal }}"</v-toolbar-title>
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-subheader>Documentos</v-list-subheader>
          <v-list-item
            v-for="(documento, i) in documentos"
            :key="i"
            :value="documento"
            @click="downloadDocumento(documento)"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-file-pdf-box"></v-icon>
            </template>
            <v-list-item-title v-text="documento.nombre"></v-list-item-title>
            <v-list-item-subtitle v-text="documento.titulo"></v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          lines="two"
          subheader
        >
          <v-list-subheader>Descargas</v-list-subheader>
          <v-list-item
            v-for="(descarga, i) in descargas"
            :key="i"
            :value="descarga"
            @click="downloadDescarga(descarga)"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-file-excel"></v-icon>
            </template>
            <v-list-item-title v-text="descarga.nombre"></v-list-item-title>
            <v-list-item-subtitle v-text="descarga.titulo"></v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row>
      <v-container class="mt-10 row justify-content-md-center">
        <v-responsive
        class="mx-auto pt-2"
        max-width="600">
          <v-text-field 
          v-model="searchVal" 
          @keyup.enter="buscar"
          prepend-inner-icon="mdi-magnify"
          variant="outlined">
            <template v-slot:label>
              <span>
                Buscar datos o investigaciones
              </span>
            </template>
          </v-text-field>
        </v-responsive>
      </v-container>
</v-row>
  <v-container v-if="snackbar">
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
  </v-container>
</template>
<script>
import constants from '@/common/mixins/constants';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const runtimeConfig = useRuntimeConfig();

export default {
  name: "Busqueda",
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      searchVal: '',
      descargas: [],
      documentos: [],
      snackbar: false,
      textSnackbar: "",
      colorSnackbar: "",
      constants,
      runtimeConfig: runtimeConfig,
    };
  },
  computed: {
    totalBusqueda() {
      return this.descargas.length + this.documentos.length;
    },
  },
  methods: {
    async buscar () {
      if (this.searchVal.length > this.constants.numeroMinimoBusqueda) {
        try {
          const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/busqueda-descargas/${this.searchVal}`);
          if (rta.data?._rawValue) {
            this.descargas = rta.data?._rawValue;
          }
        } catch (error) { }

        try {
          const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/busqueda-documentos/${this.searchVal}`);
          if (rta.data?._rawValue) {
            this.documentos = rta.data?._rawValue;
          }
        } catch (error) { }

        if (this.totalBusqueda > 0) {
          this.dialog = true;
        } else {
          new swal({
            title: `No se ha encontrado ninguna búsqueda para: "${this.searchVal}".`,
            buttonsStyling: true,
            confirmButtonColor: "rgb(67,150,145)",
            color: 'gray',
            confirmButtonClass: 'btn btn-success btn-fill',
            confirmButtonText: 'Aceptar'
          });
        }
      } else {
        new swal({
          title: `Debe ingresar más de ${this.constants.numeroMinimoBusqueda} caracteres para la búsqueda.`,
          buttonsStyling: true,
          confirmButtonColor: "rgb(67,150,145)",
          color: 'gray',
          confirmButtonClass: 'btn btn-success btn-fill',
          confirmButtonText: 'Aceptar'
        });
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
  },
};
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
