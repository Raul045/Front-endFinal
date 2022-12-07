<template>    
   <div>
    <Header />
     <div>
       <h2 style="font-size:60px">Usuarios</h2>
       <div class="container-fluid">
        <div class="col-8"></div>
        <div class="col-4">
          <button v-animate-css.click="'tada'" v-on:click="botonNuevo()" type="button"  class="btn" style="width:200px; border-radius:18px; background:#167aab; color:white" >{{botonText}}</button>
        </div>
       </div>
     </div>
     <div class="container" v-if="nuevo" v-animate-css="'rubberBand'">
  <h2 align = left>Nuevo Usuario</h2>
  <form v-on:submit.prevent="nuevoCliente">
  <div class="row">
    <div class="input col-6">
      <input type="text" placeholder="Nombre...." class="form-control" id="nombre" aria-describedby="nombre" style="border-radius: 16px;" v-model='clienteNuevo.name'>
    </div>
    <div class="input col-6">
      <input type="text" class="form-control" id="email" aria-describedby="direccion" style="border-radius: 16px;" placeholder="Correo...." v-model='clienteNuevo.email'>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="input col-6">
      <input type="text" class="form-control" id="telefono" aria-describedby="telefono" style="border-radius: 16px;" placeholder="Telefono...." v-model='clienteNuevo.telefono'>
    </div>
    <div class="input col-6">
      <input type="text" class="form-control" id="direccion" aria-describedby="telefono" style="border-radius: 16px;" placeholder="Direccion...." v-model='clienteNuevo.direccion'>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="input col-6">
      <input type="password" class="form-control" id="" aria-describedby="telefono" style="border-radius: 16px;" placeholder="Contraseña...." v-model='clienteNuevo.password'>
    </div>
    <div class="col-6">
      <div class="select2">
        <select class="form-control" name="tipoCita" aria-label="Default select example" v-model="clienteNuevo.tipo" >
          <option value=0 >Administrador</option>
          <option value=1 >Veterinario</option>
        </select>
      </div>
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
                        <th scope="col">NOMBRE</th>
                        <th scope="col">CORREO</th>
                        <th scope="col">DIRECCION</th>
                        <th scope="col">TELEFONO</th>
                        <th scope="col">TIPO</th>
                        <th scope="col" style="text-align:center">ACTUALIZAR</th>
                        <th scope="col">ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="clientes in todos" :key="clientes.id" v-animate-css.hover="'headShake'" v-animate-css.click="'fadeOutLeft'">
                        <th scope="row">{{clientes.id}}</th>
                        <td>{{clientes.name}}</td>
                        <td>{{clientes.email}}</td>
                        <td>{{clientes.direccion}}</td>
                        <td>{{clientes.telefono}}</td>
                        <td v-if="clientes.tipo == 0">ADMINISTRADOR</td>
                        <td v-if="clientes.tipo == 1">VETERINARIO</td>
                        <td v-if="clientes.tipo == 2">ASISTENTE</td>
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
          <label for="exampleInputEmail1" id="labeln" class="input">Nombre</label>
          <input type="text" class="input" id="nombre" aria-describedby="nombre" style="border-radius: 16px; width:500px;" v-model='cliente.name'>
        </div>
        <div class="col-6">
          <label for="exampleInputEmail1" class="input">Direccion</label>
          <input type="text" class="input" id="direccion" aria-describedby="direccion" style="border-radius: 16px; width:500px;" v-model='cliente.direccion'>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
            <label for="exampleInputEmail1" class="input">Telefono</label>
            <input type="text" class="input" id="telefono" aria-describedby="telefono" style="border-radius: 16px; width:500px;" v-model='cliente.telefono'>
        </div>
        <div class="col-6">
            <label for="exampleInputEmail1" class="input">Correo</label>
            <input type="text" class="input" id="telefono" aria-describedby="telefono" style="border-radius: 16px; width:500px;" v-model='cliente.email'>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
            <label for="exampleInputEmail1" class="input">Contraseña</label>
            <input type="password" class="input" id="telefono" aria-describedby="telefono" style="border-radius: 16px; width:500px;" v-model='cliente.password'>
        </div>
        <div class="col-6">
            <label for="exampleInputEmail1" class="input">Tipo</label>
            <div class="select2" style="width:500px">
              <select class="select1" name="tipoCita" aria-label="Default select example" v-model="cliente.tipo" >
                <option value=0 >Administrador</option>
                <option value=1 >Veterinario</option>
              </select>
            </div>
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
  name:"AdminBash",
  data() {
    return{
      todos:null,
      botonText:'Agregar nuevo Usuario',
      cliente:"",
      cambio:false,
      nuevo:false,
      error:false,
      error_msg:"",
      clienteNuevo:{name:"",email:"",password:"",direccion:"",telefono:"",tipo:""},
      URL:process.env.VUE_APP_API_HOST,
    }
  }, 
  async mounted() {
    if (localStorage.token == "" || !localStorage.token){
            this.$router.push('/');
        }
    this.getTodos()
    this.perfil()
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
          this.clienteNuevo={name:"",email:"",password:"",direccion:"",telefono:"",tipo:""}
      }else{
          this.nuevo = true
          this.botonText = 'cancelar'
      }
      this.error=false;
     
    },print(){
      console.log(this.clienteNuevo)
    },

    nuevoCliente(){
      if(this.clienteNuevo.name == "" || this.clienteNuevo.email == "" || this.clienteNuevo.password == ""|| this.clienteNuevo.direccion == ""|| this.clienteNuevo.telefono == ""|| this.clienteNuevo.tipo == ""){
        console.log("cancelo")
        this.error=true;
        this.error_msg ="!!TODOS LOS CAMPOS SON NECESARIOS!!"        
        return
      }
      this.error=false;
      axios
      .post(this.URL+'us/registro',this.clienteNuevo,{
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
        .get(this.URL+'usr/todos',{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }})
          .then(response => {
            this.todos = response.data.Usuarios
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
        .get(this.URL+'veterinarios/'+$id,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }})
          .then(response => {
            
            this.cliente=response.data.Usuario
            this.cliente.password=""

            console.log(response.data.Usuario)
            this.cambio = true
          })
          .catch( e=> console.log(e))
    },cancelarUpdate(){
      this.mascota=""
      this.cambio = false
    },
    deleteOne($num){
      axios
        .delete(this.URL+'veterinarios/'+$num,{
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
      .put(this.URL+'veterinarios/'+this.cliente.id,this.cliente,{
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
    sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
  });
}, redirectTo(tipo){
  if(tipo == 0){
    console.log("Administrador entro")
  }else{
    console.log("No eres administrador")
    this.$router.push('dashboard');
  }
},perfil(){
  axios
      .get(this.URL+'usr/perfil',{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
        .then(response => {
          console.log(response.data.Perfil)
          this.nuevo = false
          this.redirectTo(response.data.Perfil.tipo)
        })
        .catch(e => console.log(e))
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
 .select2 {
	position: relative;
	display: flex;
	width: 630px;
	height: 3em;
	line-height: 3;
	overflow: hidden;
	border-radius: 15px;
 }
 .select2::after {
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
 .select2:hover::after {
	color: #23b499;
 }

</style>




