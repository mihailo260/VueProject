<template>
  <div class="single-category-wrapper">
    <span @click="singleCatClicked(false)" class="material-icons x">
      cancel
    </span>
    <h2>Transaction by categories</h2>
    <div class="single-category-items">
      <div
        class="single-category-item"
        v-for="(elem, idx) in subCat"
        :key="idx"
      >
        <div class="icons" :style="renderComponent">
          <i class="material-icons">{{ elem.sub_icon }}</i>
        </div>
        <p>{{ elem.sub_name }}</p>
        <p>{{ elem.exp_balance }}€</p>
        <p>{{ elem.exp_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      xMark: false,
      renderComponent: [
        {
          "background-color":"#FFC44A"
        },
        {
          "background-color":"#B569E2"
        },
        {
          "background-color":"#E43B3B"
        },
        {
          "background-color":"#19CDB0"
        },
        {
          "background-color":"#268DEF"
        },

      ],
    };
  },
  props: {
    // categoryArr: Object,
    subCat: Array,
  },
  computed: {
    change:function(){
      return this.renderComponent
    }
  },

  methods: {
    random(){
       this.renderComponent = this.renderComponent[Math.floor(Math.random()*this.renderComponent.length)];
      return this.renderComponent
    },
    ...mapActions(["singleCatClicked"]),
  },
  mounted(){
    this.random()
  }
  
};
</script>

<style scoped>
.single-category-wrapper {
  font-size: 1.6em;
  background: rgb(193, 220, 247);
  background: linear-gradient(
    141deg,
    rgba(193, 220, 247, 1) 24%,
    rgba(224, 161, 247, 1) 57%,
    rgba(240, 177, 170, 1) 92%
  );
  position: absolute;
  width: 50%;
  max-height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  border-radius: 20px;
  z-index: 4;
  overflow-y: auto;
  

}
.single-category-wrapper > h2 {
  font-family: "Ubuntu Mono", monospace;
  padding: 40px;
}
.material-icons.x {
  position: absolute;
  font-size: 40px;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.5s;
}
.material-icons.x:hover {
  transform: rotate(180deg);
  transition: all ease-in-out 0.5s;
}

.single-category-items {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: baseline;
  justify-content: center;
  height: max-content;
}
.single-category-item {
  align-items: center;
  font-family: "Fira Sans", sans-serif;
  font-family: "Indie Flower", cursive;
  font-family: "Zilla Slab", serif;
  font-weight: 700;
  padding: 15px;
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  background-color: rgb(235, 235, 235);
  border-radius: 25px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.single-category-item > p {
  text-shadow: 1px 1px 1px rgb(221, 221, 221);
  padding: 10px;
  width: 25%;
  /* text-align: left; */
}
.single-category-item > i {
  font-size: 100px;
}
.icons {
  display: flex;
  align-items: center;
  justify-content: center;
  position: static;
  border-radius: 50%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  color: white;
  width: 70px;
  height: 70px;
}
.icons > .material-icons {
  font-size: 40px;
}
</style>

