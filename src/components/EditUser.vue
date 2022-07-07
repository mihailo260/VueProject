<template>
  <div :class="{ appFix: appHeight, app: !appHeight }">
    <span
      @click="editUser(false)"
      class="material-icons"
    >
      cancel
    </span>
    <div class="upper-section" v-for="(elem, idx) in user_data" :key="idx">
      <div class="image">
        <img v-if="elem.image_url" :src="elem.image_url" ref="imageAvatar" />
        <img v-else :src="require(`../assets/${tempImage}`)" ref="imageAvatar" />
        <input
          class="img-upload-input"
          type="file"
          ref="img"
          @change="onFileUpload"
        />
        <i
          @mouseover="penMark = true"
          @mouseleave="penMark = false"
          :class="{ 'x-rotate': penMark }"
          class="material-icons"
          @click="openImgUpload"
          >edit</i
        >
      </div>
      <h2>{{ name }}</h2>
      <p>Joined at {{ elem.usr_register_date }}</p>
    </div>
    <div class="user-data">
      <div>
        <label for="username">Fullname</label>
        <input type="text" id="username" v-model="name" />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          ref="email"
          v-model="email"
          @change="validateEmail"
        />
      </div>
      <div>
        <label for="password">Current password</label>
        <input
          ref="password"
          type="password"
          id="password"
          @blur="validatePassword"
          v-model.trim="currPass"
        />

        <div class="marks">
          <transition name="fade">
            <i
              class="material-icons"
              :class="{ showCheckMark: showCheckMark }"
              v-if="showCheckMark"
              >check_circle</i
            >
          </transition>

          <transition name="fade">
            <i
              class="material-icons"
              :class="{ showXmark: showXmark }"
              v-if="showXmark"
              >cancel</i
            >
          </transition>
          <transition>
            <i class="material-icons oko" @click="showPassword('password')"
              >remove_red_eye</i
            >
          </transition>
        </div>
      </div>
      <div>
        <label for="password">New password</label>
        <input
          type="password"
          id="password"
          v-model.trim="newPassword"
          ref="newPassword"
          @blur="validateNewPassword()"
        />
        <div class="quick-fix">
          <span v-if="errMsg"
            >Password must contain at least one upper leter and lower letter and
            len of 8 minimum</span
          >
          <i class="material-icons" @click="showPassword('newPassword')"
            >remove_red_eye</i
          >
        </div>
      </div>
      <button class="btn" @click="updateUser">Save changes</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.fetchData();
    this.appHeight = this.checkAppHeight();
    // console.log(this.appHeight);
  },
  props: {
    fetchUserName: Function,
    checkAppHeight: Function,
  },
  computed: {
    changeType: function () {
      return this.showPassword();
    },
    changeTemp: function(){
      return this.tempImage
    }
  },
  data() {
    return {
      penMark: false,
      errMsg: false,
      id: localStorage.getItem("usr_id"),
      name: localStorage.getItem("usr_name"),
      email: localStorage.getItem("usr_email"),
      currPass: "",
      user_data: [],
      showCheckMark: false,
      showXmark: false,
      newPassword: "",
      passMsg: "",
      FILE: null,
      appHeight: false,
      tempImage:'img_avatar3.png',
      valPass:false,
      valNewPass:false
    };
  },
  methods: {
    async updateUser() {
      let formData = new FormData();
      if (this.FILE != null) {
        formData.append("file", this.FILE);
      }
      formData.append("usr_name", this.name);
      formData.append("usr_email", this.email);
      formData.append("usr_id", this.id);

      if (await this.validatePassword() === true && this.validateNewPassword()) {
        formData.append("usr_password", this.newPassword);
      }
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/updateUserData",
        formData
      );
      if (this.errMsg == true) {
        this.editUser(true);
      } else {
        this.editUser(false);
        localStorage.removeItem("usr_name");
        localStorage.setItem("usr_name", this.name);
        if (res.data.email == "ok") {
          localStorage.setItem("usr_email", this.email);
        }
        this.fetchData();
        this.fetchUserName();
        // window.location.reload(true);
      }
    },
    ...mapActions(["editUser"]),
    openImgUpload() {
      this.$refs.img[0].click();
      
    },
    onFileUpload(event) {
      this.FILE = event.target.files[0];
      let format = this.FILE.type.split("/");
      if (format[0] != "image") {
        this.$vToastify.error("This is wrong img format");
        return;
      }
      let output = this.$refs.imageAvatar
      output.src = event.target.files[0];
      this.tempImage = output.src.name
    },
    showPassword(ref_val) {
      if (this.$refs[ref_val].type == "password") {
        this.$refs[ref_val].type = "text";
      } else {
        this.$refs[ref_val].type = "password";
      }
    },
    async fetchData() {
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/userData",
        { usr_id: this.id }
      );
      this.user_data = res.data.q;
      // console.log(this.user_data, "ovo nam treba");
    },
    async validatePassword() {
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/checkPassword",
        { usr_email: this.email, usr_password: this.currPass }
      );
      if (res.data.pass == "ok") {
        this.showXmark = false;
        this.showCheckMark = true;
        this.errMsg = "";
        this.valPass=true;
      } else {
        this.showCheckMark = false;
        this.showXmark = true;
      }
    },
    validateNewPassword() {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!pattern.test(this.newPassword)) {
        this.$refs.newPassword.style.border = "3px solid red";
        this.errMsg = true;
        // console.log("false");
        return false;
      } else {
        this.$refs.newPassword.style.border = "1px solid rgb(196, 192, 192)";
        this.errMsg = false;
        this.valNewPass=true;
      }
    },
    async validateEmail() {
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/checkData",
        { usr_email: this.email }
      );
      if (res.data.res == "ok") {
        this.$refs.email.style.border = "1px solid red";
      }
    },
  },
};
</script>

