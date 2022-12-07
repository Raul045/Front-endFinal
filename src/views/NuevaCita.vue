<template>
    <div>
        <Header />

<div class="container">
  <h2>Generar Cita</h2>
  <form v-on:submit.prevent="nuevaCita">
  <div class="row">
    <div class="col-5">
      <p><label for="exampleInputEmail1">Dueño</label></p>
    </div>
    <div class="col-7">
      <p><label for="exampleInputEmail1">Mascota</label></p>
    </div>
    <div class="col-6">
      <div class="select1">
        <select class="form-select" name="cliente" aria-label="Default select example" v-model="citaNueva.cliente" v-on:change="getMascotas($event)">
          <option v-for="clientes in selectClientes" :key="clientes.id" :value="clientes.id" >{{clientes.nombre}}</option>
        </select>
      </div>
    </div>
    <div class="col-6">
      <div class="select1">
        <select class="form-select" name="mascota" aria-label="Default select example" v-model="citaNueva.mascota" >
          <option v-for="mascotas in selectMascotas" :key="mascotas.id_mascota" :value="mascotas.id_mascota" >{{mascotas.mascota}}</option>
        </select>
      </div>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="col-5">
      <p><label for="exampleInputEmail1">Tipo Cita</label></p>
    </div>
    <div class="col-7">
      <p><label for="exampleInputEmail1">Fecha (yyyy/mm/dd)</label></p>
    </div>
    <div class="col-6">
      <div class="select1">
        <select class="form-select" name="tipoCita" aria-label="Default select example" v-model="citaNueva.servicio" >
          <option v-for="servicios in selectServicio" :key="servicios.id" :value="servicios.id" >{{servicios.servicio}}</option>
        </select>
      </div>
    </div>
    <div class="col-6">
      <div class="inputc">
        <input type="text" class="form-control" id="descripcion" aria-describedby="descripcion" v-model='citaNueva.fecha'>
      </div>
    </div>
  </div>
  <br>
  <br>
  <div class="row">
    <div class="col-1">
      <button type="submit" class="btn btn-outline-success" style="width: 100px;">Guardar</button>
    </div>
    <div class="col-1">
      <button type="button" class="btn btn-outline-danger" style="width: 100px;" v-on:click="salir()"  >Salir</button>
    </div>
  </div>
</form>
</div>

<br>
     <div class="alert alert-danger" role="alert" v-if="error">
            {{error_msg}}
    </div>

         <Footer /> 

    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios';
export default {
    name:"NuevaCita",
    data:function(){
        return {
            citaNueva:{cliente:"",mascota:"",servicio:"",fecha:""},
            selectMascotas:"",
            selectClientes:"",
            selectServicio:"",
            cliente_id:"",
            error:false,
            error_msg:"",
            cita:"",
            URL:process.env.VUE_APP_API_HOST

        }
    },
    components:{
        Header,
        Footer
    },
    mounted() {
      if (localStorage.token == "" || !localStorage.token){
            this.$router.push('/');
        }
      this.getDuenos()
      this.getServicios()
    },
    methods:{
        nuevaCita(){
        if(this.citaNueva.cliente=="" || this.citaNueva.mascota ==""|| this.citaNueva.servicio ==""|| this.citaNueva.fecha ==""){
        console.log("cancelo")
        this.error=true;
        this.error_msg ="!!TODOS LOS CAMPOS SON NECESARIOS!!"        
        return
      }
      this.error=false;
          console.log(this.citaNueva)
      axios
      .post(this.URL+'citas',this.citaNueva,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
        .then(response => {
          console.log(response.data)
          this.$router.push("/dashboard");
        })
        .catch(e => console.log(e))

    },getServicios(){
      axios
      .get(this.URL+'servicios',{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
        .then(response => {
          console.log(response.data.Servicios)
          this.nuevo = false
          this.selectServicio = response.data.Servicios
        })
        .catch(e => console.log(e))

    },getDuenos(){
      axios
      .get(this.URL+'clientes',{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
        .then(response => {
          console.log(response.data.Clientes)
          this.nuevo = false
          this.selectClientes = response.data.Clientes
        })
        .catch(e => console.log(e))

    },getMascotas($event){
        console.log($event.target.value)
        this.cliente_id = $event.target.value
      axios
      .get(this.URL+'clienteMascota?cliente_id='+this.cliente_id,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
        .then(response => {
          console.log(response.data)
          this.selectMascotas = response.data
          console.log(this.cliente_id)
        })
        .catch(e => console.log(e))

    },
        salir(){
            this.$router.push("/dashboard");
        },
        makeToast(titulo,texto,tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
            title: titulo,
            variant: tipo,
            autoHideDelay: 5000,
            appendToast: true
            })
        }
        
    }
}
</script>
<style scoped>
.left{
    text-align:  left;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

table {
  text-align: left;
  line-height: 35px;
  border-collapse: separate;
  border-spacing: 0;
  border: 2px solid #cc0088;
  width: 1000px;
  margin: 50px auto;
  border-radius: .25rem;
}

thead tr:first-child {
  background: #cc0088;
  color: #fff;
  border: none;
}

th:first-child,
td:first-child {
  padding: 0 15px 0 20px;
}

th {
  font-weight: 500;
}

thead tr:last-child th {
  border-bottom: 3px solid #ddd;
}

tbody tr:hover {
  background-color: #f2f2f2;
  cursor: default;
}

tbody tr:last-child td {
  border: none;
}

tbody td {
  border-bottom: 1px solid #ddd;
}

td:last-child {
  text-align: right;
  padding-right: 10px;
}

.button {
  color: #aaa;
  cursor: pointer;
  vertical-align: middle;
  margin-top: -4px;
}

.edit:hover {
  color: #0a79df;
}

.delete:hover {
  color: #dc2a2a;
}
select {
	-webkit-appearance:none;
	-moz-appearance:none;
	-ms-appearance:none;
	appearance:none;
	outline:0;
	box-shadow:none;
	border:0!important;
	background:#F4F4F2;
	background-image: none;
	flex: 1;
	padding: 0 .5em;
	color:#5c6664;
	cursor:pointer;
	font-size: 1em;
	font-family: 'Open Sans', sans-serif;
	border-radius: 15px;
 }
 select::-ms-expand {
	display: none;
 }
 .select1 {
	position: relative;
	display: flex;
	width: 490px;
	height: 3em;
	line-height: 3;
	overflow: hidden;
	border-radius: .25em;
 }
 .select1::after {
	content: '\25BC';
	position: absolute;
	top: 0;
	right: 0;
	padding: 0 1em;
	cursor:pointer;
	pointer-events:none;
	transition:.25s all ease;
	border-radius: 15px;
 }
 .select1:hover::after {
	color: #23b499;
 }
  input {
	-webkit-appearance:none;
	-moz-appearance:none;
	-ms-appearance:none;
	appearance:none;
	outline:0;
	box-shadow:none;
	border:0!important;
	background:#F4F4F2;
	background-image: none;
	flex: 1;
	padding: 0 .5em;
	color:#5c6664;
	cursor:pointer;
	font-size: 1em;
	font-family: 'Open Sans', sans-serif;
	border-radius: 15px;
 }
 
 .inputc {
	position: relative;
	display: flex;
	width: 490px;
	height: 3em;
	line-height: 3;
	overflow: hidden;
	border-radius: .25em;
 }
 .inputc::after {
	position: absolute;
	top: 0;
	right: 0;
	padding: 0 1em;
	cursor:pointer;
	pointer-events:none;
	transition:.25s all ease;
	border-radius: 15px;
 }
 .inputc:hover::after {
	color: #23b499;
 }
</style>
