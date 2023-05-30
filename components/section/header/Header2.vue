<template>
  <div>
    <!-- -----------------------------------------------
          Start Header
    ----------------------------------------------- -->
    <v-app-bar app class="app-header position-relative bg-green header2" flat>
      <v-container class="py-0 fill-height">
        <v-toolbar>
        <!-- Logo -->
        <div class="logo" style="margin-right: 20%">
          <v-btn
                  class="btn px-6 bg-white ml-2 d-md-flex d-none"
                  flat
                >
            <LcLogoWhiteTextLogo/>
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
          <img :src="WhiteTLogo" alt="logo"/>
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
    <!-- -----------------------------------------------
          End Header
    ----------------------------------------------- -->
   <!----sidebar menu drawer start----->
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
import WhiteTLogo from '/images/logos/LogoObservatorio.png';
const drawer = ref(null);
export default {
  name: "BannerText",
  data() {
    return {
      isActive: false,
      drawer: drawer,
      WhiteTLogo: WhiteTLogo,
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
  methods: {},
};
</script>

