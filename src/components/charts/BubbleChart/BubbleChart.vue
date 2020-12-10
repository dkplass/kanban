<template>
  <div class="wrapper">
    <div class="small">
      <BubbleChart :chart-data="datacollection" :options="options" />
      <b-button @click="fillData()">Randomize</b-button>
    </div>
  </div>
</template>

<script>
import BubbleChart from '@/components/charts/BubbleChart/BubbleChart.js';

export default {
  name: 'BubbleChart',
  components: {
    BubbleChart
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
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.generateSet(3)
          },
          {
            label: 'Data Two',
            backgroundColor: '#7C8CF8',
            data: this.generateSet(3)
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
        set[i] = {
          x: this.getRandomInt(),
          y: this.getRandomInt(),
          r: this.getRandomInt()
        };
      }

      return set;
    }
  }
};
</script>
