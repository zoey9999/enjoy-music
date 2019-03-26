<template>
  <div id="app">
    <div class="nav" v-show="navShow">
      <div class="wraper">
        <img :src="myImg" width="25px" height="25px">
      </div>
      <div class="nav-center">
        <router-link to="/mine" tag="div" class="nav-tab mine"></router-link>
        <router-link to="/" tag="div" class="nav-tab home"></router-link>
        <router-link to="/mv" tag="div" class="nav-tab mymv"></router-link>
      </div>
      <router-link to="/search">
        <div class="search">
          <img :src="searchImg" width="30px" height="30px" class="search-right">
        </div>
      </router-link>
    </div>
    <router-view/>

    <div class="music-footer" v-show="footShow">
      <div class="footer-avater" @click="musicDetail">头像</div>
      <div class="footer-center">
        <div class="music-name" @click="musicDetail">歌名</div>
      </div>

      <div class="footer-item" @click="pauseMusic">
        <img v-show="this.$store.state.playing" :src="playImg" width="30px" height="30px">
        <img v-show="!this.$store.state.playing" :src="layImg" width="30px" height="30px">
      </div>
      <div class="footer-item">
        <img :src="lstImg" width="30px" height="30px" @click="listMusic">
      </div>
    </div>

    <!-- 显示播放列表 -->
    <ShowMusicList v-show="this.listShow" @transform="transform"></ShowMusicList>
  </div>
</template>
<script>
import ShowMusicList from "./components/ShowMusicList.vue";
export default {
  name: "app",
  data() {
    return {
      listShow: false,
      navShow: true,
      footShow: true,
      myImg: require("../public/img/a41.png"),
      searchImg: require("../public/img/a3y.png"),
      layImg: require("../public/img/akx.png"),
      lstImg: require("../public/img/b68.png"),
      playImg: require("../public/img/b6t.png")
    };
  },
  created() {
    // 获取播放中的ID
    if (this.$store.state.playingMusicId !== null) {
      this.axios
        .get("/data/playlist/detail?id=" + this.$store.state.playingMusicId)
        .then(response => {
          let res = response.data;
          this.playlist = res.playlist;
          this.tracks = this.playlist.tracks;
          // eslint-disable-next-line
          console.log("this.playlist", this.playlist);
          // console.log("this.tracks", this.tracks);
        });
    }
  },
  watch: {
    $route(e) {
      if (
        e.name == "home" ||
        e.name == "mv" ||
        e.name == "mine" ||
        e.name == "recommend" ||
        e.name == "friends" ||
        e.name == "radiostation"
      ) {
        this.navShow = true;
        this.footShow = true;
      } else if (e.name == "musicdetail") {
        this.footShow = false;
      } else {
        this.navShow = false;
        this.footShow = true;
      }
    }
  },
  methods: {
    listMusic() {
      this.listShow = !this.listShow;
    },
    //子组件播放列表反向传回来的值
    transform(msg) {
      this.listShow = msg;
    },
    //跳转至播放详情页
    musicDetail() {
      this.$router.push({ name: "musicdetail" });
    },
    //暂停音乐
    pauseMusic() {
      if (this.$store.state.playingMusicId !== null) {
        if (this.$store.state.playing) {
          this.$store.state.audio.pause();
          this.$store.commit("changePlaying", false);
        } else {
          this.$store.state.audio.play();
          this.$store.commit("changePlaying", true);
        }
      }
    }
  },
  // 获取播放中的ID
  // playingMusicId() {
  //   return this.$store.state.playingMusicId;
  // },
  components: {
    ShowMusicList
  }
};
</script>
<style lang="scss" scoped>
.nav {
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  width: 100%;
  height: 50px;
  background-color: red;

  .wraper,
  .nav-center,
  .search {
    flex: 1;
    margin-top: 15px;
  }

  .nav-center {
    margin: 0 auto;
    display: inline-block;

    .nav-tab {
      display: inline-block;
      width: 25%;
      height: 40px;
      vertical-align: top;
    }
    .home {
      background: url("../public/img/a59.png") no-repeat;
      background-size: 27px 27px;
      margin: 15px 13px;
    }
    .home.active {
      display: inline-block;
      background: url("../public/img/a4d.png") no-repeat;
      background-size: 27px 29px;
      margin: 15px 13px;
    }
    .mine {
      background: url("../public/img/a59.png") no-repeat;
      background-size: 27px 27px;
      margin-top: 15px;
    }
    .mine.active {
      background: url("../public/img/a4d.png") no-repeat;
      background-size: 27px 29px;
      margin-top: 15px;
    }
    .mymv {
      background: url("../public/img/b7x.png") no-repeat;
      background-size: 29px 29px;
      margin-top: 14px;
    }
    .mymv.active {
      background: url("../public/img/a3p.png") no-repeat;
      background-size: 27px 27px;
      margin-top: 14px;
    }
  }

  .search-right {
    display: block;
    float: right;
    margin: 0 15px;
  }
}

.music-footer {
  left: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  background-color: white;

  .footer-avater {
    flex: 0 0 60px;
    background-color: aquamarine;
  }
  .footer-center {
    flex: 0 0 55%;
    border: 1px solid #cccccc;
  }
  .music-name {
    margin-top: 10px;
  }
  .footer-item {
    display: block;
    float: right;
    margin: 10px 5px;
  }
}
</style>


