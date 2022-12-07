<template>
<div>
    <Header/>
    <div class="container">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button   style=" margin: 0 auto; width: 420px; height: 60px;" v-on:click="logout()" class="btn3" >
            Cerrar Sesion
        </button> </div>
        
    <br>
    <ModalHelp/>
    <br>

    <div class="container">
        <div class="card1">
            <div class="img1">
                <img src="../assets/User.png" alt="">
            </div>
            <div class="content1">
                <h2 class="h2c">{{user.name}}</h2>
                <br>
                <p class="pcard">{{user.email}}</p>
                <p class="pcard">{{user.direccion}}</p>
                <p class="pcard">{{user.telefono}}</p>
                <div class="center1">
                
                </div>
                <div>
                    <button class="btn1 col-8" v-if="user.tipo == 1">Veterinario</button>
                    <button class="btn1 col-8" v-if="user.tipo == 2">Asistente</button>
                    <button class="btn2 col-8" v-if="user.tipo == 0">Administrador</button>
                </div>
                
            </div>
    </div>
        <div class="wrapper">

        </div>
    </div>

 
    <br>

    <div class="container">
          <br>
            <div align="left"><h2>VETERINARIOS DISPONIBLES</h2></div>

            <div class="container izquierda">
                <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">NOMBRE VETERINARIO</th>
                        <th scope="col">CORREO</th>
                        <th scope="col">DIRECCION</th>
                        <th scope="col">TELEFONO</th>
                        <th scope="col">ROLL</th>
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
    name:"Perfil",
    components: {
        Header,
        Footer,
    },
    data(){
        return{
            user:"2",
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
        this.getUser();
    },methods:{
           getUser(){
              axios
                .get(process.env.VUE_APP_API_HOST+ 'usr/perfil' ,{
                headers: {
                      'Authorization': `Bearer ${localStorage.token}`
                        }
                })
                  .then(response => {
                    this.user = response.data.Perfil
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
            },logout(){
      localStorage.token = ''
      this.$router.push('/');
    },
    }
    
}
</script>






<style scoped>

.izquierda{
    text-align: left;
}
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.card1{
    width: 420px;
    height: 380px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    display: flex;
    cursor: pointer;
    justify-content: center;
    box-shadow: 0 0 20px rgba(0, 0,0, 0.13);
    left: 36%;
}
.card1::before{
    content: "";
    position: absolute;
    top: 2%;
    width: 95%;
    height: 120px;
    z-index: 1;
    border-radius: 10px 10px 0 0 ;
    background: #167aab;
    box-shadow: 0 0 20px rgba(0, 0,0, 0.13);
    transform-origin: bottom;
    transition: transform .4s;
}
.card1:hover::before{
    transform: translateY(-5px) scaleY(1.2);
}
.card1 .img1{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    z-index: 10;
    transform: translateY(50px);
    border: 10px solid #fff;
    overflow: hidden;
    position: absolute;
    background: #fff;
}
.card1 .img1 img{
    width: 120%;
    height: 120%;
    transform: translate(-8%,-8%);
}
.content1{
    width: 100%;
    height: 100%;
    transform: translateY(170px);
    display: flex;
    flex-direction: column;
    z-index: 20;
    align-items: center;
    font-size: 14px;
}
.content1 p{
    margin:  0 0;
}
.center1{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
}
.btn1{
    width: 95%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    transform: translateY(10px);
    background: #59CE8F;
    color: #fff;
    font-weight: 600;
    box-shadow: 0 0 20px rgba(0, 0,0, 0.13);
    cursor: pointer;
}
.btn2{
    width: 95%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    transform: translateY(10px);
    background: #af2424;
    color: rgb(255, 255, 255);
    font-weight: 600;
    box-shadow: 0 0 20px rgba(77, 10, 10, 0.13);
    cursor: pointer;
}
.btn3{
    width: 95%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    transform: translateY(10px);
    background: #ff0000;
    color: rgb(255, 255, 255);
    font-weight: 600;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.13);
    cursor: pointer;
}
.h2c{
    font-size: 20px;
}
</style>