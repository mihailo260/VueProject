<template>
  <div class="register-form">
    <div class="center-form">
      <div class="form-data">
        <div class="text-data">
          <h1 style="font-size: 3em">Create your account</h1>
          <h2 style="margin-top: 10px">
            Already have an account? <router-link to="/">Sign in</router-link>
          </h2>
        </div>
        <input
          type="text"
          placeholder="Fullname"
          v-model.trim="form_data.usr_name"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          @change="checkEmail()"
          v-model.trim="form_data.usr_email"
          ref="email"
        />
        <p class="msg-error" v-if="emailMsg">{{ emailMsg }}</p>
        <input
          type="password"
          placeholder="Password"
          id="password"
          @change="validatePassword()"
          v-model.trim="form_data.usr_password"
          ref="password"
        />
        <p class="msg-error" v-if="passMsg">{{ passMsg }}</p>
        <input
          type="password"
          placeholder="Confirm password"
          id="confirm-pass"
          @change="validateField"
          v-model.trim="repeatPass"
          ref="confirm"
        />
        <p class="msg-error">{{ confirmMsg }}</p>
        <p class="msg-error" v-if="msg.length > 0">{{ msg }}</p>
        <button @click="signUp">Register</button>
        
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
      isItFalse: false,
      msg: "",
      passMsg: "",
      emailMsg: "",
      confirmMsg: "",
      repeatPass: "",
      form_data: {
        usr_name: "",
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
    async signUp() {
      if (!this.validateField()) {
        // return
      }

      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/auth/signup",
        this.form_data
      );
    //   console.log(res);
      this.repeatPass = "";
      // this.msg = res.data.message
      if (res.data.res == "err") {
        this.isItFalse = true;
      } else {
        this.isItFalse = false;
      }
      let login_data = {
        usr_email: this.form_data.usr_email,
        usr_password: this.form_data.usr_password,
      };
      await this.login(login_data);
      this.userLogin();
      this.form_data = {
        usr_name: "",
        usr_email: "",
        usr_password: "",
      };

    //   console.log(this.isLoggedIn);
      this.$router.push("/home");
    },
    validateField() {
      if (
        this.form_data.usr_name.length < 1 ||
        this.form_data.usr_email.length < 1 ||
        this.form_data.usr_password.length < 1 ||
        this.form_data.usr_name.length > 255 ||
        this.form_data.usr_email.length > 255 ||
        this.form_data.usr_password.length > 255
      ) {
        this.msg = "Empty or too long fields!";
        return false;
      } else {
        this.msg = "";
        if (this.form_data.usr_password != this.repeatPass) {
          this.confirmMsg = "Wrong password confirmation!";
          this.$refs.confirm.style.border = "2px solid red";
          return false;
        }
        this.$refs.confirm.style.border = "1px solid rgb(196, 192, 192)";
        this.confirmMsg = "";
        return true;
      }
    },
    async checkEmail() {
      const pattern =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!pattern.test(this.form_data.usr_email)) {
        this.$refs.email.style.border = "3px solid red";
        this.emailMsg = "Wrong email!";
        return;
      } else {
        this.$refs.email.style.border = "1px solid rgb(196, 192, 192)";
        this.emailMsg = "";
      }
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/checkData",
        { usr_email: this.form_data.usr_email }
      );
      if (res.data.res == "ok") {
        // console.log(res.data);
        this.$refs.email.style.border = "3px solid red";
        this.emailMsg = "Email already exists!";
        return;
      } else {
        this.$refs.email.style.border = "1px solid rgb(196, 192, 192)";
        this.emailMsg = "";
      }
    },
    async login(login_data) {
      let res2 = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/auth/login",
        login_data
      );
      localStorage.setItem("sid", res2.data.sid);
      localStorage.setItem("usr_id", res2.data.sqlParams.usr_id);
      localStorage.setItem("usr_name", res2.data.sqlParams.usr_name);
      localStorage.setItem("usr_email", res2.data.sqlParams.usr_email);
    },
    validatePassword() {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!pattern.test(this.form_data.usr_password)) {
        this.$refs.password.style.border = "2px solid red";
        this.passMsg =
          "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
        return;
      } else {
        this.$refs.password.style.border = "1px solid rgb(196, 192, 192)";
        this.passMsg = "";
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>