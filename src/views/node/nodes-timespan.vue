<template>
  <div class="app-container">
    <NodesQueryBase @handleQuery="handleQuery" @refreshLoopLastWorkNode="refreshLoopLastWorkNode" />
    <b-row>
      <b-col v-for="(node, index) in nodesYieldRate" :key="index" cols="12" sm="3" class="mb-4">
        <b-card class="app-card">
          <YieldRate :data="node.chartData" :title="node.nodeNo" :time="node.nodeTitle" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { GetLoopProgressRate } from '@/api/ProgressRate';
import { NodesYieldRate } from '@/utils/nodesYieldRate';
import NodesQueryBase from '@/components/Inputs/NodesQuery/Base.vue';
import YieldRate from '@/components/charts/PieChart/YieldRate.vue';
// eslint-disable-next-line no-unused-vars
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { mapGetters } from 'vuex';

export default {
  name: 'NodesTimespan',
  components: {
    NodesQueryBase,
    YieldRate
  },
  data() {
    return {
      query: {
        ComNo: '',
        AsNo: '',
        LoopNum: '',
        BeginDateTime: '',
        EndDateTime: '',
        TimeTableNo: '',
        LangNo: ''
      },

      loopData: [],

      endWorkNodeNo: ''
    };
  },
  computed: {
    ...mapGetters([
      'work_node'
    ]),
    nodesYieldRate() {
      const result = NodesYieldRate(this.loopData, this.endWorkNodeNo);

      return result;
    }
  },
  methods: {
    async handleQuery(query) {
      this.query = query;

      const _loopDetailData = await GetLoopProgressRate(JSON.stringify(query)).then(response => response);

      this.loopData = _loopDetailData;
    },
    refreshLoopLastWorkNode(value) {
      this.endWorkNodeNo = value;
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
