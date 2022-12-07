<template>
    <div>
        <div class="container">
            <Header></Header>
            <br><br>
            <div class="mt-4">
                <h3 class="text-light">
                    Ejercicios
                </h3>
                <div class="btns text-center">
                    <button class="btn btn-info" v-on:click="goToPage('/altaEjercicios')">Agregar ejercicio</button>
                </div>
                <br>
                <div class="table-responsive text-center">
                    <table class="table text-light">
                        <thead class="text-center">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Url</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for="ejercicio in ejercicios" :key="ejercicio.id">
                                <th scope="row">{{ejercicio.id}}</th>
                                <td>{{ejercicio.name}}</td>
                                <td>{{ejercicio.description}}</td>
                                <td>{{ejercicio.url}}</td>
                                <td class="form-group">
                                    <button class="btn btn-info mt-1"
                                        style="font-size: auto; width: auto; margin-right: 10px;"
                                        v-on:click="goToPage(`/editarEjercicio/${ejercicio.id}`)">editar</button>
                                        <button class="btn btn-danger mt-1" v-on:click="deleteEjercicio(ejercicio.id)">eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <pagination-controls (pageChange)="page = $event" previousLabel="Anterior"
                            nextLabel="Siguente"></pagination-controls> -->
                </div>
                <br>
                <br>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    components: {
        Header,
        Footer
    },
    data() {
    return {
      ejercicios: null,
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
    this.getEjercicios();
  },
  methods: {
    goToPage(page) {
      this.$router.push(page);
    },
    getEjercicios() {
      axios
        .get(process.env.VUE_APP_API_HOST + "ejercicios/get_all_enabled", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.ejercicios = response.data;
        })
        .catch((e) => (this.err = e));
    },
    deleteEjercicio(id) {
      axios
        .put(process.env.VUE_APP_API_HOST + "ejercicios/disable/"+id, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.getEjercicios();
        })
        .catch((e) => (this.err = e));
    },
  },
};
</script>

<style>

</style>