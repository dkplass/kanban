<template>
  <div class="navbar">
    <div class="hamburger-container" @click="toggleSideBar">
      <b-icon icon="list" class="hamburger-icon" font-scale="1.4" aria-hidden="true" />
    </div>

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <LanguageSwitch />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import LanguageSwitch from '@/components/LanguageSwitch'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    LanguageSwitch
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 3rem;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: block;

  .hamburger-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }

    .hamburger-icon {
      margin: 0 .4rem;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
  }
}
</style>