<style scoped>
.app {
  font-family: "Ubuntu Mono", monospace;
  padding: 40px;
  background-color: #f3f4f6;
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  border-radius: 20px;
  z-index: 500;
}
.appFix {
  font-family: "Ubuntu Mono", monospace;
  padding: 40px;
  background-color: #f3f4f6;
  width: 40%;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  border-radius: 20px;
  z-index: 500;
}
.material-icons {
  position: absolute;
  z-index: 100;
  font-size: 40px;
  left: calc(100% - 50px);
  top: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.5s;
}
.app >span:hover{
  transform: rotate(360deg);
  transition: all ease-in-out 0.5s;
}
.x-rotate {
  transform: rotate(360deg);
  transition: all ease-in-out 0.5s;
}
.img-upload-input {
  display: none;
}
.upper-section {
  color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  padding: 10px;
  background: #fc5c7d;
  background: -webkit-linear-gradient(to right, #6a82fb, #fc5c7d);
  background: linear-gradient(to right, #6a82fb, #fc5c7d);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.image {
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
.image > i {
  position: absolute;
  color: white;
  font-size: 2em;
  top: 72%;
  left: 54%;
  padding: 5px;
  background-color: #3772fe;
  border-radius: 50%;
}
.image > img {
  display: block;
  width: 100%;
  object-fit: cover;

  border-radius: 50%;
}
.user-data {
  font-size: 1.5em;
  padding: 2%;
  display: flex;
  flex-direction: column;
}
.user-data > div {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.user-data > div label {
  text-align: left;
}
.marks {
  user-select: none;
  position: static;
  display: flex;
  justify-content: flex-end;
}
.marks .oko {
  justify-content: flex-end;
  padding-left: calc(100% - 70px);
}
.marks > i {
  font-size: 1.5em;
}
.marks > span {
  font-size: 0.7em;
}
.showCheckMark {
  color: green;
}
.showXmark {
  color: red;
}
.quick-fix {
  font-size: 0.7em;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.user-data div i {
  user-select: none;
  position: static;
}

.user-data > div label:hover {
  color: #fc5c7d;
  cursor: pointer;
  opacity: 0.7;
}
.user-data > div input {
  font-family: "Ubuntu Mono", monospace;
  font-size: 1.2em;
  border: none;
  margin-top: 5px;
  border-bottom: 2px solid #fc5c7d;
  background-color: #f3f4f6;
}
.btn {
  font-family: "Ubuntu Mono", monospace;
  cursor: pointer;
  min-width: 45%;
  margin: 0 auto;
  margin-top: 20px;
  height: 50px;
  padding: 30px;
  background: #fc5c7d;
  background: -webkit-linear-gradient(to right, #6a82fb, #fc5c7d);
  background: linear-gradient(to right, #6a82fb, #fc5c7d);
  border-radius: 25px;
  border: 0;
  transition: all ease-in-out 0.2s;
  font-size: 1em;
  line-height: 3px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-weight: 700;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.btn:hover {
  transition: all ease-in-out 0.2s;
}
</style>