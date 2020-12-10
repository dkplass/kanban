import router from './router';
import { loadLocaleAsync } from './i18n';
// import store from './store'
import getPageTitle from '@/utils/get-page-title';

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title);

  // generate accessible routes map based on roles
  // const accessRoutes = await store.dispatch('permission/generateRoutes', 'admin')

  // dynamically add accessible routes
  // router.addRoutes(accessRoutes)

  let language = to.query.language || '';

  switch (language) {
    case '01':
      language = 'zh_tw';
      break;
    case '02':
      language = 'en';
      break;
    case '03':
      language = 'vi';
      break;
    case '04':
      language = 'th';
      break;
    default:
      language = '';
  }

  loadLocaleAsync(language).then(() => next());

  next();
});
