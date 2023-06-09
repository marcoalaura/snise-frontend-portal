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
          <v-toolbar-title>Resultado de la búsqueda...</v-toolbar-title>
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-subheader>Descargas</v-list-subheader>
          <v-list-item
            v-for="(item, i) in descargas"
            :key="i"
            :value="item"
            color="primary"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-downloads"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
          <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          lines="two"
          subheader
        >
          <v-list-subheader>Documentos</v-list-subheader>
          <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
          <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
  <v-container>
    <v-text-field v-model="searchVal" @keydown.enter="buscar">
      <template v-slot:label>
        <span>
          Buscar datos o investigaciones <v-icon icon="mdi-file-find"></v-icon>
        </span>
      </template>
    </v-text-field>
  </v-container>
</template>
<script>
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
      runtimeConfig: runtimeConfig,
    };
  },
  created() {
    // this.initialize();
  },
  methods: {
    async initialize() {
      
    },
    async buscar () {
      this.dialog = true;
      try {
        const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/busqueda/descargas`);

        if (rta.data?._rawValue) {
          this.descargas = rta.data?._rawValue;
        }
      } catch (error) { }
    }
  },
};
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
