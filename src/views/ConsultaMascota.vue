<template>    
   <div>
    <Header />
   <div class="container">
     <h1>Consulta</h1>
     <br>
     <div class="alert alert-danger" role="alert" v-if="error">
            {{error_msg}}
    </div>
    <form  v-on:submit.prevent="consultar">
        <div class="row">
            <p for="" align="left" style="font-size:30px">Datos Usuario</p>
            <div class="row">
              <div class="col-6">
                <p style="font-size: 24px;"><label>Nombre</label></p>
              </div>
              <div class="col-6">
                <p style="font-size: 24px;"><label>Contacto</label></p>
              </div>
            </div>
            <div class="inputc col-6">
              <input type="text" style="color:black" placeholder="Dueño..." disabled :value="cita.dueno">
            </div>
            <div class="input col-6">
                <input type="text" placeholder="Contacto..." style="color:black" disabled :value="cita.contacto">
            </div>
        </div>
        <br>
        <div class="row">
          <p for="" align="left" style="font-size:30px">Datos Mascota</p>
          <div class="row">
              <div class="col-6">
                <p style="font-size: 24px;"><label>Nombre</label></p>
              </div>
              <div class="col-6">
                <p style="font-size: 24px;"><label>Raza</label></p>
              </div>
            </div>
          <div class="inputc col-6 ">
                    <input type="text" style="color:black" placeholder="Mascota..." disabled :value="cita.mascota">
            </div>
            <div class="inputc col-6 ">
                    <input type="text" style="color:black" placeholder="Raza Mascota..." disabled :value="cita.raza">
            </div>
        </div>
        <br>
        <div class="row">
          <div class="row">
              <div class="col-6">
                <p style="font-size: 24px;"><label>Edad</label></p>
              </div>
              <div class="col-6">
                <p style="font-size: 24px;"><label>Tipo</label></p>
              </div>
            </div>
          <div class="inputc col-6 ">
                    <input type="text" style="color:black" placeholder="Edad Mascota..." disabled :value="cita.edad">
            </div>
            <div class="inputc col-6 ">
                    <input type="text" style="color:black" placeholder="Tipo Animal..." disabled :value="cita.tipo_masc">
            </div>
        </div>
        <br>
        <div class="row">
            <label for="" align="left" style="font-size:30px">Datos Cita</label>
            <div class="input col-12" >
                <input type="text" style="color:black" value="CHEQUEO" disabled v-if="cita.tipo == 1">
                <input type="text" style="color:black" value="ANALISIS" disabled v-if="cita.tipo == 2">
                <input type="text" style="color:black" value="GENERAL" disabled v-if="cita.tipo == 3">
                <input type="text" style="color:black" value="URGENCIA" disabled v-if="cita.tipo == 4">
            </div>
        </div>
        <br>
        <div class="row">
            <div class="inputc col-12">
                <input type="text" style="color:black" placeholder="Datos clinicos..." v-model="nuevaConsulta.diagnostico">
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-2">
                <button type="submit" class="btn btn-outline-success" id="boton">Enviar</button>
            </div>
            <div class="col-2">
                <button class="btn btn-outline-danger" id="boton"  v-on:click="salir()">Cancelar</button>
            </div>
            <!--<div class="col-7">
                <button class="btn btn-outline-warning" id="boton"  v-on:click="downloadPDF(cita.mid)">Enviar y Generar Historial Clinico</button>
            </div>-->
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
import axios from "axios";
import jsPDF from "jspdf";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name:"consultaMascota",
  data() {
    return{
      todos:null,
      botonText:'Agregar nuevo registro',
      idCita:"",
      error:false,
      error_msg:"",
      nuevaConsulta:{diagnostico:null,fecha:null,cita:null},
      cita:{mid:1,id:5,dueno:"Ruben Hernandez",mascota:"Canelo",contacto:"8713452055",tipo:2},
      URL:process.env.VUE_APP_API_HOST,

      response:"",
      mascotaHC:{nombre:"",tipo:"",raza:"",edad:""},
      duenoHC:{nombre:"",telefono:"",direccion:""},
    }
  }, 
  async mounted() {
    if (localStorage.token == "" || !localStorage.token){
            this.$router.push('/');
        }
    this.idCita = this.$route.params.id;
    this.getOne()
  },
  components:{
        Header,
        Footer
    },
  methods:{
    print(){
      console.log(this.clienteNuevo)
    },
    getOne(){
      axios
        .get(this.URL+'h_c/'+this.idCita,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
          .then(response => {
            console.log(response.data[0])
            this.cita = response.data[0]
            this.cambio = true
          })
          .catch( e=> console.log(e))
    },consultar(){

      if(this.nuevaConsulta.diagnostico =="" || this.nuevaConsulta.diagnostico == null ){
        console.log("cancelo")
        this.error=true;
        this.error_msg ="!!TODOS LOS CAMPOS SON NECESARIOS!!"        
        return
      }
      this.error=false;
      this.nuevaConsulta.fecha = new Date().toLocaleDateString();
      this.nuevaConsulta.cita = this.idCita;
      console.log(this.nuevaConsulta)
      
      axios
        .post(this.URL+'h_c',this.nuevaConsulta,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
          .then(response => {
            console.log(response.data)
            this.cancelar(this.idCita)
            this.salir();
          })
          .catch( e=> console.log(e))
    },
    salir(){
      this.$router.push('/dashboard')
    },
    cancelar(id){
                 axios
                    .put(this.URL+'citas/changeStatus/'+id,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                            }
                    }).catch( e=> console.log(e))
            },sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
  });
},




    downloadPDF(mascota_id){

var pdf = new jsPDF();
          var y = 49;
          var dato = ""
          var aux =0;
          var aux2 =0;
          var logo = "data:image/png;base64,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"
          pdf.setFontSize("10");




          axios
      .get(this.URL+'hc_completo/'+mascota_id,{
        headers: {
              'Authorization': `Bearer ${localStorage.token}`
                }
        })
        .then(response => {
          console.log(response.data)
          this.response = response.data
          console.log(this.response)

          this.response.forEach(i => {
              this.mascotaHC.nombre=i.nMascota
              this.mascotaHC.edad=i.eMascota
              this.mascotaHC.tipo=i.tMascota
              this.mascotaHC.raza=i.rMascota
              this.duenoHC.nombre=i.nombreCliente
              this.duenoHC.telefono=i.tCliente
              this.duenoHC.direccion=i.dCliente
          })

          


          

         


          pdf.text("Datos clinicos de la mascota: "+this.mascotaHC.nombre,10,7);
  pdf.text("Edad: "+this.mascotaHC.edad+" Animal: "+this.mascotaHC.tipo+" Raza: "+this.mascotaHC.raza,20,14);
          pdf.text("Datos Dueño: "+this.duenoHC.nombre,10,21);
          pdf.text("Telefono: "+this.duenoHC.telefono,20,28);
          pdf.text("Direccion: "+this.duenoHC.direccion,20,35);
          
          pdf.text("-----------------------------------------------------------------------------"+
          "-------------------------------------------------------------------",10,42);
          pdf.addImage(logo, 'JPEG', 170,1,35,35)
          this.response.forEach(i => {
            if (y > 280) {
              y = 10;
              pdf.addPage();
            }
            pdf.text(10, y, "Fecha de la cita: "+i.fHC);
            y = y + 7;
            for(var a=0; a<i.dHC.length; a++){
              aux++
              dato=dato+i.dHC[a]
              if (y > 280) {
              y = 10;
              pdf.addPage();
            }

              if(aux >=125){
                pdf.text(12, y, dato);
                y = y + 7;
                dato=""
                aux=0
                aux2=1
              }
              
            }
            if(aux2 == 0){
              pdf.text(12, y, dato);
                y = y + 7;
                dato=""
                aux=0
            }
            if(dato != "" && aux2 == 1){
              pdf.text(12, y, dato);
                y = y + 7;
                dato=""
                aux=0
            }
            pdf.text("-----------------------------------------------------------------------------"+
          "-------------------------------------------------------------------",10,y);
            y = y + 7;
            aux2=0
            //pdf.text(i.fecha,10,10);
            //pdf.text(i.datos,10,10);
            console.log(i.dHC);
          });

          pdf.save("HistorialCLinico"+this.mascotaHC.nombre);




        })
        .catch(e => console.log(e))
        }

    

  }
  
}
</script>



<style>
body {
	margin: 50px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: #fff;
	font-family: 'Open Sans', sans-serif;
	color: #610B0B;
 }
 /* Parte del select */
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
 .select {
	position: relative;
	display: flex;
	width: 20em;
	height: 3em;
	line-height: 3;
	overflow: hidden;
	border-radius: .25em;
 }
 .select::after {
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
 .select:hover::after {
	color: #23b499;
 }
/* Parte de los inputs */
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
 
 .input {
	position: relative;
	display: flex;
	width: 20em;
	height: 3em;
	line-height: 3;
	overflow: hidden;
	border-radius: .25em;
 }
 .input::after {
	position: absolute;
	top: 0;
	right: 0;
	padding: 0 1em;
	cursor:pointer;
	pointer-events:none;
	transition:.25s all ease;
	border-radius: 15px;
 }
 .input:hover::after {
	color: #23b499;
 }
 /* datos clinicos */
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
	width: 40em;
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
 /* Parte de los botones */
#boton{
	width: 160px;
	height: 40px;
	border-radius: 10px;
}
</style>




