<template>    
   <div>
    <Header />
     <div>
       <h2 style="font-size:60px">Servicios</h2>
       <div class="container-fluid">
        <div class="col-8"></div>
        <div class="col-4">
          <button v-animate-css.click="'tada'" v-on:click="botonNuevo()" type="button"  class="btn" style="width:200px; border-radius:18px; background:#167aab; color:white" >{{botonText}}</button>
        </div>
       </div>
     </div>
     <div class="container" v-if="nuevo" v-animate-css="'rubberBand'">
  <h2 align = left>Nuevo Servicio</h2>
  <form v-on:submit.prevent="nuevoCliente">
  <div class="row">
    <div class="input col-6">
      <input type="text" placeholder="Nombre servicio...." class="form-control" id="nombre" aria-describedby="nombre" style="border-radius: 16px;" v-model='clienteNuevo.servicio'>
    </div>
    <div class="input col-6">
      <input type="text" class="form-control" id="email" aria-describedby="direccion" style="border-radius: 16px;" placeholder="Descripcion...." v-model='clienteNuevo.descripcion'>
    </div>
  </div>
  <br>
  <button type="submit" class="btn btn-success">Guardar</button>
</form>
</div>
<br>
     <div class="alert alert-danger" role="alert" v-if="error">
            {{error_msg}}
    </div>
<div>


<div class="container izquierda">
                <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">SERVICIO</th>
                        <th scope="col">DESCRIPCION</th>
                        <th scope="col">STATUS</th>
                        <th scope="col" style="text-align:center">ACTUALIZAR</th>
                        <th scope="col">ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="clientes in todos" :key="clientes.id" v-animate-css.hover="'headShake'" v-animate-css.click="'fadeOutLeft'">
                        <th scope="row">{{clientes.id}}</th>
                        <td>{{clientes.servicio}}</td>
                        <td>{{clientes.descripcion}}</td>
                        <td v-if="clientes.status == 0">INACTIVO</td>
                        <td v-if="clientes.status == 1">ACTIVO</td>
                        <td style="text-align:center; width:200px;"><button id="btncancelar" class="btn btn-warning" v-on:click="uno(clientes.id)">Actualizar</button></td>
                        <td style="text-align:center; width:190px;"><button id="btncancelar" class="btn btn-danger" v-on:click="deleteOne(clientes.id)">Eliminar</button></td>
                        
                    </tr>
            
                </tbody>
                </table>

            </div>
</div>


<br>
<br>
<br>


<div class="container" v-if="cambio" v-animate-css="'zoomIn'">
  <h2 align = left>Editar</h2>
  <form v-on:submit.prevent="update">
    <div class="row">
      <div class="mb-3" hidden>
        <label for="exampleInputEmail1" class="form-label">id</label>
        <input type="text" class="form-control" id="id" aria-describedby="id" v-model='cliente.id'>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="exampleInputEmail1" id="labeln" class="input">Nombre Servicios</label>
          <input type="text" class="input" id="nombre" aria-describedby="nombre" style="border-radius: 16px; width:500px;" v-model='cliente.servicio'>
        </div>
        <div class="col-6">
          <label for="exampleInputEmail1" class="input">Descripcion</label>
          <input type="text" class="input" id="direccion" aria-describedby="direccion" style="border-radius: 16px; width:500px;" v-model='cliente.descripcion'>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-1">
        <button type="submit" class="btn btn-primary" >Modificar</button>
      </div>
      <div class="col-2">
        <button class="btn btn-danger" v-on:click="cancelarUpdate()">Cancelar</button>
      </div>
    </div>
</form>
</div>




<Footer />
    </div>

</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name:"ServicioBash",
  data() {
    return{
      todos:null,
      botonText:'Agregar nuevo Usuario',
      cliente:"",
      cambio:false,
      nuevo:false,
      error:false,
      error_msg:"",
      clienteNuevo:{servicio:"",descripcion:""},
      URL:process.env.VUE_APP_API_HOST,
    }
  }, 
  async mounted() {
    if (localStorage.token == "" || !localStorage.token){
            this.$router.push('/');
        }
    this.getTodos()
  },
  components:{
        Header,
        Footer
    },
  methods:{
    botonNuevo(){
      if (this.nuevo){
          this.nuevo = false
          this.botonText = 'Agregar nuevo Usuario'
          this.clienteNuevo = {servicio:"",descripcion:""}
      }else{
          this.nuevo = true
          this.botonText = 'cancelar'
      }
      this.error=false;
     
    },print(){
      console.log(this.clienteNuevo)
    },

    nuevoCliente(){
      if(this.clienteNuevo.servicio=="" || this.clienteNuevo.descripcion ==""){
        console.log("cancelo")
        this.error=true;
        this.error_msg ="!!TODOS LOS CAMPOS SON NECESARIOS!!"        
        return
      }
      this.error=false;
      axios
      .post(this.URL+'servicios',this.clienteNuevo,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
        .then(response => {
          console.log(response.data)
          this.nuevo = false
          this.getTodos()
        })
        .catch(e => console.log(e))

        this.botonNuevo()
    },

    getTodos(){
      axios
        .get(this.URL+'servicios',{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }})
          .then(response => {
            this.todos = response.data.Servicios
            console.log(this.todos)
          })
          .catch( e=> console.log(e))
    },
    getOne($num){
      //this.cliente = {id:1,nombre:"juanito",direccion:"geranios 731",telefono:"8736352188"}
      this.cambio = true
      console.log($num)
      axios
        .get(this.URL+'clientes/'+$num,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }})
          .then(response => {
            console.log(response.data.Cliente)
            this.cliente=response.data.Cliente
            this.cambio = true
          })
          .catch( e=> console.log(e))
    },
    uno($id){
      axios
        .get(this.URL+'servicios/'+$id,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }})
          .then(response => {
            
            this.cliente=response.data.Servicio

            console.log(response.data)
            this.cambio = true
          })
          .catch( e=> console.log(e))
    },cancelarUpdate(){
      this.mascota=""
      this.cambio = false
    },
    deleteOne($num){
      axios
        .put(this.URL+'servicios/changeStatus/'+$num,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
          .then(response => {
            console.log(response.data)
            this.sleep(2000);
            this.getTodos()
          })
          .catch( e=> console.log(e))
    },


    update(){
      axios
      .put(this.URL+'servicios/'+this.cliente.id,this.cliente,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
                .then(data=>{
                    if(data.status != 400){
                        this.cambio =false;
                        this.erro=false;
                        this.getTodos();
                    }else{
                        this.error = true;
                        this.error_msg = "los datos no se actualizaron";
                    }
                })
    },getUserValidated(){
              axios
                .get(process.env.VUE_APP_API_HOST+ 'us/Perfil' ,{
                headers: {
                      'Authorization': `Bearer ${localStorage.token}`
                        }
                })
                  .then(response => {
                    this.user = response.data.Perfil
                    this.returnTo(response.data.Perfil);
                  })
                  .catch( e=> console.log(e))
            }, 
            returnTo(user){
              if (user.m2 == 0) {
                    this.$router.push('codigo');
                }else if (user.m2 == 1 && user.m3 == 1 && user.permiso == 1) {
                  console.log('validado');
                }else if (user.m2 == 1 && user.m3 == 1 && user.permiso == 0){
                  this.$router.push('dashboard');
                }else{
                  this.$router.push('/socket');
                }
 
            },
    

    sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
  });
}

  }
  
}
</script>



<style>


    .izquierda{
        text-align: left;
    }
    #btncancelar{
        width:190px;
        
        
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

</style>




