import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from './store';

import en from './i18n/en';
import th from './i18n/th';
import vi from './i18n/vi';
import zh_cn from './i18n/zh_cn';
import zh_tw from './i18n/zh_tw';

Vue.use(VueI18n);

const setI18nLocale = (lang) => {
  i18n.locale = lang;
  window.localStorage.setItem('language', lang);
  store.dispatch('app/switchLanguage', lang);
  return lang;
};

const validLocale = (locale) => {
  const localeList = ['en', 'th', 'vi', 'zh_cn', 'zh_tw'];
  return localeList.some(element => element === locale);
};

const locale = () => {
  // const urlLocale = window.location.pathname.replace(/^\/[^\/]+\/([^\/]+).*/, '$1')
  let localStoredLocale = window.localStorage.getItem('language');

  if (!validLocale(localStoredLocale)) {
    localStoredLocale = 'zh_tw';
  }

  store.dispatch('app/switchLanguage', localStoredLocale);

  return localStoredLocale;
};

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
};

export const i18n = new VueI18n({
  locale: locale(),
  messages,
  fallbackLocale: 'en',
  silentTranslationWarn: true
});

export function loadLocaleAsync(lang) {
  if (validLocale(lang) && i18n.locale !== lang) {
    return Promise.resolve(setI18nLocale(lang));
  }

  const exist = locale();

  return Promise.resolve(setI18nLocale(exist));
}
