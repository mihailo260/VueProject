<template>
  <div class="add-new-balance">
    <span
      @click="addbalance(false)"
      class="material-icons"
      :class="{ 'x-rotate': xMark }"
      @mouseover="xMark = true"
      @mouseleave="xMark = false"
    >
      cancel
    </span>
    <div class="balance-items">
      <p>Add balance</p>
      <input type="number" v-model="newBalance" placeholder="€"/>
    </div>
    <div class="btn">
      <button @click="addNewBalance()">Add</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions} from "vuex";
export default {
  data() {
    return {
      xMark: false,
      newBalance:''
    };
  },
  methods: {
    ...mapActions(["addbalance" ,"changeSettings"]),
    async addNewBalance(){
      await axios.patch('http://448k122.e2.mars-hosting.com/novcanik/addBalance',{usr_id: localStorage.getItem('usr_id'), usr_balance:this.newBalance})
   
      window.location.reload(true);
      this.addbalance(false)
    }
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
.add-new-balance {
  font-family: "Ubuntu Mono", monospace;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 400px;
  background-color: #f3f4f6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  border-radius: 20px;
  z-index: 4;
}
.material-icons {
  top: 0;
  left: calc(100% - 40px);
  position: absolute;
  font-size: 40px;
  cursor: pointer;
  transition: all ease-in-out 0.5s;
}
.x-rotate {
  transform: rotate(180deg);
  transition: all ease-in-out 0.5s;
}
.balance-items {
  margin-bottom: 30px;
  
}
.balance-items > p{
  font-size: 2em;
  margin-bottom: 30px;
  
}
.balance-items input{
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
  font-size: 2em;
  border:  none;
  padding: 10px;
  width: 50%;
  border-radius: 10px;
  color:#fc5c7d;
} 
.btn > button{
  cursor: pointer;
  width: 50%;
  height: 50px;
  margin: 0 auto;
  padding: 15px;
  background: #fc5c7d;
  background: -webkit-linear-gradient(to right, #6a82fb, #fc5c7d);
  background: linear-gradient(to right, #6a82fb, #fc5c7d);
  border-radius: 25px;
  border: 0;
  transition: all ease-in-out 0.2s;
  font-size: 2em;
  line-height: 3px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-weight: 700;
  font-family: "Ubuntu Mono", monospace;
}
</style>
