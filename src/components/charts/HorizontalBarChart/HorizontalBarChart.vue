<template>
  <div class="wrapper">
    <div class="small">
      <HorizontalBarChart :chart-data="datacollection" :options="options" />
      <b-button @click="fillData()">Randomize</b-button>
    </div>
  </div>
</template>

<script>
import HorizontalBarChart from '@/components/charts/HorizontalBarChart/HorizontalBarChart.js';

export default {
  name: 'HorizontalBarChart',
  components: {
    HorizontalBarChart
  },
  data() {
    return {
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.generateSet(12)
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    generateSet(s) {
      const set = [];

      for (let i = 0; i < s; i++) {
        set[i] = this.getRandomInt();
      }

      return set;
    }
  }
};
</script>
