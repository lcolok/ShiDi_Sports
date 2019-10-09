// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Upload, Icon, Drawer, Carousel, CarouselItem, Dialog, Button, Message,Loading
} from 'element-ui';
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Drawer);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
