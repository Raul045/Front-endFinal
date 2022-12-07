<template>
  <div>
    <Header/>
    <br>
    <br>
    <br>
    <div class="container">
      <br />
      <div class="row">
        <div class="col-12 text-center">
          <div class="card mb-3" style="max-width: 440px; border-radius: 20px ;padding: 0.8em">
            <div class="row g-0">
              <div class="blog-card">
                <div class="meta">
                  <div class="photo">
                    <img style="width: 300px; height: 100%" alt="" src="../../assets/rulasRutineAssets/FondoNivel.jpg"/>
                  </div>
                </div>
                <div class="description">
                  <p class="card-text">Tu experiencia: {{userLevel.user_experience}}</p>
                  <p class="card-text">Tu nivel: {{userLevel.nivel_name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="col-md text-center">
          <button class="btn btn-info" id="btnmas" v-on:click="changeStatus()">{{buttonText}}</button>
        </div>
      </div>
      <br />
      <div class="row" v-if="moreInfo">
        <div class="col-md text-center">
          <img
            src="../../assets/rulasRutineAssets/Nuevo.png"
            id="imgBasico"
            alt=""
          />
          <p>nivel Nuevo de 1 a 49 exp</p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            Mostrar mas
          </button>
          <br /><br />
        </div>
        <div class="col-md text-center">
          <img
            src="../../assets/rulasRutineAssets/novato.png"
            id="imgBasico"
            alt=""
          />
          <p>nivel Novato de 50 a 99 exp</p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            Mostrar mas
          </button>
          <br /><br />
        </div>
        <div class="col-md text-center">
          <img
            src="../../assets/rulasRutineAssets/principiante.png"
            id="imgBasico"
            alt=""
          />
          <p>nivel Nuevo de 100 a 149 exp</p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            Mostrar mas
          </button>
          <br /><br />
        </div>
        <div class="col-md text-center">
          <img
            src="../../assets/rulasRutineAssets/Avanzado.png"
            id="imgBasico"
            alt=""
          />
          <p>nivel Nuevo de 150 a 199 exp</p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            Mostrar mas
          </button>
          <br /><br />
        </div>
        <div class="col-md text-center">
          <img
            src="../../assets/rulasRutineAssets/Experto.png"
            id="imgBasico"
            alt=""
          />
          <p>nivel Nuevo de 200 a 249 exp</p>
          <br>
          <br>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            Mostrar mas
          </button>
          <br /><br />
        </div>
        <div class="col-md text-center">
          <img
            src="../../assets/rulasRutineAssets/Maximus.png"
            id="imgBasico"
            alt=""
          />
          <p>nivel Nuevo de 250 a 99999 exp</p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            Mostrar mas
          </button>
          <br /><br />
        </div>
      </div>
    </div>
    <br />
    <!-- Falta Descripciones de los niveles -->
    <div
      class="offcanvas offcanvas-start"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
          Informacion acerca del nivel
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
        
        </button>
      </div>
      <div class="offcanvas-body">
        <!-- Aqui va la descripcion -->
        <p></p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
/**
 * Importaciones
 */
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "nivelesView",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      userLevel: {},
      pesos: "",
      error: false,
      error_msg: "",
      moreInfo: false,
      buttonText: "ver mas",
      URL: process.env.VUE_APP_API_HOST,
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
    this.getLevel();
  },
  methods: {
    getLevel() {
      axios
        .get(this.URL + "levels/get_user_level", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          this.userLevel = response.data;
          console.log(this.userLevel);
        });
    },
    changeStatus() {
      if (this.moreInfo) {
        this.moreInfo = false;
        this.buttonText = "ver mas";
      } else {
        this.moreInfo = true;
        this.buttonText = "ver menos";
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.container {
  font-family: "Bebas Neue";
}
.img-fluid {
  width: 90%;
}
#imgBasico {
  width: 300px;
}

.blog-card {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.6%;
  background: #fff;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
}
.blog-card a {
  color: inherit;
}
.blog-card a:hover {
  color: #5ad67d;
}
.blog-card:hover .photo {
  transform: scale(1.3) rotate(3deg);
}
.blog-card .meta {
  position: relative;
  z-index: 0;
  height: 200px;
}
.blog-card .photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: auto;
  background-position: center;
  transition: transform 0.2s;
}
.blog-card .details,
.blog-card .details ul {
  margin: auto;
  padding: 0;
  list-style: none;
}
.blog-card .details {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  margin: auto;
  transition: left 0.2s;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  width: 100%;
  font-size: 0.9rem;
}
.blog-card .details a {
  text-decoration: dotted underline;
}
.blog-card .details ul li {
  display: inline-block;
}

.blog-card .description {
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 1;
}
.blog-card .description h1,
.blog-card .description h2 {
  font-family: Poppins, sans-serif;
}
.blog-card .description h1 {
  line-height: 1;
  margin: 0;
  font-size: 1.7rem;
}
.blog-card .description h2 {
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  color: #a2a2a2;
  margin-top: 5px;
}
.blog-card .description .read-more {
  text-align: right;
}
.blog-card .description .read-more a {
  color: #dfb1a6;
  display: inline-block;
  position: relative;
}

.blog-card .description .read-more a:hover:after {
  margin-left: 5px;
  opacity: 1;
}
.blog-card p {
  position: relative;
  margin: 1rem 0 0;
}
.blog-card p:first-of-type {
  margin-top: 1.25rem;
}
.blog-card p:first-of-type:before {
  content: "";
  position: absolute;
  height: 5px;
  background: #dfb1a6;
  width: 35px;
  top: -0.75rem;
  border-radius: 3px;
}
.blog-card:hover .details {
  left: 0%;
}

@media (min-width: 640px) {
  .blog-card {
    flex-direction: row;
    max-width: 700px;
  }
  .blog-card .meta {
    flex-basis: 40%;
    height: auto;
  }
  .blog-card .description {
    flex-basis: 60%;
  }
  .blog-card .description:before {
    transform: skewX(-3deg);
    content: "";
    background: #fff;
    width: 30px;
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
  .blog-card.alt {
    flex-direction: row-reverse;
  }
  .blog-card.alt .description:before {
    left: inherit;
    right: -10px;
    transform: skew(3deg);
  }
  .blog-card.alt .details {
    padding-left: 25px;
  }
}


#btnmas,
#btnmas::after {
 padding: 16px 20px;
 font-size: 18px;
 background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
 border: 0;
 color: #fff;
 letter-spacing: 3px;
 line-height: 1;
 box-shadow: 6px 0px 0px #00e6f6;
 outline: transparent;
 position: relative;
}

#btnmas::after {
 --slice-0: inset(50% 50% 50% 50%);
 --slice-1: inset(80% -6px 0 0);
 --slice-2: inset(50% -6px 30% 0);
 --slice-3: inset(10% -6px 85% 0);
 --slice-4: inset(40% -6px 43% 0);
 --slice-5: inset(80% -6px 5% 0);
 content: "HOVER ME";
 display: block;
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: linear-gradient(45deg, transparent 3%, #00e6f6 3%, #00e6f6 5%, #ff013c 5%);
 text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
 clip-path: var(--slice-0);
}

#btnmas:hover::after {
 animation: 1s glitch;
 animation-timing-function: steps(2, end);
}

@keyframes glitch {
 0% {
  clip-path: var(--slice-1);
  transform: translate(-20px, -10px);
 }

 10% {
  clip-path: var(--slice-3);
  transform: translate(10px, 10px);
 }

 20% {
  clip-path: var(--slice-1);
  transform: translate(-10px, 10px);
 }

 30% {
  clip-path: var(--slice-3);
  transform: translate(0px, 5px);
 }

 40% {
  clip-path: var(--slice-2);
  transform: translate(-5px, 0px);
 }

 50% {
  clip-path: var(--slice-3);
  transform: translate(5px, 0px);
 }

 60% {
  clip-path: var(--slice-4);
  transform: translate(5px, 10px);
 }

 70% {
  clip-path: var(--slice-2);
  transform: translate(-10px, 10px);
 }

 80% {
  clip-path: var(--slice-5);
  transform: translate(20px, -10px);
 }

 90% {
  clip-path: var(--slice-1);
  transform: translate(-10px, 0px);
 }

 100% {
  clip-path: var(--slice-1);
  transform: translate(0);
 }
}

</style>



