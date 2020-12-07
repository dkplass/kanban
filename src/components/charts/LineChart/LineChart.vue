<template>
  <div class="chart-wrapper">
    <line-chart :chart-data="datacollection" :options="options" />
    <!-- <div class="small">
        <b-button @click="fillData()">Randomize</b-button>
      </div> -->
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart/LineChart.js'

export default {
  name: 'LineChartComponent',
  components: {
    LineChart
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          labels: [],
          datasets: []
        }
      }
    }
  },
  data() {
    return {
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          easing: 'easeInOutQuad',
          duration: 520
        },
        tooltips: {
          titleFontFamily: 'Open Sans',
          backgroundColor: 'rgba(0,0,0,0.3)',
          titleFontColor: '#ffffff',
          caretSize: 5,
          cornerRadius: 2,
          xPadding: 10,
          yPadding: 10
        }
      }
    }
  },
  watch: {
    data: {
      handler(value) {
        this.fillData()
      },
      deep: true
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      // this.datacollection = {
      //   labels: [`2020-11-27\n07:30:00`, '2020-11-27T09:30:00', '2020-11-27T11:30:00', this.getRandomInt(), this.getRandomInt()],
      //   datasets: [
      //     {
      //       label: 'Data One',
      //       pointBackgroundColor: 'red',
      //       data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
      //     }, {
      //       label: 'Data two',
      //       pointBackgroundColor: 'red',
      //       data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
      //     }
      //   ]
      // }
      this.datacollection = this.data
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style lang="scss" scoped>
// .wrapper {
//   width: 1000px;
//   height: 200px;
// }

.chart-wrapper {
  max-width: 1000px;
  margin:  .2rem auto;
}
</style>
