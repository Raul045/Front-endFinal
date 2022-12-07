<template>
<div>
    <Header/>
  <div class="title bg-white text-end mb-5">
    <h1 id="titulo">Historial</h1>
  </div>
  <div class="container"> 
    <div class="row mt-4 mb-5 justify-content-center">
      <div class="col-lg-8 col-12">
        <div class="card">
          <div class="card-body text-center">
            <div class="row align-items-* mt-2">
              <div class="col-sm-6">
                <h3>Tu peso Inicial:</h3>
              </div>
              <div class="col-sm-4">
                <h3 formControlName="peso">{{pesos.first}} <sup>KG</sup></h3>
              </div>
            </div>
           
                   
          <div class="row align-items-* mt-4">
            <div class="col-sm-6">
              <h3 v-if="(pesos.perdio > 0)">Peso Perdido:</h3>
              <h3 v-if="(pesos.perdio < 0)">Peso Ganado:</h3>
              <h3 v-if="(pesos.perdio == 0)">Peso Perdido:</h3>
            </div>
            <div class="col-sm-4">
              <h2>{{pesos.perdio}} <sup>Kg</sup></h2>
            </div>
          </div>
          <div class="row align-items-start mt-3">
            <div class="col-sm-6">
              <h3>Tu peso actual:</h3>
            </div>
            <div class="col-sm-4">
              <h2>{{pesos.last}} <sup>KG</sup></h2>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="col-lg-4 col-12" style="text-align:center"> 
        <span style="color:aliceblue; font-size:13em" class="material-symbols-outlined">sports_gymnastics</span> 
      </div>
    </div>
  </div>
  <Footer />
</div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "HistorialView",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      pesos:{"first":0,"last":0,"perdio":0},
      error: false,
      error_msg: "",
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
    if (localStorage.token != "") {
      this.getWeights();
    }
  },
  methods: {
    getWeights() {
      axios
        .get(process.env.VUE_APP_API_HOST + "peso/peso_perdido", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.pesos = response.data
          console.log(response);
          return;
        })
        .catch((e) => (this.err = e));
    },
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
  background-color: #3C4048;
  margin: auto;
}

.card-body {
  background-color: #3C4048;
  border-radius: 5px;
}

#btn {
  font-size: 15px;
  height: 40px;
  background-color: #00ABB3;
  color: #EAEAEA;
  width: 200px;
}

.btn {
  font-size: 15px;
  height: 40px;
  background-color: #c41616;
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

.select,
option {
  font-size: 15px;
  height: 40px;
  background-color: #00ABB3;
  color: #EAEAEA;
  width: 200px;
  margin-top: 5px;
  border-radius: 5px;
}

#text {
  font-size: 15px;
}

h3, h2{
  color: #EAEAEA;
}
</style>
