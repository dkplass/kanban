<template>
  <div class="wrapper">
    <div class="small">
      <PieChart :chart-data="datacollection" :options="options" />
      <b-button @click="fillData()">Randomize</b-button>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/charts/PieChart/PieChart.js'

export default {
  name: 'PieChart',
  components: {
    PieChart
  },
  data() {
    return {
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: this.generateSet(4)
          }
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    generateSet(s) {
      const set = []

      for (let i = 0; i < s; i++) {
        set[i] = this.getRandomInt()
      }

      return set
    }
  }
}
</script>
