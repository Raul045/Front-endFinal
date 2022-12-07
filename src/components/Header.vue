<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" style="color: #00ABB3; font-size: 30px;" href="#" v-on:click="goToPage('/login')" v-if="validado == 0">Iniciar Sesion</a>
        <a class="navbar-brand" style="color:#256D85; font-size: 30px;" v-if="(validado == 1)">Bievenido!!</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" style="color: #eaeaee; font-size: 20px;"  id="offcanvasNavbarLabel">Rulas Rutine</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item text-center">
                <h3 v-if="(validado == 1)" style="font-size: 25px; color: #eaeaee;">{{ user.name }}</h3>
              </li>
              <li class="nav-item text-center">
                <a href="/" class="nav-link"><img src="../assets/rulasRutineAssets/logo.png" width="150px" alt=""></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-if="(validado == 0)" href="#">Sobre Nosotros</a>
                <a class="nav-link" href="" v-if="validado == 1"  v-on:click="goToPage('/makeRoutine')">Rutinas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" v-if="validado == 0">Ejercicios</a>
                <a class="nav-link" href="" v-if="validado == 1" v-on:click="goToPage('/history')">Historial</a>
              </li>
              <li v-if="validado == 1" class="nav-item">
                <a class="nav-link" v-on:click="goToPage('/profile')" href="#">Perfil</a>
              </li>
              <li v-if="validado == 1" class="nav-item">
                <a v-on:click="goToPage('/niveles')" class="nav-link" href="#">Nivel: {{userLevel.nivel_name}}</a>
              </li>
              <li v-if="(validado == 0)" class="nav-item">
                <a  class="nav-link" href="#">Comentarios</a>
              </li>
              <li v-if="user.fk_roll == 3 && validado == 1" class="nav-item">
                <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Administrador
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item" href="" v-on:click="goToPage('/tabla-usuarios')">Usuarios</a></li>
                  <li><a class="dropdown-item" href="" v-on:click="goToPage('/tabla-ejercicios')">Ejercicios</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li>
                    <a class="dropdown-item" href="" v-on:click="goToPage('/rutinaNueva')">Crear Rutina</a>
                    <a class="nav-link" href="" v-if="(user.fk_roll == 2 && validado == 1)" v-on:click="goToPage('/rutinaNueva')">Crear Rutina</a>
                  </li>
                </ul>
              </li>
              <hr style="height: 5px; color: #eaeaee;">
              <li v-if="validado == 1" class="nav-item">
                <a href="" v-on:click="logout()">
                  <img src="../assets/rulasRutineAssets/salir.png" width="20px" alt="">
                  <label for=""><p>Salir...</p></label>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "header",
  props: {
    msg: String,
  },
  data() {
    return {
      user:"",
      error: false,
      userLevel:"",
      carrera: "",
      error_msg: "",
      validado: 0,
      usuarioNav: false,
      URL: process.env.VUE_APP_API_HOST,
    };
  },
  async mounted() {
    if (localStorage.token) {
      console.log("existe");
    } else {
      localStorage.token = "";
    }
    if (localStorage.token != "") {
      this.validado = 1;
    } else {
      this.validado = 0;
    }
    this.getLevel();
    this.getPerfil();
  },
  methods: {
    router() {
      this.$router.push("/dashboard");
    },
    logout() {
      localStorage.token = "";
      this.$router.push("/");
    },
    perfil() {
      this.$router.push("/perfil");
    },
    goToPage(page) {
      this.$router.push(page);
    },
    changeStatus() {
      if(this.usuarioNav){
        this.usuarioNav =false;
      }else{
        this.usuarioNav = true;
      }
    },
    getLevel() {
      axios
        .get(this.URL + "levels/get_user_level", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.userLevel = response.data;
          //console.log(this.userLevel);
        });
    },
    getPerfil() {
      axios
        .get(process.env.VUE_APP_API_HOST + "usr/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.user = response.data.Perfil;
        })
        .catch((e) => (this.err = e));
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 99%;
  font-family: "Bebas Neue";
}

a {
  text-decoration: none;
  color: #eaeaea;
}

a:hover {
  color: #23d5ab;
}

li {
  list-style-type: none;
}

.img-user {
  width: 70px;
}

.sub-menu-wrap {
  z-index: 1;
  position: absolute;
  top: 100%;
  right: 70%;
  width: 320px;
  max-height: 500px;
  overflow: hidden;
  transition: max-height 0.5s;
}

.sub-menu {
  background: #3c4048;
  padding: 20px;
  margin: 10px;
  border-radius: 20px;
}

.uer-info {
  display: flex;
  align-items: center;
}

.uer-info h3 {
  font-size: 40px;
  font-weight: 400;
}

.uer-info img {
  display: flex;
  width: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.sub-menu hr {
  border: 0;
  height: 1px;
  width: 100%;
  background: #ccc;
  margin: 15px 0 10px;
}

.sub-menu-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #eaeaea;
  margin: 12px 0;
}

.sub-menu-link p {
  font-size: 25px;
  margin-bottom: -5px;
}

.img-menu {
  width: 40px;
  background: #e5e5e5;
  border-radius: 50%;
  padding: 8px;
  margin-right: 15px;
}
.sub-menu-link img {
  width: 40px;
  background: #e5e5e5;
  border-radius: 50%;
  padding: 8px;
  margin-right: 15px;
}

@media screen and (max-width: 768px) and (min-width: 414px) {
  .sub-menu-wrap {
    right: 55%;
  }
}

@media screen and (max-width: 414px) {
  .sub-menu-wrap {
    right: 15%;
  }
}
</style>
