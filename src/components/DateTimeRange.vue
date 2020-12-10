<template>
  <form class="bg-white" @submit.prevent>
    <v-date-picker
      v-model="range"
      :locale="locale"
      mode="dateTime"
      :model-config="modelConfig"
      :masks="masks"
      is-range
      is24hr
      @input="onDateRangeChange($event)"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <div class="datetime-wrapper">
          <div class="datetime-input">
            <svg
              class="datetime-svg"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <input
              class="form-control datetime-input-area"
              type="text"
              :value="inputValue.start"
              v-on="inputEvents.start"
            >
          </div>
          <span class="datetime-arrow">
            <svg
              class="arrow-svg"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
          <div class="datetime-input">
            <svg
              class="datetime-svg"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <input
              class="form-control datetime-input-area"
              :value="inputValue.end"
              v-on="inputEvents.end"
            >
          </div>
        </div>
      </template>
    </v-date-picker>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DateTimeRange',
  data() {
    return {
      range: {
        start: this.$moment().format('YYYY/MM/DD HH:mm:ss'),
        end: this.$moment().format('YYYY/MM/DD HH:mm:ss')
      },
      masks: {
        input: 'YYYY/MM/DD HH:mm:ss'
      },
      modelConfig: {
        type: 'string',
        mask: 'YYYY/MM/DD HH:mm:ss'
      }
    };
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    locale() {
      const l = this.language;
      let res = '';

      switch (l) {
        case 'en':
          res = 'en-US';
          break;
        case 'vi':
          res = 'vi';
          break;
        case 'th':
          res = 'th';
          break;
        case 'zh_cn':
          res = 'zh-CN';
          break;
        case 'zh_tw':
          res = 'zh-TW';
          break;
        default:
          res = 'en-US';
          break;
      }

      return res;
    }
  },
  created() {
    this.onDateRangeChange(this.range);
  },
  methods: {
    onDateRangeChange(e) {
      this.$emit('handleDateRange', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.datetime-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .datetime-input {
    position: relative;
    flex-grow: 1;

    .datetime-svg {
      width: 1rem;
      color: rgb(113, 128, 150);
      position: absolute;
      pointer-events: none;
      height: 100%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }

    .datetime-input-area {
      padding-left: 2rem;
      padding-right: 0.5rem;
      padding-top: .25rem;
      padding-bottom: .25rem;
      flex-grow: 1;
      background-color: rgb(247, 250, 252);
    }
  }

  .datetime-arrow {
    flex-shrink: 0;
    margin: .5rem;

    .arrow-svg {
      width: 1rem;
      color: rgb(113, 128, 150);
      stroke: currentColor;
      height: 1rem;
    }
  }
}
</style>
