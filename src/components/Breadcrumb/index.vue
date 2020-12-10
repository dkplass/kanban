<template>
  <!-- <b-breadcrumb class="custom-breadcrumb" :items="items" /> -->
  <b-breadcrumb class="custom-breadcrumb">
    <b-breadcrumb-item v-for="(item, index) in items" :key="index" :active="item.active">
      {{ $t(`global.${item.text}`) }}
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      items: []
    };
  },
  watch: {
    $route(route) {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched);
      }

      this.items = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);

      this.items.map(item => {
        // item.text = this.$t(`global.${item.meta.title}`)
        item.text = item.meta.title;
        item.active = true;
      });
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-breadcrumb {
  margin: 0;
  padding: 0;
  background-color: transparent;
  height: 100%;
  align-content: center;
  margin-left: .4rem;

  .active {
    cursor: default;
  }
}
</style>
