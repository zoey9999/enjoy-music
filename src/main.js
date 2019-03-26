import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
    if(localStorage.getItem("musicList")===null){
      localStorage.setItem("musicList",'')
    }
    this.$store.state.localMusicList=localStorage.getItem("musicList")
  },
  render: h => h(App)
}).$mount('#app')
