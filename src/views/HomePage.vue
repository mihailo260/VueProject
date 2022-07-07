<template>
  <div id="app-home">
    <transition name="fade">
      <SingleCategory v-if="singleCategoryClicked" :subCat="subCat" />
    </transition>
    <transition name="fade">
      <AddBalance v-if="addBalance" />
    </transition>
    <transition name="fade">
      <addExpenses
        v-if="addExpenses"
        :categoryArr="categoryArr"
        @reloadTransactions="handleSuccessfullTransactionAdd"
      />
    </transition>
    <transition name="fade">
      <EditUser
        v-if="editUser"
        :fetchUserName="fetchUserName"
        :checkAppHeight="checkAppHeight"
      />
    </transition>
    <div class="avatar">
      <div class="image-welcome">
        <div
          class="image-avatar"
          @mouseover="profilePictureScale = true"
          @mouseleave="profilePictureScale = false"
          :class="{ 'image-avatar-scaled': profilePictureScale }"
          v-for="user in user_data"
          :key="user.usr_id"
        >
          <img v-if="user.image_url" :src="user.image_url" />
          <img v-else src="../assets/img_avatar3.png" />
        </div>
        <div class="welcome">
          <span style="opacity: 0.6">Welcome!</span>
          <p style="font-size: 1.5em">{{ usr_name }}</p>
        </div>
      </div>
      <div class="settings" @click="changeSettings()">
        <transition name="fade">
          <Settings v-if="settings" class="edituser" id="settings" />
        </transition>
        <span
          id="settingsGear"
          class="material-icons"
          :class="{ 'scale-settings': gearScale }"
          @mouseover="gearScale = true"
          @mouseleave="gearScale = false"
        >
          settings
        </span>
      </div>
    </div>
    <div class="balance-expenses" v-for="user in user_data" :key="user.usr_id">
      <div class="balance-money">
        <span
          >Total balance
          <button
            class="add-balance"
            @click="closeComponents(addbalance(true))"
          >
            +
          </button></span
        >
        <h1 v-if="user.usr_balance < 0" class="active">
          {{ user.usr_balance }} €
        </h1>
        <h1 v-else class="non-active">{{ user.usr_balance }} €</h1>
      </div>
      <div class="income-expenses-wrap">
        <div class="income">
          <span class="material-icons"> arrow_downward </span>
          <div class="income-text">
            <span>Income</span>
            <p v-if="user.usr_income">+ {{ user.usr_income }} €</p>
            <p v-else>+ 0 €</p>
          </div>
        </div>
        <div class="expenses">
          <span class="material-icons"> arrow_upward </span>
          <div class="income-text">
            <span>Expenses</span>
            <p>{{ sum_expenses }} €</p>
          </div>
        </div>
      </div>
    </div>
    <div class="transactions" style="cursor: pointer">
      <p
        @click="graphClicked()"
        :class="{ 'clicked-transactions': !showGraph }"
      >
        Transactions
      </p>
      <span
        @click="graphClicked()"
        :class="{ 'clicked-transactions': showGraph }"
        v-if="transactions.length > 0"
        >View Graph</span
      >
    </div>
    <!-- <========================================> -->
    <transition name="fade">
      <div class="starter-spending" v-if="transactions.length < 1">
        <p>Start spending your money</p>
        <img class="arrow" src="../assets/1.png" />
      </div>
    </transition>
    <transition name="fade">
      <div class="graph" v-if="showGraph">
        <h2 v-if="transactions.length > 0">Graph</h2>
        <Graph v-if="transactions.length > 0" />
      </div>
    </transition>
    <div class="main-categories" v-if="!showGraph">
      <div class="fix">
        <div
          class="single-category"
          v-for="(elem, idx) in transactions"
          :key="idx"
          @click="
            openSingleCat(
              closeComponents(singleCatClicked(true)),
              elem.cat_id,
              elem.sub_id
            )
          "
        >
          <div class="image-and-text">
            <div class="image-category" :style="elem.color">
              <i class="material-icons">{{ elem.cat_icon }}</i>
            </div>
            <p style="font-size: 1.2em; padding: 10px">{{ elem.cat_name }}</p>
          </div>
          <div class="money-cat">
            <p>{{ elem.sum }} €</p>
          </div>
        </div>
      </div>
    </div>
    <div class="plus-circle">
      <p @click="closeComponents(changeExpenses(true))">+</p>
    </div>
  </div>
