<template>
  <b-dropdown :text="language" size="sm" right menu-class="language-menu" class="language">
    <b-dropdown-item v-for="(lang, index) in languages" :key="index" @click="setLang(lang)">{{ lang }}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LanguageSwitch',
  data() {
    return {
      displayLanguage: this.language
    };
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    languages() {
      const list = ['en', 'vi', 'zh_cn', 'zh_tw', 'th'];

      return list;
    }
  },
  methods: {
    setLang(lang) {
      this.displayLanguage = lang;
      this.$store.dispatch('app/switchLanguage', lang);
      this.$i18n.locale = lang;
      localStorage.setItem('language', lang);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .language-menu {
  min-width: 4rem;
  padding: .4rem .4rem;
  background-color: #304156;

  .dropdown-item {
    color: #ffffff;
    padding: .2rem .8rem;
  }

  .dropdown-item:hover, .dropdown-item:focus {
    background-color: #37383a;
    color: #ffffff;
    border-radius: 2rem;
  }

  .dropdown-item.active, .dropdown-item:active {
    background-color: rgba($color: #304156, $alpha: .5)
  }
}
</style>
