<template>    
   <div>
    <Header />
     <div>
       <h2 style="font-size:60px">Clientes</h2>
       <div class="container-fluid">
        <div class="col-8"></div>
        <div class="col-4">
          <button v-animate-css.click="'tada'" v-on:click="botonNuevo()" type="button"  class="btn" style="width:200px; border-radius:18px; background:#167aab; color:white" >{{botonText}}</button>
        </div>
       </div>
     </div>
     <div class="container" v-if="nuevo" v-animate-css="'rubberBand'">
  <h2 align = left>Nuevo Cliente</h2>
  <form v-on:submit.prevent="nuevoCliente">
  <div class="row">
    <div class="input col-6">
      <input type="text" placeholder="Nombre...." class="form-control" id="nombre" aria-describedby="nombre" style="border-radius: 16px;" v-model='clienteNuevo.nombre'>
    </div>
    <div class="input col-6">
      <input type="text" class="form-control" id="direccion" aria-describedby="direccion" style="border-radius: 16px;" placeholder="Direccion...." v-model='clienteNuevo.direccion'>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="input col-3">
      <input type="text" class="form-control" id="telefono" aria-describedby="telefono" style="border-radius: 16px;" placeholder="Telefono...." v-model='clienteNuevo.telefono'>
    </div>
  </div>


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
                        <th scope="col">Nombre</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Telefono</th>
                        <th scope="col" style="text-align:center">Actualizar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="clientes in todos" :key="clientes.id" v-animate-css.hover="'headShake'" v-animate-css.click="'fadeOutLeft'">
                        <th scope="row">{{clientes.id}}</th>
                        <td>{{clientes.nombre}}</td>
                        <td>{{clientes.direccion}}</td>
                        <td>{{clientes.telefono}}</td>
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
          <input type="text" class="input" id="nombre" aria-describedby="nombre" style="border-radius: 16px; width:500px;" v-model='cliente.nombre'>
        </div>
        <div class="col-6">
          <label for="exampleInputEmail1" class="input">Direccion</label>
          <input type="text" class="input" id="direccion" aria-describedby="direccion" style="border-radius: 16px; width:500px;" v-model='cliente.direccion'>
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="input">Telefono</label>
        <input type="text" class="input" id="telefono" aria-describedby="telefono" style="border-radius: 16px; width:500px;" v-model='cliente.telefono'>
      </div>
    </div>
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
  name:"clienteBash",
  data() {
    return{
      todos:null,
      botonText:'Agregar nuevo registro',
      cliente:"",
      cambio:false,
      nuevo:false,
      error:false,
      error_msg:"",
      clienteNuevo:{nombre:"",direccion:"",telefono:""},
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
          this.botonText = 'Agregar nuevo registro'
          this.clienteNuevo={nombre:"",direccion:"",telefono:""}
      }else{
          this.nuevo = true
          this.botonText = 'cancelar'
      }
      this.error=false;
     
    },print(){
      console.log(this.clienteNuevo)
    },

    nuevoCliente(){

      if(this.clienteNuevo.nombre == "" || this.clienteNuevo.direccion == "" || this.clienteNuevo.telefono == ""){
        console.log("cancelo")
        this.error=true;
        this.error_msg ="!!TODOS LOS CAMPOS SON NECESARIOS!!"        
        return
      }
      this.error=false;
      axios
      .post(this.URL+'clientes',this.clienteNuevo,{
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
        .get(this.URL+'clientes',{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }})
          .then(response => {
            this.todos = response.data.Clientes
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
        .get(this.URL+'clientes/'+$id,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }})
          .then(response => {
            
            this.cliente=response.data.Cliente[0]

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
        .put(this.URL+'clientes/changeStatus/'+$num,{
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
      .put(this.URL+'clientes/'+this.cliente.id,this.cliente,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
                .then(data=>{
                    if(data.status != 400){
                        console.log("datos actualizados");
                        this.cambio =false;
                        this.erro=false;
                        this.getTodos();
                        this.sleep(2000);
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


</style>




