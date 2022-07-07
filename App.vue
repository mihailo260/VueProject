<template>
  <div id="app">
    <div class="back-drop" v-if="addExpenses"></div>
    <div class="back-drop" v-if="editUser"></div>
    <div class="back-drop" v-if="addBalance"></div>
    <div class="back-drop" v-if="singleCategoryClicked"></div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "addExpenses",
      "editUser",
      "addBalance",
      "singleCategoryClicked",
    ]),
  },
  methods: {
    ...mapActions(["checkSession"]),
  },
  mounted() {
    this.checkSession();
    setInterval(() => {
      this.checkSession();
    }, 1000 * 19 * 60);
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&family=IBM+Plex+Sans:wght@200&family=Oswald&family=Spectral:wght@500&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  user-select: none;
}
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f3f4f6;
  min-height: 100vh;
  /* background: #FC5C7D;  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(to right, #6A82FB, #FC5C7D);  /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to right, #6A82FB, #FC5C7D); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  /* height: 100vh; */
  /* overflow-x: hidden; */
}
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&family=Oswald&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&family=IBM+Plex+Sans:wght@200&family=Open+Sans&family=Oswald&family=Spectral:wght@500&display=swap");
input {
  outline: none;
}
.text-data {
  font-weight: 900;
  width: 70%;
  text-align: center;
}
.text-data > h2 {
  margin: 20px 0;
}
.register-form{
  display: flex;
  
  align-items: center;
  justify-content: center;
}
button {
  border-radius: 10px;
  padding: 10px;
  width: 70%;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  font-size: 1.5em;
}
button:hover {
  border-color: #0255ad;
  opacity: 0.7;
}
.center-form {
  background-color: rgba(255, 255, 255, 0.7);
  width: 50%;
  margin: 0 auto;
  border-radius: 15px;
  padding: 50px 0;
  
}
.center-form:hover {
  background-color: rgba(255, 255, 255, 1);
}
.form-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-data > input {
  background-color: rgb(240, 238, 238);
  width: 70%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 1em;
  border: 1px solid rgb(196, 192, 192);
  box-shadow: inset 2px 2px 2px 2px rgb(196, 192, 192);
}
.msg-error {
  color: red;
  font-size: 1em;
  padding: 5px;
  font-family: "Fira Sans", sans-serif;
  width: 70%;
}
svg {
  width: 10%;
  height: 10%;
}
.checkmark {
  stroke: green;
  stroke-dashoffset: 745.74853515625;
  stroke-dasharray: 745.74853515625;
  animation: dash 2s ease-out forwards infinite;
}
.back-drop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 3;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 745.74853515625;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
