<template>
  <div>
    <div class="container">
      <Header></Header>
      <br>
      <br>
      <div class="mt-4">
        <h3 class="text-light">usuarios</h3>
        <div class="btns text-center">
          <button class="btn btn-info" v-on:click="goToPage('/altaEntrenadores')">¿Quieres agregar un entrenador?</button>
        </div>
        <br><br>
        <div class="table-responsive text-center">
          <table class="table text-light">
            <thead class="text-center">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Edad</th>
                <th scope="col">Email</th>
                <th scope="col">Experiencia</th>
                <th scope="col">Rol</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="usuario in usuarios" :key="usuario.id">
                <th scope="row">{{usuario.id}}</th>
                <td>{{usuario.name}}</td>
                <td>{{usuario.lastName}}</td>
                <td>{{usuario.age}}</td>
                <td>{{usuario.email}}</td>
                <td>{{usuario.experience}}</td>
                <td v-if="(usuario.fk_roll == 1)">Comun</td>
                <td v-if="(usuario.fk_roll == 2)">Entrenador</td>
                <td v-if="(usuario.fk_roll == 3)">Administrador</td>
                <td class="form-group">
                  <button
                    class="btn btn-info mt-1"
                    style="font-size: auto; width: auto; margin-right: 10px"
                    v-on:click="goToPage(`/editarUsuario/${usuario.id}`)"
                  >
                    editar
                  </button>
                  <button class="btn btn-danger mt-1" v-on:click="deleteUser(usuario.id)">eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <pagination-controls (pageChange)="page = $event" previousLabel="Anterior"
                            nextLabel="Siguente"></pagination-controls> -->
        </div>
      </div>
    </div>
    <br /><br /><br />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "UsuariosView",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      usuarios: null,
    };
  },
  async mounted() {
    if (localStorage.token) {
      console.log("existe");
    } else {
      localStorage.token = "";
    }
    if (localStorage.token == "" || !localStorage.token) {
        console.log("no logeado");
      this.$router.push("/");
    }
    this.getUsuarios();
  },
  methods: {
    goToPage(page) {
      this.$router.push(page);
    },
    getUsuarios() {
      axios
        .get(process.env.VUE_APP_API_HOST + "usr/get_all", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.usuarios = response.data;
        })
        .catch((e) => (this.err = e));
    },
    deleteUser(id) {
      axios
        .delete(process.env.VUE_APP_API_HOST + "usr/delete_user/"+id, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.getUsuarios();
        })
        .catch((e) => (this.err = e));
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.container {
  font-family: "Bebas Neue";
  width: auto;
}
</style>
