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
          <v-col cols="12" md="4" sm="6" v-for="card in modulos" :key="card.title">
            <v-card elevation="0" class="team-card mb-7" @click="doSomething(card)">
              <v-card-title>{{ card.title }}</v-card-title>
              <div class="social-overlay overflow-hidden">
                <img :src="`/images/team/${card.img}`" :alt="card.img" class="img-fluid"/>
                <div class="img-overlay">
                  <div>
                    <h5 class="team-title font-weight-medium font-18 mt-5">
                      {{ card.title }}
                    </h5>
                  </div>
                  <v-divider></v-divider>
                  <p class="text-white" align="justify">{{ card.desc }}</p>
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
export default {
  name: "Team",
  data() {
    return {
      modulos: [
        {
          id: 1,
          img: "tratatrafico.jpg",
          title: "Trata y tráfico de personas",
          desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        },
        {
          id: 2,
          img: "narcotrafico.jpg",
          title: "Narcotráfico",
          desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        },
        {
          id: 3,
          img: "sustancias.jpg",
          title: "Venta de sustancias controladas",
          desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        },
      ]
    };
  },
  methods: {
    doSomething(modulo) {
      localStorage.setItem("fidmodulo", modulo.id);
      localStorage.setItem("fmodulo", modulo.title);
      this.$router.push({ name: "modulos" });
    }
  },
};
</script>
