<template>
  <div class="app-container">
    <b-card class="app-card mb-4">
      <b-row class="mt-1 mb-2">
        <b-col cols="12" sm="6">
          <b-input-group size="md" :prepend="$t('node.AsNo')">
            <b-form-input v-model="query.asNo" @blur="handleGetLoopList" @keyup.enter="$event.target.blur()" />
          </b-input-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-input-group size="md" :prepend="$t('node.LoopNum')">
            <b-form-select v-if="!fetchingLoop" v-model="selectedLoop" :options="loopListOptions" />
            <div v-else class="option-loading">
              <b-spinner label="Spinning" small />
            </div>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" sm="6">
          <b-input-group size="md" :prepend="$t('node.Timespan')">
            <b-form-select v-model="selectedTimeTable" :options="timeTablesList" />
          </b-input-group>
        </b-col>
        <b-col cols="12" sm="6">
          <DateTimeRange @handleDateRange="handleDateRange" />
        </b-col>
      </b-row>
    </b-card>
    <b-card class="app-card">
      <b-button @click="handleGetLoopProgressRate">{{ $t('node.Query') }}</b-button>
      <LineChartComponent :data="nodesOutput" />
    </b-card>
  </div>
</template>

<script>
import { GetLoop } from '@/api/SelectData'
import { GetLoopProgressRate } from '@/api/ProgressRate'
import { nodesOutputToLineChart } from '@/utils/nodesOutput'
import DateTimeRange from '@/components/DateTimeRange'
import LineChartComponent from '@/components/charts/LineChart/LineChart.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'NodesBalance',
  components: {
    DateTimeRange,
    LineChartComponent
  },
  data() {
    return {
      query: {
        comNo: 'L1',
        asNo: ''
      },

      fetchingLoop: false,
      selectedLoop: '',
      loopList: [],

      selectedTimeTable: '',

      dateRange: {
        start: '',
        end: ''
      },

      nodeData: []
    }
  },
  computed: {
    ...mapGetters([
      'time_tables',
      'work_node',
      'language'
    ]),
    loopListOptions() {
      const list = this.loopList
      let options = []

      if (!this.query.asNo) {
        return [{
          value: '',
          text: this.$t('node.Enter_AsNo')
        }]
      }

      if (this.loopList.length > 0) {
        const _list = list.map(item => {
          return {
            value: item.LoopNum,
            text: `${this.$t('node.LoopNum')}${item.LoopNum}`
          }
        })

        options = [{
          value: '',
          text: this.$t('node.Select_LoopNum')
        }, ..._list]
      } else {
        options = [{
          value: '',
          text: this.$t('node.None_LoopNum')
        }]
      }

      return options
    },
    timeTablesList() {
      const list = this.time_tables.map(item => {
        return {
          value: item.TimeTableNo,
          text: item.TimeTableNo
        }
      })

      return [{ value: '', text: this.$t('node.Select_Timespan') }, ...list]
    },
    nodesOutput() {
      const result = nodesOutputToLineChart(this.nodeData)
      return result
    },
    LangNo() {
      const language = this.language
      let res = ''

      switch (language) {
        case 'en':
          res = '02'
          break
        case 'vi':
          res = '03'
          break
        case 'th':
          res = '04'
          break
        case 'zh_cn':
          res = '01'
          break
        case 'zh_tw':
          res = '01'
          break
        default:
          res = '01'
          break
      }

      return res
    }
  },
  created() {
    this.$store.dispatch('selectData/getTimeTables')
  },
  methods: {
    async handleGetLoopList() {
      const data = JSON.stringify(this.query)

      this.selectedLoop = ''
      this.fetchingLoop = true

      const result = await GetLoop(data).then(response => response).catch(error => {
        console.error(error)
      })

      this.loopList = result

      this.fetchingLoop = false
    },
    async handleGetLoopProgressRate() {
      const query = {
        ComNo: this.query.comNo,
        AsNo: this.query.asNo,
        LoopNum: this.selectedLoop,
        BeginDateTime: this.dateRange.start,
        EndDateTime: this.dateRange.end,
        TimeTableNo: this.selectedTimeTable,
        LangNo: this.LangNo
      }

      const _loopDetailData = await GetLoopProgressRate(JSON.stringify(query)).then(response => response)

      this.nodeData = _loopDetailData
    },
    handleDateRange(value) {
      this.dateRange = value
    }
  }
}
</script>

<style lang="scss" scoped>
.option-loading {
  flex: 1 1 auto;
  width: 1%;
  vertical-align: center;
  border: 1px solid #ced4da;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
