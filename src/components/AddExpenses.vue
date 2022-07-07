<template>
  <div class="addExpenses">
    <span
      @click="changeExpenses(false)"
      class="material-icons"
      :class="{ 'x-rotate': xMark }"
      @mouseover="xMark = true"
      @mouseleave="xMark = false"
    >
      cancel
    </span>
    <div class="expenses-items">
      <p style="margin: 20px 0">Add Expenses</p>
      <input type="number" placeholder="€" value="0" v-model="expense" />
      <div class="categories">
        <div class="select-field">
          <select name="" id="" @change="fetchSubCat($event)">
            <option
              v-for="(elem, idx) in categoryArr"
              :key="idx"
              :value="elem.cat_id"
              :label="elem.cat_name"
            ></option>
          </select>
          <select name="" id="" @change="fetchId($event)">
            <option
              :value="item.sub_id"
              v-for="(item, idx) in subCatArr"
              :key="idx"
              :label="item.sub_name"
            ></option>
          </select>
        </div>
        <div>
          <input type="date" v-model="date" ref="date" :max="currDate" />
        </div>
      </div>
      <button class="btn" @click="sendData">Save</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      xMark: false,
      subCatArr: [],
      sub_id: "",
      date: "",
      expense: "",
      currDate: "",
    };
  },
  props: {
    categoryArr: Array,
  },
  mounted() {
    this.fetchSubCat(null, this.categoryArr[0].cat_id);
    this.currDate = this.maxDate();
  },
  methods: {
    ...mapActions(["changeExpenses"]),
    async fetchSubCat(e, id) {
      let key = e ? e.target.value : id;
      // console.log(key);
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/subcategories",
        { cat_id: key }
      );
      this.subCatArr = res.data.q;
      this.sub_id = this.subCatArr[0].sub_id;
    },
    fetchId(e) {
      this.sub_id = e.target.value;
    },
    async sendData() {
      if (this.expense != "" && this.date != "" && this.sub_id != "") {
        await axios.post(
          "http://448k122.e2.mars-hosting.com/novcanik/addExpense",
          {
            exp_balance: this.expense,
            exp_date: this.date,
            usr_id: localStorage.getItem("usr_id"),
            sub_id: this.sub_id,
          }
        );
        // console.log(res);

         await axios.patch(
          "http://448k122.e2.mars-hosting.com/novcanik/subtractBalance",
          { expense: this.expense, usr_id: localStorage.getItem("usr_id") }
        );
        // console.log(res2);
        this.expense = "";
        this.date = "";
        this.$vToastify.success("Success");
        this.$emit("reloadTransactions");
        window.location.reload(true);
      } else {
        this.$vToastify.error("Empty fields!");
      }
    },
    maxDate() {
      var dtToday = new Date();
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10) month = "0" + month.toString();
      if (day < 10) day = "0" + day.toString();
      var maxDate = year + "-" + month + "-" + day;
      return maxDate;
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.addExpenses {
  background-color: #f3f4f6;
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  border-radius: 20px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.material-icons {
  position: absolute;
  font-size: 40px;
  left: calc(100% - 50px);
  top: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.5s;
}
.x-rotate {
  transform: rotate(180deg);
  transition: all ease-in-out 0.5s;
}
.expenses-items {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.expenses-items > p {
  font-size: 2em;
  font-family: "Ubuntu Mono", monospace;
}
.expenses-items > input {
  font-size: 2em;
  color: #fc5c7d;
  width: 50%;
  padding: 20px 40px;
  border-radius: 30px;
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 40px;
}
.categories {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.categories div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80px;
  padding: 30px;
  margin: 10px auto;
  background-color: white;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.select-field > select {
  margin: 0 5px;
  font-size: 1em;
  font-weight: 700;
  width: 45%;
  height: 50px;
  outline: none;
  border-radius: 10px;
  border-width: 3px;
  border-color: #6a82fb #fc5c7d #fc5c7d #6a82fb;
}
.categories div input {
  width: 90%;
  height: 50px;
  font-size: 2em;
  border-radius: 10px;
  border-color: #fc5c7d #6a82fb #6a82fb #fc5c7d;
}
.btn {
  cursor: pointer;
  width: 80%;
  margin: 0 auto;
  margin: 50px 0;
  padding: 40px;
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
.animate {
  transition: all ease-in-out 0.2s;
}
.btn:hover {
  transition: all ease-in-out 0.2s;
}
</style>