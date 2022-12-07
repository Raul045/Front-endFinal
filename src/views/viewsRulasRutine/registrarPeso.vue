<template>
  <div class="container">
  <div class="row mt-3 justify-content-center" id="hijo">
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-header text-center">
          <img src="../../assets/rulasRutineAssets/LogoNegro.png" width="120" alt="">
        </div>
        <div class="card-body text-center">
            <h1>!BIENVENDO!</h1>
            <br>
            <p id="text-card-body">Para terminar tu registro es necesario saber tu peso.
                Esto para poder optimizar una mejor Rutina para ti.
            </p>
        </div>
        <div class="card-body">
          <form action="" v-on:submit.prevent="setWeight">
            <div class="row align-items-*">
              <div class="col-sm text-center">
                <span id="TextPeso">Peso</span>
                <input type="text" name="" id="" class="form-control" v-model="peso">
              </div>
            </div>
            <div class="row text-center mt-3">
              <div class="col-sm">
                <button class="btn">Terminar Registro</button>
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
  name: "RegistroPesoView",
  components: {},
  data() {
    return {
      peso:"",
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
        this.$router.push("/profile");
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

p{
    font-size: 15px;
}
</style>
