<template>
  <div class="chart-wrapper">
    <line-chart :chart-data="datacollection" :options="options" />
    <!-- <div class="small">
        <b-button @click="fillData()">Randomize</b-button>
      </div> -->
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart/LineChart.js';

export default {
  name: 'Balance',
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
        };
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
    };
  },
  watch: {
    data: {
      handler(value) {
        this.fillData();
      },
      deep: true
    }
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = this.data;
    }
  }
};
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
