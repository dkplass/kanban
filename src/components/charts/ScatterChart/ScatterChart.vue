<template>
  <div class="wrapper">
    <div class="small">
      <ScatterChart :chart-data="datacollection" :options="options" />
      <b-button @click="fillData()">Randomize</b-button>
    </div>
  </div>
</template>

<script>
import ScatterChart from '@/components/charts/ScatterChart/ScatterChart.js';

export default {
  name: 'ScatterChart',
  components: {
    ScatterChart
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
            label: 'Scatter Dataset 1',
            fill: false,
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            data: [{
              x: -2,
              y: 4
            }, {
              x: -1,
              y: 1
            }, {
              x: 0,
              y: 0
            }, {
              x: 1,
              y: 1
            }, {
              x: 2,
              y: 4
            }]
          },
          {
            label: 'Scatter Dataset 2',
            fill: false,
            borderColor: '#7acbf9',
            backgroundColor: '#7acbf9',
            data: [{
              x: -2,
              y: -4
            }, {
              x: -1,
              y: -1
            }, {
              x: 0,
              y: 1
            }, {
              x: 1,
              y: -1
            }, {
              x: 2,
              y: -4
            }]
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
