<template>
  <div class="app-container">
    <NodesQueryBase @handleQuery="handleQuery" />
    <b-card class="app-card mb-4">
      <BadReason :data="nodesBadReason" />
    </b-card>
  </div>
</template>

<script>
import NodesQueryBase from '@/components/Inputs/NodesQuery/Base.vue'
import BadReason from '@/components/charts/BarChart/BadReason.vue'
import { GetBadReasons } from '@/api/BadReason'
import { NodesBadReason } from '@/utils/nodesBadReason'

export default {
  name: 'NodesBadReason',
  components: {
    NodesQueryBase,
    BadReason
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
    }
  },
  computed: {
    nodesBadReason() {
      const result = NodesBadReason(this.loopData)
      return result
    }
  },
  methods: {
    async handleQuery(query) {
      this.query = query

      const _loopDetailData = await GetBadReasons(JSON.stringify(query)).then(response => response)

      this.loopData = _loopDetailData
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
