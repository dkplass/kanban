<template>
  <div class="app-container">
    <NodesQueryBase @handleQuery="handleQuery" />
    <b-card class="app-card">
      <Balance :data="nodesOutput" />
    </b-card>
  </div>
</template>

<script>
import { GetLoopProgressRate } from '@/api/ProgressRate';
import { NodesOutput } from '@/utils/nodesOutput';
import NodesQueryBase from '@/components/Inputs/NodesQuery/Base.vue';
import Balance from '@/components/charts/LineChart/Balance.vue';

export default {
  name: 'NodesBalance',
  components: {
    NodesQueryBase,
    Balance
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

      loopData: []
    };
  },
  computed: {
    nodesOutput() {
      const result = NodesOutput(this.loopData);
      return result;
    }
  },
  methods: {
    async handleQuery(query) {
      this.query = query;

      const _loopDetailData = await GetLoopProgressRate(JSON.stringify(query)).then(response => response);

      this.loopData = _loopDetailData;
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
