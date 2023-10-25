import '@/assets/css/global.scss';
import '@/assets/css/nprogress.css';
import '@/assets/icons';
import '@/utils/filters';

import './registerServiceWorker';

import NProgress from 'nprogress';
import Vue from 'vue';

import { dailyTask } from '@/utils/common';
import i18n from '@/locale';

import App from './App.vue';
import router from './router';
import store from './store';

window.resetApp = () => {
  localStorage.clear();
  indexedDB.deleteDatabase('yesplaymusic');
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
  return '已重置应用，请刷新页面（按Ctrl/Command + R）';
};
console.log(
  '如出现问题，可尝试在本页输入 %cresetApp()%c 然后按回车重置应用。',
  'background: #eaeffd;color:#335eea;padding: 4px 6px;border-radius:3px;',
  'background:unset;color:unset;'
);

Vue.config.productionTip = false;

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });
dailyTask();

new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
