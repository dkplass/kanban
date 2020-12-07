<template>
  <component :is="tag" v-b-toggle:my-collapse class="position-relative" v-bind="linkProps(hrefStr)">
    <slot name="title-container" />
    <b-collapse id="my-collapse">
      <slot />
    </b-collapse>
  </component>
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    title: {
      type: String,
      default: ''
    },
    titleTag: {
      type: String,
      default: 'div'
    },
    hrefStr: {
      type: String,
      default: '#'
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen
    },
    closeDropDown() {
      this.isOpen = false
    },
    linkProps(to) {
      return {
        to: to
      }
    }
  }
}
</script>
