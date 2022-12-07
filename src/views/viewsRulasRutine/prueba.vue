<template>
    <div>
        <Header></Header>
    </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'

export default {
  name: "PruebaView",
  components: {
    Header
  },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      error_msg: "",
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
  },
  methods: {
    login() {
      let json = {
        email: this.email,
        password: this.password,
      };
      axios.post(this.URL + "usr/log_in", json).then((data) => {
        console.log(data);
        console.log(data);
        localStorage.token = data.data.token;
        this.error = false;
        this.$router.push("/dashboard");
      });
    },
  },
};
</script>