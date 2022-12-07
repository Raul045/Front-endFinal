<template>
  <div>
    <!-- Footer -->
    <div class="footter">
        <footer class="pie-pagina">
            <div class="grupo-1">
                <div class="box">
                    <figure>
                        <a href="#">
                            <img loading="lazy" src="../assets/rulasRutineAssets/logo.png" alt="Logo de SLee Dw" />
                        </a>
                    </figure>
                </div>
                <div class="box" id="about">
                    <h2 style="font-size: 30px">SOBRE NOSOTROS</h2>
                    <p style="font-size: 20px">
                        No tienes tiempo? no te preocupes Rulas Rutine es una pagina
                        dedicada a brindar servicios de ejercicios desde tu casa
                    </p>
                    <p style="font-size: 20px">
                        Rulas Rutine tiene ejercicios dedicados a cualquier tipo de cuerpo
                        para que puedas entrenar sin lastimarte.
                    </p>
                </div>
                <div class="box">
                    <h2>SIGUENOS</h2>
                    <div class="red-social">
                        <a href="#" class="fa fa-facebook"></a>
                        <a href="#" class="fa fa-instagram"></a>
                        <a href="#" class="fa fa-twitter"></a>
                        <a href="#" class="fa fa-youtube"></a>
                    </div>
                </div>
            </div>
            <div class="grupo-2">
                <small>&copy; 2022 <b>Rulas Rutine</b> - Todos los Derechos
                    Reservados.</small>
            </div>
        </footer>
    </div>
  </div>
</template>


<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
  props: {
    msg: String
  },methods:{
    logout(){
      localStorage.token = ''
      this.$router.push('/');
    },
  }
}
</script>



<style scoped>
.footter {
  position: relative;  
  background: #3C4048;
  width: 100%;
  height: 300px;
  font-family: 'Bebas Neue';
  bottom: 0px;
}

.pie-pagina {
  width: 100%;
  background-color: #0a141d;
}

.pie-pagina .grupo-1 {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  padding: 45px 0px;
}

.pie-pagina .grupo-1 .box figure {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie-pagina .grupo-1 .box figure img {
  width: 250px;
}

.pie-pagina .grupo-1 .box h2 {
  color: #fff;
  margin-bottom: 25px;
  font-size: 20px;
}

.pie-pagina .grupo-1 .box p {
  color: #efefef;
  margin-bottom: 10px;
}

.pie-pagina .grupo-1 .red-social a {
  display: inline-block;
  text-decoration: none;
  width: 45px;
  height: 45px;
  line-height: 45px;
  color: #fff;
  margin-right: 10px;
  background-color: #0d2033;
  text-align: center;
  transition: all 300ms ease;
}

.pie-pagina .grupo-1 .red-social a:hover {
  color: aqua;
}

.pie-pagina .grupo-2 {
  background-color: #0a1a2a;
  padding: 15px 10px;
  text-align: center;
  color: #fff;
}

.pie-pagina .grupo-2 small {
  font-size: 15px;
}

.icon-social {
  transition: 300ms;
  cursor: pointer;
}

.icon-social:hover {
  transform: scale(1.1);
}

@media screen and (max-width:800px) {
  .pie-pagina .grupo-1 {
    width: 90%;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;
    padding: 35px 0px;
  }
}

</style>