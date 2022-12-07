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
                  src="../../assets/rulasRutineAssets/usuario.png"
                  width="120"
                  alt=""
                />
              </div>
              <form v-on:submit.prevent="update">
                <div class="row align-items-*">
                  <div class="col-sm">
                    <span>Nombre</span>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control"
                      v-model="ejercicio.name"
                    />
                  </div>
                  <div class="col-sm">
                    <span>Descripcion</span>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control"
                      v-model="ejercicio.description"
                    />
                  </div>
                </div>
                <div class="row align-items-*">
                  <div class="col-sm">
                    <span>URL</span>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control"
                      v-model="ejercicio.url"
                    />
                  </div>
                </div>
                <div class="row text-center mt-3">
                  <div class="col-sm">
                    <button class="btn btn-success">Listo</button>
                  </div>
                  <br /><br />
                  <div class="col-sm">
                    <button
                      class="btn btn-danger"
                      v-on:click="goToPage('/tabla-ejercicios')"
                    >
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
  name: "UpdateUserView",
  components: {
    Footer,
  },
  data() {
    return {
      ejercicio: {
        name: "exampleName",
        description: "ExampleDescription",
        url: "example",
      },
      error: false,
      error_msg: "",
      id_exercise: null,
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
      this.$router.push("/");
    }
    this.id_exercise = this.$route.params.id;
      this.getExercise();
  },
  methods: {
    update() {
      axios
        .put(
          process.env.VUE_APP_API_HOST +
            "ejercicios/update_ejercise/" +
            this.id_exercise,
          this.ejercicio,
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.goToPage("/tabla-ejercicios");
        })
        .catch((e) => console.log(e));
    },
    getExercise() {
      axios
        .get(
          process.env.VUE_APP_API_HOST +
            "ejercicios/get_one/"+
            this.id_exercise,
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then((response) => {
          this.ejercicio = response.data;
          console.log(this.ejercicio);
        })
        .catch((e) => (this.err = e));
    },
    goToPage(page) {
      this.$router.push(page);
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
</style>
