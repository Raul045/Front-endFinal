<template>
    <div>
        <Header/>
        <br>
        <div class="container">
          <br>
            <div align="center"><b><h1 style="font-size:60px">Citas</h1></b></div>
            <br>

            <div class="container izquierda">

                <div class="row">
                    <div class="col-10">
                    </div>
                    <div class="col-2">
                        <button class="btn" style="width:200px; border-radius:18px; background:#167aab; color:white" v-on:click="nuevo()">Nueva Cita</button>
                    </div>
                </div>

                <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NOMBRE MASCOTA</th>
                        <th scope="col">TIPO</th>
                        <th scope="col">FECHA</th>
                        <th scope="col" style="text-align:center">CONSULTAR</th>
                        <th scope="col" style="text-align:center">CANCELAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="citas in ListaCitas" :key="citas.id_cita">
                        <th scope="row">{{ citas.id_cita }}</th>
                        <td>{{ citas.nombreM }}</td>
                        <td v-if="citas.Tipo == 1">CHEQUEO</td>
                        <td v-if="citas.Tipo == 2">ANALISIS</td>
                        <td v-if="citas.Tipo == 3">GENERAL</td>
                        <td v-if="citas.Tipo == 4">URGENCIA</td>
                        <td>{{ citas.Fecha }}</td>
                        <td style="text-align:center; width:200px;"><button id="btncancelar" class="btn btn-warning" v-on:click="goToConsultar(citas.id_cita)">Consultar</button></td>
                        <td style="text-align:center; width:190px;"><button id="btncancelar" class="btn btn-danger" v-on:click="cancelar(citas.id_cita)">Eliminar</button></td>
                        
                    </tr>
            
                </tbody>
                </table>

            </div>
        </div>
        <br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
        <Footer/>
    </div>
</template>


<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:"Dashboard",
    data(){
        return {
            ListaCitas:null,
            pagina:1,
            URL:process.env.VUE_APP_API_HOST
        }
    },
    components: {
        Header,
        Footer
    },
  async mounted() {
      if (localStorage.token == "" || !localStorage.token){
            this.$router.push('/');
        }
        this.consultar();
  },methods:{
            consultarMascota(id){
                this.$router.push('/editar/' + id);
            },
            nuevo(){
                this.$router.push('/nuevo');
            },
            cancelar(id){
                 axios
                    .put(this.URL+'citas/changeStatus/'+id,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                            }
                    })
                        .then(response => {
                        console.log(response)
                        this.consultar();

                    })
                    .catch( e=> console.log(e))
            },consultar(){
                axios.get(this.URL+"citasCompleta",{
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                            }
                    }).then( data =>{
                        console.log(data)
                        this.ListaCitas = data.data;
                    });
            },
        goToConsultar($id){
        this.$router.push('/consulta/'+$id);
      }
    },
    
}
</script>


<style  scoped>
    .izquierda{
        text-align: left;
    }
    #btncancelar{
        width:190px;
        
        
    }
</style>
