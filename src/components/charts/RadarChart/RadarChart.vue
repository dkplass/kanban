<template>
  <div class="wrapper">
    <div class="small">
      <RadarChart :chart-data="datacollection" :options="options" />
      <b-button @click="fillData()">Randomize</b-button>
    </div>
  </div>
</template>

<script>
import RadarChart from '@/components/charts/RadarChart/RadarChart.js'

export default {
  name: 'RadarChart',
  components: {
    RadarChart
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
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
          {
            label: 'My First Dataset',
            backgroundColor: 'rgba(179, 181, 198, 0.2)',
            pointBackgroundColor: 'rgba(179, 181, 198, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179, 181, 198, 1)',
            data: this.generateSet(7)
          },
          {
            label: 'My Second Dataset',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
            data: this.generateSet(7)
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
