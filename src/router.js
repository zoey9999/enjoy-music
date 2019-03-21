import Vue from 'vue'
import Router from 'vue-router'
import HomeMusic from './views/HomeMusic.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeMusic,
      children:[
        {
          path: '/',
          name: 'recommend',
          component: () => import('./home/Recommend.vue')
        },
        {
          path: '/home/friends',
          name: 'friends',
          component: () => import('./home/Friends.vue')
        },
        {
          path: '/home/radiostation',
          name: 'radiostation',
          component: () => import('./home/RadioStation.vue')
        }
      ]
    },
    {
      path: '/home/primaryfm',
      name: 'primaryfm',
      component: () => import('./home/views/PrimaryFM.vue')
    },
    {
      path: '/home/dailyrecommended',
      name: 'dailyrecommended',
      component: () => import('./home/views/DailyRecommended.vue')
    },
    {
      path: '/home/songsheet',
      name: 'songsheet',
      component: () => import('./home/views/SongSheet.vue')
    },
    {
      path: '/home/musiccharts',
      name: 'musiccharts',
      component: () => import('./home/views/MusicCharts.vue')
    },
    {
      path: '/home/allsongsheet',
      name: 'allsongsheet',
      component: () => import('./home/views/AllSongsheet.vue')
    },
    {
      path: '/home/highqualitylist',
      name: 'highqualityList',
      component: () => import('./home/views/HighqualityList.vue')
    },



//------------------------------------------------------------------------------------------

    {
      path: '/mine',
      name: 'mine',
      component: () => import('./views/Mine.vue')
    },
    {
      path: '/mine/localmusic',
      name: 'localmusic',
      component: () => import('./mine/LocalMusic.vue')
    },
    {
      path: '/mine/recentmusic',
      name: 'recentmusic',
      component: () => import('./mine/RecentMusic.vue')
    },
    {
      path: '/mine/downloadmusic',
      name: 'downloadmusic',
      component: () => import('./mine/DownloadMusic.vue')
    },
    {
      path: '/mine/radiomusic',
      name: 'radiomusic',
      component: () => import('./mine/RadioMusic.vue')
    },
    {
      path: '/mine/collectmusic',
      name: 'collectmusic',
      component: () => import('./mine/CollectMusic.vue')
    },

//----------------------------------------------------------------------------------------------------------
    {
      path: '/mv',
      name: 'mv',
      component: () => import('./views/Mv.vue')
    }
  ],
  linkExactActiveClass: 'active'
})
