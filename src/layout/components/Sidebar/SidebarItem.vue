<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <b-list-group-item class="menu-item" :class="{'submenu-title-noDropdown':!isNest}">
          <b-icon class="item-icon" :icon="onlyOneChild.meta.icon" />
          <span>{{ $t(`global.${onlyOneChild.meta.title}`) }}</span>
        </b-list-group-item>
      </AppLink>
    </template>
    <BaseDropdown v-else tag="div" title-tag="b-list-group-item">
      <template slot="title-container">
        <b-list-group-item class="menu-item">
          <b-icon class="item-icon" :icon="item.meta.icon" />
          <span>{{ $t(`global.${item.meta.title}`) }}</span>
          <b-icon class="collapse-btn" icon="caret-down-fill" />
        </b-list-group-item>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </BaseDropdown>
  </div>
</template>

<script>
import path from 'path'
import AppLink from './link.vue'
import BaseDropdown from '@/components/Tabs/BaseDropdown.vue'

export default {
  name: 'SidebarItem',
  components: {
    AppLink,
    BaseDropdown
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-btn {
  float: right;
  height: 100%;
  vertical-align: middle;
}
</style>