</template>
<script>
import Graph from "@/components/Graph.vue";
import addExpenses from "@/components/AddExpenses.vue";
import Settings from "@/components/Settings.vue";
import EditUser from "@/components/EditUser.vue";
import AddBalance from "@/components/AddBalance.vue";
import SingleCategory from "@/components/SingleCategory.vue";
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    addExpenses,
    Settings,
    EditUser,
    AddBalance,
    SingleCategory,
    Graph,
  },
  data() {
    return {
      gearScale: false,
      transactions: [],
      profilePictureScale: false,
      usr_name: localStorage.getItem("usr_name"),
      categoryArr: [],
      random_colours: ["#FFC44A", "#B569E2", "#E43B3B", "#19CDB0", "#268DEF"],
      user_data: [],
      sum_expenses: 0,
      newIncome: localStorage.getItem("income"),
      subCat: [],
    };
  },
  computed: {
    ...mapState([
      "addExpenses",
      "settings",
      "editUser",
      "addBalance",
      "singleCategoryClicked",
      "showGraph",
    ]),
  },

  methods: {
    ...mapActions([
      "changeExpenses",
      "changeSettings",
      "addbalance",
      "singleCatClicked",
      "graphClicked",
      "closeSettings",
    ]),
    async openSingleCat(func, id, sub) {
      func;
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/FetchSubcategoryData",
        { cat_id: id, usr_id: localStorage.getItem("usr_id"), sub_id: sub }
      );
      this.subCat = res.data.res;
    },
    fetchUserName() {
      this.usr_name = localStorage.getItem("usr_name");
    },
    btnStyles() {
      return {
        "background-color":
          this.random_colours[
            Math.floor(Math.random() * this.random_colours.length)
          ],
      };
    },
    async fetchUser() {
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/userData",
        { usr_id: localStorage.getItem("usr_id") }
      );
      console.log('vlada', res)
      this.user_data = res.data.q;
    },
    async fetchData() {
      let res = await axios.get(
        "http://448k122.e2.mars-hosting.com/novcanik/expenseCategories"
      );
      this.categoryArr = res.data.q;
    },
    closeComponents() {
      if (this.settings == true) {
        this.changeSettings();
      }
      if (this.showGraph == true) {
        this.graphClicked();
      }
    },
    closeModal() {
      let settingsGear = document.getElementById("settingsGear");
      document.addEventListener("click", (e) => {
        if (e.target != settingsGear) {
          if (this.settings == false) {
            return;
          }
          this.changeSettings();
        }
      });
    },
    async fetchTransactions() {
      let usr_id = localStorage.getItem("usr_id");
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/transactions",
        { usr_id: usr_id }
      );
      this.transactions = res.data.q;
      for (let i = 0; i < this.transactions.length; i++) {
        this.transactions[i].color = this.btnStyles();
        this.sum_expenses += parseFloat(this.transactions[i].sum);
      }
    },
    handleSuccessfullTransactionAdd() {
      this.fetchTransactions();
      this.changeExpenses(false);
    },
    fetchIncome() {
      this.newIncome = localStorage.getItem("income");
    },
    checkAppHeight() {
      let height = document.getElementById("app-home");
      if(height.offsetHeight <=716){
        return true
      }else{
        return false
      }
    },
  },

  mounted() {
    this.fetchIncome();
    this.fetchUser();
    this.fetchData();
    this.fetchTransactions();
    this.fetchUserName();
    this.closeModal();
  },
};
</script>

<style scoped>
#app-home {
  background-color: #f3f4f6;
  position: relative;
  height: 100%;
}
.active {
  color: #de3130;
}
.non-active {
  color: white;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
  padding: 20px 0;
}
.image-avatar-scaled {
  transform: scale(1.1) rotate(3deg);
}
.image-welcome {
  display: flex;
}
.image-avatar {
  max-width: 100px;
  max-height: 100px;
  transition: all ease-in-out 0.5s;
}
.image-avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}

.welcome {
  font-weight: 900;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 20px;
}
.add-balance {
  cursor: pointer;
  text-align: center;
  line-height: 15px;
  width: fit-content;
  height: fit-content;
  font-size: 1em;
  height: 40px;
}

