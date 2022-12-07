<template>
  <div>
    <Header />
    <div class="container">
      <Header/>
      <br />
      <br>
      <br>
      <div class="row" id="card-user">
        <div class="col-sm">
          <div class="card">
            <div class="card-img text-center">
              <img
                src="../../assets/rulasRutineAssets/Usuario-navbar.png"
                class="card-img-star"
                id="perfilImg"
                alt="..."
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ user.name }}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{{ user.lastName }}</li>
              <li class="list-group-item">{{ user.age }}</li>
              <li class="list-group-item">{{ user.email }}</li>
            </ul>
            <div class="card-body text-center">
              <button type="button" class="btn btn-info" style="width: 100%" v-on:click="goToPage('/update_profile')">
                Editar
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="detalles">
            <div class="detalles-info text-center">
              <br />
              <label for="">Peso actual</label>
              <p>{{ pesos.last }}</p>
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn btn-primary col-sm text-center"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Actualiza tu peso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Actulizar peso
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="" v-on:submit.prevent="setWeight">
              <div class="col-sm">
                <span>Peso</span>
                <hr>
                <input type="text" name="" id="update-peso" class="form-control" v-model="peso"/>
              </div>
              <div class="modal-footer">
            <button type="submit" class="btn btn-success">Actualizar</button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <br />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "ProfileView",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      user: {},
      peso:"",
      pesos: "",
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
      this.$router.push("/");
    }
    if (localStorage.token != "") {
      this.getPerfil();
    }
  },
  methods: {
    login() {
      let json = {
        email: this.email,
        password: this.password,
      };
      axios.post(this.URL + "usr/log_in", json).then((data) => {
        localStorage.token = data.data.token;
        this.error = false;
        this.$router.push("/dashboard");
      });
    },
    getPerfil() {
      axios
        .get(process.env.VUE_APP_API_HOST + "usr/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.user = response.data.Perfil;
          axios
            .get(process.env.VUE_APP_API_HOST + "peso/peso_perdido", {
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
              },
            })
            .then((response) => {
              this.pesos = response.data;
            })
            .catch((e) => (this.err = e));
        })
        .catch((e) => (this.err = e));
    },
    goToPage(page) {
      this.$router.push(page);
    },
    setWeight() {
      let json = {
       peso:this.peso
      };

      axios.post(process.env.VUE_APP_API_HOST + "peso/add_weight", json, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }).then((response) => {
        console.log(response);
        this.error = false;
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.container {
  font-family: "Bebas Neue";
}

.card {
  width: 100%;
}

#perfilImg {
  width: 150px;
}

.detalles {
  border-radius: 10px;
  width: 100%;
  background: #3c4048;
  height: 100px;
}

.detalles-info {
  display: grid;
  color: #eaeaee;
}

.detalles-info label {
  color: #00abb3;
}

@media (max-width: 500px) {
  .perfilImg {
    width: 90px;
  }
}

#update-peso{
  background: #D9D9D9;
}
</style>
