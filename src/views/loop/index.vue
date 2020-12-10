<template>
  <div class="app-container">
    <b-card class="app-card mb-4">
      <b-row class="mb-2">
        <b-col cols="12" sm="6">
          <b-input-group size="md" :prepend="$t('loop.AsNo')">
            <b-form-input v-model="query.asNo" @blur="handleGetLoopList" @keyup.enter="$event.target.blur()" />
          </b-input-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-input-group size="md" :prepend="$t('loop.LoopNum')">
            <b-form-select v-if="!fetchingLoop" v-model="selectedLoop" :options="loopListOptions" />
            <div v-else class="option-loading">
              <b-spinner label="Spinning" small />
            </div>
          </b-input-group>
        </b-col>
      </b-row>
      <!-- <b-row class="mb-2">
        <b-col cols="12" sm="6">
          <b-input-group size="md" :prepend="$t('loop.Begin_Node')">
            <b-form-select v-model="WorkNodesFilters.bWorkNodeNo" :options="workNodeListOptions" />
          </b-input-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-input-group size="md" :prepend="$t('loop.End_Node')">
            <b-form-select v-model="WorkNodesFilters.eWorkNodeNo" :options="workNodeListOptions" />
          </b-input-group>
        </b-col>
      </b-row> -->
      <b-row class="mb-2">
        <b-col cols="12" sm="6">
          <b-input-group size="md" :prepend="$t('loop.Timespan')">
            <b-form-select v-model="selectedTimeTable" :options="timeTablesList" />
          </b-input-group>
        </b-col>
        <b-col cols="12" sm="6">
          <DateTimeRange @handleDateRange="handleDateRange" />
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col class="text-center">
          <b-button @click="handleGetLoopProgressRate">{{ $t('loop.Query') }}</b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="app-card">
      <!-- {{ loopDetailData }} -->
      <LineChartComponent :data="loopProgressRate" />
    </b-card>
  </div>
</template>

<script>
import { GetLoop } from '@/api/SelectData';
import { GetLoopProgressRate, GetLoopFisrtWorkNode, GetLoopLastWorkNode, GetWorkNodesInterval } from '@/api/ProgressRate';
import { mapGetters } from 'vuex';
import DateTimeRange from '@/components/DateTimeRange';
import LineChartComponent from '@/components/charts/LineChart/LineChart.vue';
import { loopProgressRateToLineChart } from '@/utils/loopProgressRate';

export default {
  name: 'Loop',
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

      WorkNodesFilters: {
        modeNo: 1,
        bWorkNodeNo: '',
        eWorkNodeNo: ''
      },

      selectedTimeTable: '',

      dateRange: {
        start: '',
        end: ''
      },

      loopDetailData: []
    };
  },
  computed: {
    ...mapGetters([
      'time_tables',
      'work_node',
      'language'
    ]),
    loopListOptions() {
      const list = this.loopList;
      let options = [];

      if (!this.query.asNo) {
        return [{
          value: '',
          text: this.$t('loop.Enter_AsNo')
        }];
      }

      if (this.loopList.length > 0) {
        const _list = list.map(item => {
          return {
            value: item.LoopNum,
            text: `${this.$t('loop.LoopNum')}${item.LoopNum}`
          };
        });

        options = [{
          value: '',
          text: this.$t('loop.Select_LoopNum')
        }, ..._list];
      } else {
        options = [{
          value: '',
          text: this.$t('loop.None_LoopNum')
        }];
      }

      return options;
    },
    timeTablesList() {
      const list = this.time_tables.map(item => {
        return {
          value: item.TimeTableNo,
          text: item.TimeTableNo
        };
      });

      return [{ value: '', text: this.$t('loop.Select_Timespan') }, ...list];
    },
    workNodeListOptions() {
      let list = this.work_node;

      list = list.sort((a, b) => {
        return a.WorkSort - b.WorkSort;
      });

      const options = list.map(element => {
        return {
          value: element.WorkNodeNo,
          text: element.WorkNodeNo
        };
      });

      return [{
        value: '',
        text: this.$t('loop.Select_Node')
      }, ...options];
    },
    loopProgressRate() {
      const result = loopProgressRateToLineChart(this.loopDetailData);
      return result;
    },
    LangNo() {
      const language = this.language;
      let res = '';

      switch (language) {
        case 'en':
          res = '02';
          break;
        case 'vi':
          res = '03';
          break;
        case 'th':
          res = '04';
          break;
        case 'zh_cn':
          res = '01';
          break;
        case 'zh_tw':
          res = '01';
          break;
        default:
          res = '01';
          break;
      }

      return res;
    }
  },
  watch: {
    query: {
      handler() {
        const workNodeQuery = {
          comNo: this.query.comNo,
          asNo: this.query.asNo,
          loopNum: this.selectedLoop
        };

        if (workNodeQuery.asNo !== '' && workNodeQuery.loopNum !== '') {
          this.handleWorkNode(workNodeQuery);
        }
      },
      deep: true
    },
    selectedLoop() {
      const workNodeQuery = {
        comNo: this.query.comNo,
        asNo: this.query.asNo,
        loopNum: this.selectedLoop
      };

      if (workNodeQuery.asNo !== '' && workNodeQuery.loopNum !== '') {
        this.handleWorkNode(workNodeQuery);
      }
    }
  },
  created() {
    this.$store.dispatch('selectData/getTimeTables');
  },
  mounted() {
  },
  methods: {
    async handleGetLoopList() {
      const data = JSON.stringify(this.query);

      this.selectedLoop = '';
      this.fetchingLoop = true;

      const result = await GetLoop(data).then(response => response).catch(error => {
        console.error(error);
      });

      this.loopList = result;

      this.fetchingLoop = false;
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
      };

      /**
       * @description 先取得迴路各報工點細節
       */
      const _loopDetailData = await GetLoopProgressRate(JSON.stringify(query)).then(response => response);

      /**
       * @description 判斷WorkNodesFilters.modeNo 須回填 0 或 1
       */

      const queryWorkNodes = {
        ProgressRateViewModels: _loopDetailData,
        WorkNodesFilters: this.WorkNodesFilters
      };

      /**
       * @description 在取得各點之間的生產狀態
       * @param { ProgressRateViewModels, WorkNodesFilters }
       */
      GetWorkNodesInterval(JSON.stringify(queryWorkNodes)).then(response => {
        this.loopDetailData = response;
      });
    },
    handleDateRange(value) {
      this.dateRange = value;
    },
    handleWorkNode(workNodeQuery) {
      this.$store.dispatch('selectData/getWorkNode', workNodeQuery);
      this.getLoopFisrtWorkNode(workNodeQuery);
      this.getLoopLastWorkNode(workNodeQuery);
    },
    getLoopFisrtWorkNode(workNodeQuery) {
      GetLoopFisrtWorkNode(JSON.stringify(workNodeQuery)).then(response => {
        this.WorkNodesFilters.bWorkNodeNo = response;
      });
    },
    getLoopLastWorkNode(workNodeQuery) {
      GetLoopLastWorkNode(JSON.stringify(workNodeQuery)).then(response => {
        this.WorkNodesFilters.eWorkNodeNo = response;
      });
    }
  }
};
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
