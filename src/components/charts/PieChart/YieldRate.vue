<template>
  <div class="wrapper">
    <!-- <div class="badge">
      {{ title }}
    </div> -->
    <div class="small">
      <PieChart :chart-data="datacollection" :options="options" />
    </div>
    <div class="time">
      {{ time }}
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/charts/PieChart/PieChart.js'

export default {
  name: 'PieChartC',
  components: {
    PieChart
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
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
        plugins: {
          datalabels: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 4,
            // anchor: 'end',
            clamp: true,
            align: 'end',
            offset: 10,
            display: 'auto',
            color: '#ffffff',
            textAlign: 'center',
            font: {
              weight: 'bold',
              size: 16
            },
            formatter: (value, context) => {
              return `${value} %`
            }
          }
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
.badge {
  position: absolute;
  font-size: 1.4rem;
  color: #ffffff;
  background-color: rgba($color: #000000, $alpha: .4);
  cursor: default;
}

.time {
  position: absolute;
  bottom: 0;
  font-size: 1rem;
  color: #000000;
  cursor: default;
}
</style>
