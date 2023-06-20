<template>
  <div>
    <v-app-bar app class="app-header position-relative bg-green header2" flat>
      <v-container class="py-0 fill-height">
        <v-toolbar>
        <!-- Logo -->
        <div class="logo" style="margin-right: 20%">
          <v-btn
              class="btn px-6 bg-white ml-2 d-md-flex d-none"
              flat
            >
            <img :src="urlLogoMinisterio" alt="Logo Ministerio" />
          </v-btn>
        </div>
        <!-- Desktop view Navigation -->
        <div class="justify-center align-center">
          <ul class="navbar-nav d-flex" min-height="auto">
            <li
              class="nav-item"
              v-for="nav in headerMenu"
              :key="nav.title"
              text
            >
              <NuxtLink
                :to="nav.href"
                class="nav-link"
                >{{ nav.title }}</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div
          class="navigation ml-auto"
          v-bind:class="[isActive ? 'd-block' : '']"
          @click="isActive = !isActive"
        >
          </div>
          <!-- login-regiter -->
          <v-btn
            class="btn px-6 bg-white ml-2 d-md-flex d-none"
            flat
          >
          <img :src="urlLogoObservatorio" alt="Logo Observaorio"/>
          </v-btn>
          <v-app-bar-nav-icon
            width="30"
            class="d-md-none d-sm-flex drawer-icon text-white ml-auto  mr-0"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-toolbar>
      </v-container>
    </v-app-bar>
  </div>
  <div class="nav2">
    <v-navigation-drawer color="white" v-model="drawer" temporary>
      <div
        class="navigation"
        v-bind:class="[isActive ? 'd-block' : '']"
        @click="isActive = !isActive"
      >
        <ul class="navbar-nav py-4" min-height="auto">
          <li class="nav-item  mb-3" v-for="nav in headerMenu" :key="nav.title" text>
            <NuxtLink :to="nav.href" class="nav-link text-dark">{{
              nav.title
            }}</NuxtLink>
          </li>
        </ul>
      </div>
    </v-navigation-drawer>
    </div>
</template>
<script>
import { ref } from "vue";
// import logoMinisterio from '/images/logos/LogoMinisterio.png';
// import logoObservatorio from '/images/logos/LogoObservatorio.png';
import constants from '@/common/mixins/constants';

const runtimeConfig = useRuntimeConfig();
const drawer = ref(null);
export default {
  name: "Menu",
  data() {
    return {
      isActive: false,
      drawer: drawer,
      logoMinisterio: null,
      urlLogoMinisterio: null,
      logoObservatorio: null,
      urlLogoObservatorio: null,
      constants,
      runtimeConfig,
      headerMenu: [
        {
          title: "Inicio",
          href: "/",
        },
        {
          title: "Nosotros",
          href: "/nosotros",
        },
        {
          title: "Modulos",
          href: "/modulos",
        },
      ],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/parametros/${this.constants.TIPOS_PARAMETROS[6]}`);

        if (rta.data?._rawValue) {
          this.logoMinisterio = rta.data?._rawValue[0];
          this.urlLogoMinisterio = await this.getImage(this.logoMinisterio.url);
        }
      } catch (error) {
        console.log('=======================> Error', error);
      };

      try {
        const rta = await useFetch(`${this.runtimeConfig?.public?.apiBase}publico/parametros/${this.constants.TIPOS_PARAMETROS[7]}`);

        if (rta.data?._rawValue) {
          this.logoObservatorio = rta.data?._rawValue[0];
          this.urlLogoObservatorio = await this.getImage(this.logoObservatorio.url);
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

