<template>
  <div class="container">
  <div class="row mt-3 justify-content-center">
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-header bg-light text-center">
          <img src="../../assets/rulasRutineAssets/LogoNegro.png" width="120" alt="">
        </div>
        <div class="card-body">
          <form action="" v-on:submit.prevent="Registro">
            <div class="row align-items-*">
              <div class="col-sm">
                <span>Nombre</span>
                <input type="text" name="" id="" class="form-control" v-model="name">
              </div>
              <div class="col-sm">
                <span>Apellidos</span>
                <input type="text" name="" id="" class="form-control" v-model="lastName">
              </div>
            </div>
            <div class="row align-items-*">
              <div class="col-sm">
                <span>Correo</span>
                <input type="email" name="" id="" class="form-control" v-model="email">
              </div>
              <div class="col-sm">
                <span>Contraseña</span>
                <input type="password" name="" id="" class="form-control" v-model="password">
              </div>
            </div>
            <div class="row align-items-*">
              <div class="col-sm-6">
                <span>Edad</span>
                <input type="number" name="" id="" class="form-control" v-model="age">
              </div>
            </div>
            <div class="row text-center mt-3">
              <div class="col-sm">
                <button class="btn" value="Register">Registrarse</button>
              </div>
            </div>
            <div class="row text-center mt-4">
              <span>¿Ya tienes cuenta?</span>
              <div>
                <a href=""  v-on:click="goToPage('/login')">Iniciar Sesión</a>
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
  name: "RegistroView",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      name:"",
      age:"",
      lastName:"",
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
    Registro() {
      let json = {
        email: this.email,
        password: this.password,
        name: this.name,
        age: this.age,
        lastName: this.lastName,
      };
      axios.post(this.URL + "usr/sign_in", json).then((data) => {
        console.log(data);
        this.error = false;
        this.login();
        this.$router.push("/register_weight");
      });
    }, goToPage(page) {
      this.$router.push(page);
    },
    login() {
      let json = {
        email: this.email,
        password: this.password,
      };
      axios.post(this.URL + "usr/log_in", json).then((data) => {
        localStorage.token = data.data.token;
        this.error = false;
      });
    },
  },
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.container{
  align-items: center;
  font-family: 'Bebas Neue';
}
label, input{
  font-size: 17px;
}
input{
  height: 35px;
}

span{
  font-size: 20px;
}
a{
  font-size: 18px;
}

.card{
  margin: auto;
}

.card-body {
  background-color: #EAEAEA;
  border-radius: 5px;
}

.btn{
  font-size: 15px;
  height: 40px;
  background-color: #00ABB3;
  color: #EAEAEA;
  width: 200px;
}
</style>
