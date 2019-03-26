<template>
  <div class="mine">
    <div class="nav-center">
      <div class="nav-red"></div>

      <div class="tab-item" @click="localMusic"> 
        <div class="left-img">
          <img :src="musicImg" width="30px" height="30px">
        </div>
        <div class="text">本地音乐</div>
      </div>
      
      <div class="tab-item" @click="recentMusic"> 
        <div class="left-img">
          <img :src="recentlyImg" width="30px" height="30px">
        </div>
        <div class="text">最近播放</div>
      </div>

      <div class="tab-item" @click="downloadMusic"> 
        <div class="left-img">
          <img :src="downloadImg" width="30px" height="30px">
        </div>
        <div class="text">下载管理</div>
      </div>

      <div class="tab-item" @click="radioMusic"> 
        <div class="left-img">
          <img :src="radioImg" width="30px" height="30px">
        </div>
        <div class="text">我的电台</div>
      </div>

      <div class="tab-item" @click="collectMusic"> 
        <div class="left-img">
          <img :src="collectImg" width="30px" height="30px">
        </div>
        <div class="text">我的收藏</div>
      </div>
    </div>


    <div class="song-sheet">
      创建的歌单
    </div>



    <div class="song-sheet">
      收藏的歌单
    </div>
    <div class="song-sheet-list">{{this.$store.state.collectlist}}</div>
  </div>
</template>
<script>
export default {
  name: 'mine',
  data() {
    return {
      musicImg:require('../../public/img/ahu.png'),
      recentlyImg:require('../../public/img/agw.png'),
      downloadImg:require('../../public/img/ah1.png'),
      radioImg:require('../../public/img/agz.png'),
      collectImg:require('../../public/img/ahf.png')
    }
  },
   created() {
    this.axios.get("/data/top/playlist/catlist/"+this.$store.state.collectlist).then(response => {
      // let res = response.data;
      // this.playlists = res.playlists;
      // eslint-disable-next-line
      console.log("response",response);
    })
   },
  methods: {
    localMusic() {
      this.$router.push({path: '/mine/localmusic'})
    },
    recentMusic() {
      this.$router.push({path: '/mine/recentmusic'})
    },
    downloadMusic() {
      this.$router.push({path: '/mine/downloadmusic'})
    },
    radioMusic() {
      this.$router.push({path: '/mine/radiomusic'})
    },
    collectMusic() {
      this.$router.push({path: '/mine/collectmusic'})
    },
  }
}
</script>
<style lang="scss" scoped>
  .mine{
    width:100%;
    height:100%;
    .nav-red{
      width:100%;
      height:60px;
      background-color: red;
    }

    .tab-item{
      width: 100%;
      height:45px;
      border-bottom: 1px solid #ccc;
      display: flex;

      .left-img{
        flex: 0 0 35px;
        margin:10px 7px;
      }
      .text{
        line-height: 45px;
      }
    }

.song-sheet{
  width:100%;
  height:30px;
  color:rgb(116, 115, 115);
  background-color: rgb(238, 236, 236);
  font-size: 13px;
  line-height: 30px;
}
.song-sheet-list{
   width:100%;
  height:100%;
}
  }
</style>

