<template>
  <section class="main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'Main',
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 3rem;
  min-height: calc(100vh - 3rem);
  width: 100%;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 0;
}
</style>
