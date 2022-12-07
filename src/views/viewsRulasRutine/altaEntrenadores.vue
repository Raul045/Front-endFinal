<template>
    <div class="container">
  <div class="title bg-white text-end mb-5">
    <h5 id="titulo">Entrenadores</h5>
  </div>
  <div class="row mt-4 mb-5 justify-content-center">
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-body">
          <div class="text-center" style="margin-top: -25px">
            <img width="120" alt="" />
          </div>
          <form action="" v-on:submit.prevent="Registro">
            <div class="row align-items-*">
              <div class="col-sm">
                <span>Nombre</span>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control"
                  v-model="name"
                />
              </div>
              <div class="col-sm">
                <span>Apellidos</span>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control"
                  v-model="lastName"
                />
              </div>
            </div>
            <div class="row align-items-*">
              <div class="col-sm">
                <span>Edad</span>
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control"
                  value=""
                  v-model="age"
                />
              </div>
              <div class="col-sm">
                <span>Rol</span>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control"
                  value="entrenador"
                  disabled
                />
              </div>
            </div>
            <div class="row align-items-*">
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
            </div>
            <div class="row align-items-*">
              <div class="col-sm-12">
                <span>Password</span>
                <input
                  type="email"
                  name=""
                  id=""
                  class="form-control"
                  value="Tu contraseña 3312"
                  disabled
                />
              </div>
            </div>
            <div class="row text-center mt-3">
              <div class="col-sm">
                <button class="btn">Registrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
}



<script>
import axios from "axios";

export default {
  name: "RegistroView",
  components: {},
  data() {
    return {
      email: "",
      password: "3312",
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
    if (localStorage.token == "" || !localStorage.token) {
      console.log("no logeado");
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
      axios.post(process.env.VUE_APP_API_HOST + "usr/register_entrenador",json, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then(() => {
          this.goToPage('/');
        })
        .catch((e) => (this.err = e));
    },
    goToPage(page) {this.$router.push(page);},
  },
};
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.container {
  font-family: 'Bebas Neue';
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
  background-color: #EAEAEA;
  border-radius: 5px;
}

.btn {
  font-size: 15px;
  height: 40px;
  background-color: #00ABB3;
  color: #EAEAEA;
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