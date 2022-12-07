import Vue from "vue";
import VueRouter from "vue-router";

//RulasRutine
import Login from "../views/viewsRulasRutine/login.vue";
import Registro from "../views/viewsRulasRutine/register.vue";
import altaEjercicios from "../views/viewsRulasRutine/altaEjercicios.vue";
import altaEntrenadores from "../views/viewsRulasRutine/altaEntrenadores.vue";
import makeRoutine from "../views/viewsRulasRutine/makeRoutine.vue";
import Niveles from "../views/viewsRulasRutine/niveles.vue";
import tablaUsuariosVue from "../views/viewsRulasRutine/tabla-usuarios.vue";
import tablaEjerciciosVue from "@/views/viewsRulasRutine/tabla-ejercicios.vue";
import Profile from "../views/viewsRulasRutine/perfil.vue";
import Historial from "../views/viewsRulasRutine/historial.vue";
import UpdateUser from "../views/viewsRulasRutine/editarPerfil.vue";
import RegistrarPeso from "../views/viewsRulasRutine/registrarPeso.vue";
import Felicidades from "../views/viewsRulasRutine/felicidades.vue";
import Blog from "../views/viewsRulasRutine/Blog.vue";
import RutinaEjercicio from "@/views/viewsRulasRutine/Rutina-Ejercicio.vue";
import prueba from "@/views/viewsRulasRutine/prueba.vue";
import EditarEjercicio from "../views/viewsRulasRutine/editarEjercicio.vue";
import EditarUsuario from "../views/viewsRulasRutine/editarUsuario.vue";
import RutinaNueva from "../views/viewsRulasRutine/registrarRutinaNueva.vue";

//other
import notfount from "../views/error404.vue";
/*import Dashboard from "../views/Dashboard.vue";
import Nuevo from "../views/NuevaCita.vue";
import clientes from "../views/Clientes.vue";
import mascotas from "../views/Mascotas.vue";
import perfil from "../views/perfil.vue";
import admin from "../views/Administrador.vue";
import consulta from "../views/ConsultaMascota.vue";
import ejemplo from "../views/Ejemplo.vue";
import servicios from "../views/Servicios.vue";
import alerta from "../views/testAlertas.vue";*/
//import Consultar from '../views/ConsultaMascota.vue'

Vue.use(VueRouter);

const routes = [
  /**
   * Rutas Rulas Rutine
   */
  {
    path: "/",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/rutinaNueva",
    name: "rutinaNueva",
    component: RutinaNueva,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/prueba",
    name: "prueba",
    component: prueba,
  },
  {
    path: "/register",
    name: "register",
    component: Registro,
  },
  {
    path: "/Rutina-Ejercicio",
    name: "Rutina-Ejercicio",
    component: RutinaEjercicio,
  },
  {
    path: "/altaEjercicios",
    name: "altaEjercicios",
    component: altaEjercicios,
  },
  {
    path: "/altaEntrenadores",
    name: "altaEntrenadores",
    component: altaEntrenadores,
  },
  {
    path: "/makeRoutine",
    name: "makeRoutine",
    component: makeRoutine,
  },
  {
    path: "/niveles",
    name: "niveles",
    component: Niveles,
  },
  {
    path: "/register_weight",
    name: "register_weight",
    component: RegistrarPeso,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/history",
    name: "history",
    component: Historial,
  },
  {
    path: "/update_profile",
    name: "update_profile",
    component: UpdateUser,
  },
  {
    path: "/congratulations",
    name: "congratulations",
    component: Felicidades,
  },
  {
    path: "/editarEjercicio/:id",
    name: "editarEjercicio",
    component: EditarEjercicio,
  },
  {
    path: "/editarUsuario/:id",
    name: "editarUsuario",
    component: EditarUsuario,
  },
  {
    path: "/tabla-ejercicios",
    name: "tabla-ejercicios",
    component: tablaEjerciciosVue,
  },
  {
    path: "/tabla-usuarios",
    name: "tabla-usuarios",
    component: tablaUsuariosVue,
  },

  /**
   * No Mover Aqui
   *
   * Otro Proyecto
   */
  /*{
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/clientes",
    name: "clienteBash",
    component: clientes,
  },
  {
    path: "/mascotas",
    name: "mascotasBash",
    component: mascotas,
  },
  {
    path: "/consulta/:id",
    name: "consultaMascota",
    component: consulta,
  },
  {
    path: "/servicios",
    name: "ServicioBash",
    component: servicios,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: perfil,
  },
  {
    path: "/admin",
    name: "AdminBash",
    component: admin,
  },
  {
    path: "/alerta",
    name: "controlAlerta",
    component: alerta,
  },
  {
    path: "/formTest",
    name: "formExample",
    component: ejemplo,
  },
  {
    path: "/nuevo",
    name: "Nuevo",
    component: Nuevo,
  },*/
  {
    path: "*",
    name: "error",
    component: notfount,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
