
<script>
import { Bar } from "vue-chartjs";
import axios from "axios";
export default {
  extends: Bar,
  async mounted() {
    await this.fetchDataForGraph();
    this.renderChart(this.data, this.options);
    this.btnStyles();
    //
  },
  data() {
    return {
      data: {
        labels: [],
        datasets: [
          {
            label: "Category transaction by Expenses",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 2,
          },
        ],
      },

      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Bar Chart",
          },
        },
      },

      res_arr: [],
      random_colours: ["#FFC44A", "#B569E2", "#E43B3B", "#19CDB0", "#268DEF"],
    };
  },
  methods: {
    async fetchDataForGraph() {
      let res = await axios.post(
        "http://448k122.e2.mars-hosting.com/novcanik/transactions",
        { usr_id: localStorage.getItem("usr_id") }
      );
      this.res_arr = res.data.q;
      for (let i = 0; i < this.res_arr.length; i++) {
        this.data.labels.push(this.res_arr[i].cat_name);
        this.data.datasets[0].data.push(parseFloat(this.res_arr[i].sum));
        this.data.datasets[0].backgroundColor.push(this.btnStyles());
      }
    },
    btnStyles() {
      return this.random_colours[
        Math.floor(Math.random() * this.random_colours.length)
      ];
    },
  },
};
</script>

<style>
</style>