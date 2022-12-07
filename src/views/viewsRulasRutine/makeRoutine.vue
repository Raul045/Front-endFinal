<template>
  <div>
    <Header/>
    <div class="container bg-white text-center pt-1 mt-3">
      <h3>¿Generar una Rutina?</h3>
    </div>
   
    <div class="container">
        <div class="row justify-content-around mt-3">
        <div class="offset-2 col-sm-4">
          <div class="card mb-5">
            <img src="../../assets/rulasRutineAssets/cuerpo.png" />
            <select v-model="json.fk_cuerpo" v-on:change="print()">
              <option value="" selected>Aleatorio</option>
              <!--<option
                v-for="cuerpos in selectCuerpo"
                :key="cuerpos.id"
                :value="cuerpos.id"
              >
                {{ cuerpos.name }}
              </option>-->
            </select>
          </div>
        </div>
        <div class="offset-2 col-sm-4">
          <div class="card">
            <img src="../../assets/rulasRutineAssets/Tipo.png" />
            <select v-model="json.fk_tipo" v-on:change="print()">
              <option value="" selected>Aleatorio</option>
             <!-- <option
                v-for="tipos in selectTipo"
                :key="tipos.id"
                :value="tipos.id"
              >
                {{ tipos.name }}
              </option>-->
            </select>
          </div>
        </div>
      </div>
      <div class="row mt-4 text-center">
        <div>
          <br>
          <button class="btn" v-on:click="makeRutine()">Empezar</button>
        </div>
      </div>
    </div>
    <Footer class="mt-4"/>
  </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "makeRutine",
  components: {
    Header,
    Footer
  },
  data: function () {
    return {
      json: { "fk_cuerpo": "", "fk_tipo": "", "userid": "" },
      selectCuerpo: "",
      selectTipo: "",
      error: false,
      error_msg: "",
      headers: {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      },
      URL: process.env.VUE_APP_API_HOST,
    };
  },
  mounted() {
    if (localStorage.token) {
      console.log("existe");
    } else {
      localStorage.token = "";
    }
    if (localStorage.token == "" || !localStorage.token) {
      console.log("no logeado");
      this.$router.push("/");
    }
    this.getPerfil();
    this.getCuerpos();
    this.getTipos();

    console.log(this.json);
  },
  methods: {
    getPerfil() {
      axios
        .get(process.env.VUE_APP_API_HOST + "usr/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.json.userid = response.data.Perfil.id;
        })
        .catch((e) => (this.err = e));
    },
    getCuerpos() {
      axios
        .get(process.env.VUE_APP_API_HOST + "cuerpos/get_all", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.selectCuerpo = response.data;
          console.log(response.data);
        })
        .catch((e) => (this.err = e));
    },
    getTipos() {
      axios
        .get(process.env.VUE_APP_API_HOST + "tipos/get_all", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.selectTipo = response.data;
          console.log(response.data);
        })
        .catch((e) => (this.err = e));
    },
    makeRutine() {
      console.log(this.json);
      axios
        .get(
          process.env.VUE_APP_API_HOST+'rutinas/make_rutine',this.json
          /*,{
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }*/
        )
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            localStorage.setItem(
              "Rutinas",
              JSON.stringify(response.data.Rutinas)
            );
            localStorage.setItem(
              "Calorias",
              JSON.stringify(response.data.calorias_quemadas)
            );
            this.goToPage("/rutina-ejercicio");
          }
        })
        .catch((e) => (this.err = e));
    },
    goToPage(page) {
      this.$router.push(page);
    },print(){
      console.log(this.json);
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.container-fluid {
  align-items: center;
  font-family: "Bebas Neue";
  width: auto;
}

.container {
  font-family: "Bebas Neue";
  width: auto;
}

@media (max-width: 500px) {
  .card {
    margin-left: 95px;
  }
}

.card {
  width: 200px;
  height: 200px;
}

img {
  width: 200px;
}

select,
option {
  font-size: 15px;
  height: 40px;
  background-color: #3c4048;
  color: #eaeaea;
  width: 200px;
  margin-top: 5px;
  border-radius: 5px;
}
.btn {
  font-size: 15px;
  height: 40px;
  background-color: #00abb3;
  color: #eaeaea;
  width: 200px;
}
</style>
