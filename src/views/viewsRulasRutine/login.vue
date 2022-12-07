<template>
  <div class="container">
    <br /><br /><br />
    <div class="row mt-3 justify-content-center">
      <div class="col-lg-6 col-12">
        <div class="card">
          <div class="card-header bg-light text-center">
            <img
              src="../../assets/rulasRutineAssets/LogoNegro.png"
              width="120"
              alt=""
            />
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="login">
              <div class="row align-items-center">
                <div class="col-sm-12">
                  <span>Correo</span>
                  <input
                    type="email"
                    name=""
                    id=""
                    class="form-control"
                    v-model="email"
                  />
                </div>
                <div class="col-sm-12">
                  <span>Contraseña</span>
                  <input
                    type="password"
                    name=""
                    id=""
                    class="form-control"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="row text-center mt-3">
                <div class="col-sm">
                  <button class="btn" value="Log In">Iniciar Sesión</button>
                </div>
              </div>
              <div class="row text-center mt-3">
                <div class="col-sm">
                  <span>¿No tienes cuenta?</span>
                  <div>
                    <a href="" v-on:click="goToPage('/register')">Registrate</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      email: "",
      password: "",
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

    if (localStorage.token != "") {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      let json = {
        email: this.email,
        password: this.password,
      };
      axios.post(this.URL + "usr/log_in", json).then((data) => {
        console.log(data);
        console.log(data);
        localStorage.token = data.data.token;
        this.error = false;
        this.$router.push("/");
      });
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
  align-items: center;
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
  border-radius: 5px;
}

.card-body {
  background-color: #eaeaea;
  border-radius: 5px;
}

.btn {
  font-size: 15px;
  height: 40px;
  background-color: #00abb3;
  color: #eaeaea;
  width: 170px;
}
</style>
