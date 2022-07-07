<template>
  <div class="settings">
    <div class="logout" @click="logOut()">
      <p style="margin-right: 10px; font-size: 1.5em">Logout</p>
      <i class="fa fa-sign-out" style="font-size: 2em"></i>
    </div>
    <div class="edit-user" @click="editUser(true)">
      <p style="margin-right: 10px; font-size: 1.5em">Edit user</p>
      <i class="material-icons" style="font-size: 2em">account_circle</i>
    </div>
  </div>
</template>

<script>
import{mapActions} from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {};
  },

  methods: {
    ...mapActions(['logout','editUser']),
    async logOut() {
      await axios.post('http://448k122.e2.mars-hosting.com/novcanik/auth/logout', { sid: localStorage.getItem('sid') })
      // console.log(res)
      this.logout()
      localStorage.removeItem('sid')
      localStorage.removeItem('usr_id')
      localStorage.removeItem('usr_name')
      localStorage.removeItem('usr_email')
      this.$router.push('/')
    },
  },
};
</script>

<style scoped>
.settings {
  font-family: "Ubuntu Mono", monospace;
  border-radius: 25px;
  top: 100px;
  right: 18%;
  width: 200px;
  height: 150px;
  background-color: white;
  position: absolute;
  transition: all ease-in-out 0.5s;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.logout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(228, 225, 222);
  width: 100%;
  padding: 0 15px;
  padding-bottom: 15px;
  margin-bottom: 10px;
}
.logout:hover {
  opacity: 0.5;
}
.edit-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
}
.edit-user:hover {
  opacity: 0.5;
}
</style>
