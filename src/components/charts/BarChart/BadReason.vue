<template>
  <div class="wrapper">
    <BarChart :chart-data="datacollection" :options="options" />
  </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart/BarChart.js'

export default {
  name: 'BadReason',
  components: {
    BarChart
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
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
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
  created() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = this.data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
