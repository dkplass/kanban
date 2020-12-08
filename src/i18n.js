import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store'

import en from './i18n/en'
import th from './i18n/th'
import vi from './i18n/vi'
import zh_cn from './i18n/zh_cn'
import zh_tw from './i18n/zh_tw'

Vue.use(VueI18n)

function switchLanguage() {
  let res = ''
  const lang = window.localStorage.getItem('language')

  if (lang) {
    res = lang
  } else {
    res = 'zh_tw'
  }

  store.dispatch('app/switchLanguage', lang)

  return res
}

const locale = switchLanguage()

/*
// 從API取得詞語表
const dictionary = await store.dispatch('dictionary/getDictionary', locale)
*/

const messages = {
  en,
  th,
  vi,
  zh_cn,
  zh_tw
}

const i18n = new VueI18n({
  locale,
  messages,
  fallbackLocale: 'en',
  silentTranslationWarn: true
})

export default i18n
