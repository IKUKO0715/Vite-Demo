// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
import { createApp } from 'vue';
import App from './App.vue';

// 引入Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 引入自定义样式文件
import './styles/element-plus.scss';
// Element Plus全局配置国际化
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

// 引入Vue-Router
import Router from './router';

// 引入Axios
import axios from 'axios';
axios.defaults.baseURL = "https://partner.apptutti.com";

// 引入Vue-i18n
import i18n from './lang'

const app = createApp(App);
app.use(Router);
app.use(i18n);
// app.use(ElementPlus);
app.use(ElementPlus, {
    // locale: zhCn,
    locale: localStorage.getItem('locale') == 'zh_CN' ? zhCn : en
});
app.mount('#app');

/**
 * 将axios挂载为app的全局自定义属性后，每个组件可以通过this直接访问到全局挂载的自定义属性
 * e.g. this.$http.get('/login');
 * ===================================
 * 如果使用组合式API【setup()语法】，由于vue3.0没有this，需要使用getCurrentInstance来获取上下文
 * e.g.
 * const { proxy } = getCurrentInstance()
   proxy.$http.get('api/getNewsList')
   .then((response)=>{
       console.log(response)
   });
 */
app.config.globalProperties.$http = axios;