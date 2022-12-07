<template>
  <div>
    <div class="container">
      <br />
      <br />
      <br />
      <div class="row mt-4 mb-5 justify-content-center">
        <div class="col-lg-6 col-12">
          <div class="card">
            <div class="card-body">
              <div class="text-center" style="margin-top: -85px">
                <img
                  src="../../assets/rulasRutineAssets/Resistencia.png"
                  width="120"
                  alt=""
                />
              </div>
              <form v-on:submit.prevent="createRutine">
                <div class="row align-items-*">
                  <div class="col-sm">
                    <span>Ejercicio</span>
                    <br />
                    <select v-model="json.fk_ejercicio" v-on:change="print()">
                      <option value="0" selected>Seleccione..</option>
                      <option
                        v-for="ejercicios in selectEjercicios"
                        :key="ejercicios.id"
                        :value="ejercicios.id"
                      >
                        {{ ejercicios.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm">
                    <span>Cuerpo</span>
                    <br />
                    <select v-model="json.fk_cuerpo" v-on:change="print()">
                      <option value="0" selected>Seleccione..</option>
                      <option
                        v-for="cuerpos in selectCuerpo"
                        :key="cuerpos.id"
                        :value="cuerpos.id"
                      >
                        {{ cuerpos.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="row align-items-*">
                  <div class="col-sm">
                    <span>Tipo</span>
                    <br />
                    <select v-model="json.fk_tipo" v-on:change="print()">
                      <option value="0" selected>Seleccione..</option>
                      <option
                        v-for="tipos in selectTipo"
                        :key="tipos.id"
                        :value="tipos.id"
                      >
                        {{ tipos.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm">
                    <span>Nivel</span>
                    <br />
                    <select v-model="json.fk_nivel" v-on:change="print()">
                      <option value="0" selected>Seleccione..</option>
                      <option
                        v-for="nivel in selectNiveles"
                        :key="nivel.id"
                        :value="nivel.id"
                      >
                        {{ nivel.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row align-items-*">
                  <div class="col-sm">
                    <span>Series</span>
                    <input
                      name=""
                      id=""
                      class="form-control"
                      v-model="json.series"
                    />
                  </div>
                  <div class="col-sm">
                    <span>Repeticiones</span>
                    <input
                      name=""
                      id=""
                      class="form-control"
                      v-model="json.repetitions"
                    />
                  </div>
                </div>
                <div class="col-sm">
                  <span>Calorias</span>
                  <input
                    name=""
                    id=""
                    class="form-control"
                    v-model="json.calorias"
                  />
                </div>

                <div class="row text-center mt-3">
                  <div class="col-sm">
                    <button class="btn btn-success">Listo</button>
                  </div>
                  <br /><br />
                  <div class="col-sm">
                    <button class="btn btn-danger" v-on:click="goToPage('/')">
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Footer from "@/components/Footer.vue";

export default {
  name: "RegistrarRetunaNueva",
  components: {
    Footer,
  },
  data() {
    return {
      json: {
        fk_nivel: "0",
        fk_ejercicio: "0",
        fk_cuerpo: "0",
        fk_tipo: "0",
        series: 0,
        repetitions: 0,
        calorias: 0,
      },
      selectCuerpo: "",
      selectTipo: "",
      selectEjercicios: "",
      selectNiveles: "",
      error: false,
      error_msg: "",
      URL: process.env.VUE_APP_API_HOST,
    };
  },
  async mounted() {
    if (localStorage.token) {
      console.log("existe");
    } else {
      localStorage.token = "";
    }
    if (localStorage.token == "" || !localStorage.token) {
      console.log("no logeado");
      //this.$router.push("/");
    }
    if (localStorage.token != "") {
      this.id_usr = this.$route.params.id;
      this.getCuerpos();
      this.getTipos();
      this.getLevels();
      this.getEjercicios();
    }
  },
  methods: {
    createRutine() {
      axios
        .post(process.env.VUE_APP_API_HOST + "rutinas/add_rutine", this.json, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.json = {
            fk_nivel: "0",
            fk_ejercicio: "0",
            fk_cuerpo: "0",
            fk_tipo: "0",
            series: 0,
            repetitions: 0,
            calorias: 0,
          };
        })
        .catch((e) => console.log(e));
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
          //console.log(response.data);
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
          //console.log(response.data);
        })
        .catch((e) => (this.err = e));
    },
    getLevels() {
      axios
        .get(process.env.VUE_APP_API_HOST + "levels/get_all", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.selectNiveles = response.data;
          //console.log(response.data);
        })
        .catch((e) => (this.err = e));
    },
    getEjercicios() {
      axios
        .get(process.env.VUE_APP_API_HOST + "ejercicios/get_all", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.selectEjercicios = response.data;
          //console.log(response.data);
        })
        .catch((e) => (this.err = e));
    },
    goToPage(page) {
      this.$router.push(page);
    },
    print() {
      console.log(this.json);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.container {
  font-family: "Bebas Neue";
}

label,
input {
  font-size: 17px;
}

input {
  height: 35px;
}

span {
  font-size: 20px;
}

a {
  font-size: 18px;
}

.card {
  margin: auto;
}

.card-body {
  background-color: #eaeaea;
  border-radius: 5px;
}

.btn {
  font-size: 15px;
  height: 40px;
  color: #eaeaea;
  width: 200px;
}

@media (max-width: 500px) {
  #titulo {
    margin-left: 45px;
    padding: 5px;
    font-size: 20px;
  }
}

.title {
  border-radius: 0px 10px 10px 0px;
  width: 50%;
}

#titulo {
  margin-right: 50px;
  padding: 5px;
}

select,
option {
  font-size: 15px;
  height: 40px;
  background-color: #ffffff;
  color: #000000;
  width: 280px;
  margin-top: 5px;
  border-radius: 5px;
}
</style>