.settings {
  min-width: 4vw;
  min-height: 4vw;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
.scale-settings {
  transform: rotate(180deg);
  transition: all ease-in-out 0.5s;
}
.settings .material-icons {
  font-size: 4em;
  transition: all ease-in-out 0.5s;
}
.income .material-icons {
  color: #3ae83b;
  border-radius: 50%;
  background-color: #8aa5f2;
  padding: 10px;
  font-size: 40px;
}
.balance-expenses {
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  font-family: "Ubuntu Mono", monospace;
  font-size: 2em;
  text-shadow: 1px 1px 1px rgb(100, 100, 100);
  color: white;
  width: 70%;
  margin: 0 auto;
  padding: 25px;
  border-radius: 30px;
  background: rgb(77, 155, 234);
  background: linear-gradient(
    141deg,
    rgba(77, 155, 234, 1) 0%,
    rgba(208, 107, 246, 1) 43%,
    rgba(246, 142, 131, 1) 100%
  );
}
.balance-money > h1 {
  letter-spacing: 2px;
}
.income-expenses-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.income,
.expenses {
  display: flex;
  align-items: center;
  cursor: initial;
}
.expenses .material-icons {
  color: #f66c82;
  border-radius: 50%;
  background-color: #8aa5f2;
  padding: 10px;
  font-size: 40px;
}
.expenses .income-text {
  margin: 0 0 0 10px;
}
.income .income-text {
  margin: 0 0 0 10px;
}
.starter-spending {
  font-weight: 900;
  font-family: "Fira Sans", sans-serif;
  font-family: "Indie Flower", cursive;
  width: 70%;
  padding: 50px;
  margin: 0 auto;
  height: 420px;
  background-image: url("../assets/4.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 25px;
  opacity: 0.8;
}
.starter-spending > .arrow {
  position: relative;
  top: 17%;
  width: 150px;
  height: 100px;
  transform: rotate(90deg);
  transition: all ease-in-out 0.5s;
  z-index: 5;
}
.starter-spending > p {
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);

  padding-top: 40px;
  color: white;
  font-size: 5em;
}

.starter-spending > .arrow:hover {
  -webkit-transform: rotate(85deg) scale(1.2, 1.2); /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: rotate(85deg) scale(1.2, 1.21); /* IE 9 */
  transform: rotate(85deg) scale(1.2, 1.2); /* Firefox 16+, IE 10+, Opera */
}
.graph {
  max-width: 900px;
  margin: 0 auto;
}
.main-categories {
  position: relative;
  width: 70%;
  margin: 0 auto;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.main-categories::-webkit-scrollbar {
  display: none;
}
.transactions {
  display: flex;
  justify-content: space-between;
  font-weight: 900;
  font-size: 2em;
  font-family: "Fira Sans", sans-serif;
  font-family: "Ubuntu Mono", monospace;
  padding: 20px 0;
  width: 70%;
  margin-left: 15%;
}
.transactions,
span,
p {
  transition: all ease-in-out 0.5s;
}
.clicked-transactions {
  background: linear-gradient(
    141deg,
    rgba(77, 155, 234, 1) 0%,
    rgba(208, 107, 246, 1) 43%,
    rgba(246, 142, 131, 1) 100%
  );
  color: white;
  padding: 15px;
  border-radius: 15px;
}

.fix {
  max-height: 420px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.single-category {
  cursor: pointer;
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  width: calc(50% - 10px);
  color: black;
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin: 5px;
  padding: 10px;
  border-radius: 30px;
  height: max-content;
  transition: all ease-in-out 0.5s;
}
.single-category:hover {
  transform: scale(1, 1.1);
  z-index: 1;
}

.image-and-text {
  width: fit-content;
  display: flex;
  align-items: center;
}
.image-category {
  min-width: 100px;
  min-height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  background-color: yellowgreen;
}
.image-category > i {
  font-size: 2.5em;
  color: rgb(252, 249, 249);
}
.money-cat {
  font-size: 1.2em;
  font-family: "Fira Sans", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.plus-circle {
  cursor: pointer;
  
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5em;
  color: white;
  width: 100%;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  transition: all ease-in-out 0.5s;
}
.plus-circle > p {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #fc5c7d;
  background: -webkit-linear-gradient(to right, #6a82fb, #fc5c7d);
  background: rgb(77, 155, 234);
  background: linear-gradient(
    141deg,
    rgba(77, 155, 234, 1) 0%,
    rgba(208, 107, 246, 1) 43%,
    rgba(246, 142, 131, 1) 100%
  );
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}
.plus-circle p:hover {
  transition: all ease-in-out 0.5s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media only screen and (max-width: 1150px) {
  .single-category {
    width: 100%;
    padding: 10px 40px;
  }
}

@media only screen and (max-width: 864px) {
}

@media only screen and (max-width: 398px) {
  .income .material-icons,
  .expenses .material-icons {
    padding: 10px;
    font-size: 25px;
  }
}
</style>