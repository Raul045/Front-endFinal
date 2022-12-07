<template>
<div>
    <Header/>
    <br>
    <ModalHelp/>
    <br>

    <div class="container">

    </div>

    <div class="container">
          <br>
            <div align="left"><h2>USUARIOS</h2></div>

            <div class="container izquierda">
                <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">NOMBRE VETERINARIO</th>
                        <th scope="col">CORREO</th>
                        <th scope="col">DIRECCION</th>
                        <th scope="col">TELEFONO</th>
                        <th scope="col">ROLL</th>
                        <th scope="col">ACTUALIZAR</th>
                        <th scope="col">ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="veterinarios in veterinarios" :key="veterinarios.id">
                        <td>{{ veterinarios.name }}</td>
                        <td>{{ veterinarios.email }}</td>
                        <td>{{ veterinarios.direccion }}</td>
                        <td>{{ veterinarios.telefono }}</td>
                        <td v-if="veterinarios.tipo == 0">ADMINISTRADOR</td>
                        <td v-if="veterinarios.tipo == 1">VETERINARIO</td>
                        <td v-if="veterinarios.tipo == 2">ASISTENTE</td>
                    </tr>
            
                </tbody>
                </table>

            </div>

        </div>
    <br>
    <Footer/>
</div>
</template>






<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:"AdminBash",
    components: {
        Header,
        Footer,
    },
    data(){
        return{
            user:"",
            err:'',
            veterinarios:"",
            URL:process.env.VUE_APP_API_HOST,
        }
    },
    async mounted() {
      if (localStorage.token == "" || !localStorage.token){
            this.$router.push('/');
        }
        this.getVeterinarios();
    },methods:{
           getUserValidated(){
              axios
                .get(process.env.VUE_APP_API_HOST+ 'us/Perfil' ,{
                headers: {
                      'Authorization': `Bearer ${localStorage.token}`
                        }
                })
                  .then(response => {
                    this.user = response.data.Perfil
                    this.returnToValidated(response.data.Perfil);
                  })
                  .catch( e=> this.err=e)
            }, 
            getVeterinarios(){
                axios.get(this.URL+"usr/veterinarios",{
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                            }
                    }).then( data =>{
                        console.log(data)
                        this.veterinarios = data.data.Usuarios;
                    });
            }
    }
    
}
</script>






<style scoped>

.izquierda{
    text-align: left;
}
body {
  background: linear-gradient(to right, #D74177, #FFE98A);
  font-family: Helvetica;
  text-align: center;
  color: white;
}

.card {
  box-sizing: border-box;
  padding: 5px 5px 5px 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 10px #31C5D7;
  transition: width 2s, background-color 1s, box-shadow 1s;
  border-radius: 10px;
  color: black;
}

.card:hover {
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 1);
}

.wrapper {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

a {
  text-decoration: none;
}

#button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: linear-gradient(to right, #D74177, #FFE98A);
  width: 100px;
  border-radius: 10px;
  color: white;
  font-size: 20px;
}

#name {
  font-size: 24px;
}
</style>