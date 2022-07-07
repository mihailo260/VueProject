<template>

  <div>
    <div class="register-form">
      <div class="center-form">
        <div class="form-data">
          <div class="text-data">
            <h1 style="font-size: 3em">Login</h1>
            <h2 style="margin-top: 10px">
              Don't have an account?
              <router-link to="/register">Sign Up</router-link>
            </h2>
          </div>
          <input
            type="text"
            placeholder="Email"
            v-model.trim="loginData.usr_email"
            id="email"
            @blur="validateEmail"
            ref="email"
          />
          <p class="msg-error">{{ emailMsg }}</p>
          <input
            type="password"
            placeholder="Password"
            v-model.trim="loginData.usr_password"
            id="password"
            @blur="validatePassword"
            ref="password"
            @keypress.enter="login"
          />
          <p class="msg-error">{{ passMsg }}</p>
          <button @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      emailMsg: "",
      passMsg: "",
      loginData: {
        usr_email: "",
        usr_password: "",
      },
    };
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["userLogin"]),
    async login() {
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/auth/login",
        this.loginData
      );
      // console.log(res)
      if (res.data.res == "ok") {
        localStorage.setItem("sid", res.data.sid);
        localStorage.setItem("usr_id", res.data.sqlParams.usr_id);
        localStorage.setItem("usr_name", res.data.sqlParams.usr_name);
        localStorage.setItem("usr_email", res.data.sqlParams.usr_email);
        this.userLogin();
        // console.log(this.isLoggedIn);
        this.$router.push("/home");
      }
      this.loginData = {
        usr_email: "",
        usr_password: "",
      };
    },
    async validateEmail() {
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/checkData",
        { usr_email: this.loginData.usr_email }
      );
      // console.log(res);
      if (res.data.res == "err") {
        this.$refs.email.style.border = "2px solid red";
        this.emailMsg = "User with this email does not exist!";
        return;
      } else {
        this.$refs.email.style.border = "1px solid rgb(196, 192, 192)";
        this.emailMsg = "";
      }
    },
    async validatePassword() {
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/checkData",
        {
          usr_email: this.loginData.usr_email,
          usr_password: this.loginData.usr_password,
        }
      );
      // console.log(res);
      if (res.data.pass == "err") {
        this.$refs.password.style.border = "2px solid red";
        this.passMsg = "Wrong password!";
        return;
      } else {
        this.passMsg = "";
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>


