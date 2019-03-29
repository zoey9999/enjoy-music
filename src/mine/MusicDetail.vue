<template>
  <div class="all-bg">
    <div class="nav-top">
      <div @click="backBtn" class="nav-top-tab">
        <img :src="backImg" width="30px" height="30px">
      </div>
      <div>
        <div class="nav-title">{{this.$store.state.nowPlayingName}}</div>
        <div class="nav-singer">{{this.$store.state.nowPlayingArname}}</div>
      </div>
    </div>
    <div class="bg"></div>

    <div class="center-all">
      <div class="center-img">
        <img :src="blackBGImg" width="250px" height="250px" class="black-bg">
        <img
          :src="this.$store.state.nowPlayingPicUrl"
          width="160px"
          height="160px"
          class="playing-pic"
        >
      </div>
      <div class="center-img-bottom">
        <div class="center-bottom-img" @click="colectLike">
          <img :src="likeImg" width="40px" height="40px" v-show="!this.islike">
          <img :src="redLikeImg" width="50px" height="50px"  v-show="this.islike">
        </div>
        <div class="center-bottom-img">
          <img :src="downBGImg" width="25px" height="25px" class='bottom-center'>
        </div>
        <div class="center-bottom-img">
          <img :src="tolkBGImg" width="25px" height="25px" class='bottom-center'>
        </div>
        <div class="center-bottom-img">
          <img :src="rightBGImg" width="40px" height="40px">
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="progress-bar">进度条</div>
      <div class="footer-tab">
        <div class="footer-tab-item">
          <!-- <img :src="singleImg" width="60px" height="60px"> -->
          <img :src="randomImg" width="60px" height="60px">
        </div>
        <div class="footer-tab-item" @click="preMusic">
          <img :src="preImg" width="28px" height="28px" class="pre-next-img">
        </div>
        <div class="footer-tab-item" @click="pauseMusic">
          <img v-show="this.$store.state.playing" :src="playImg" width="50px" height="50px">
          <img v-show="!this.$store.state.playing" :src="stopImg" width="50px" height="50px">
        </div>
        <div class="footer-tab-item" @click="nextMusic">
          <img :src="nextImg" width="28px" height="28px" class="pre-next-img">
        </div>
        <div class="footer-tab-item" @click="listMusic">
          <img :src="listImg" width="60px" height="60px">
        </div>
      </div>
    </div>

    <!-- 显示播放列表 -->
    <ShowMusicList v-show="this.listShow" @transform="transform"></ShowMusicList>
  </div>
</template>

<script>
import ShowMusicList from "../components/ShowMusicList.vue";
export default {
  name: "musicdetail",
  data() {
    return {
      islike: false,
      listShow: false,
      backImg: require("../../public/img/awo.png"),
      singleImg: require("../../public/img/ayg.png"),
      randomImg: require("../../public/img/ayu.png"),
      preImg: require("../../public/img/b7y.png"),
      playImg: require("../../public/img/b7v.png"),
      stopImg: require("../../public/img/b7x.png"),
      nextImg: require("../../public/img/b7t.png"),
      listImg: require("../../public/img/ayx.png"),
      likeImg: require("../../public/img/b8m.png"),
      redLikeImg: require("../../public/img/a_v.png"),
      blackBGImg: require("../../public/img/azp.png"),
      downBGImg: require("../../public/img/ajy.png"),
      tolkBGImg: require("../../public/img/ajx.png"),
      rightBGImg: require("../../public/img/ayf.png"),
      // b7x暂停  b7v播放 b7t下一首 b7y上一首 b8m喜欢  ayg单曲循环 ayu随机播放 ayx列表 ayf选择 azp大黑 a_v红心 ajy下载 ajx评论 ayf右点
    };
  },
  mounted() {
    if (this.$store.state.playing) {
      this.$store.state.audio.play();
      this.$store.commit("changePlaying", true);
    }
  },
  computed: {
    musicDetail: function() {
      return this.$route.params;
    }
  },
  methods: {
    //返回上一个路由
    backBtn() {
      this.$router.back();
    },
    //显示子组件播放列表
    listMusic() {
      this.listShow = !this.listShow;
    },
    //子组件播放列表反向传回来的值
    transform(msg) {
      this.listShow = msg;
    },
    //暂停音乐
    pauseMusic() {
      if (this.$store.state.playing) {
        this.$store.state.audio.pause();
        this.$store.commit("changePlaying", false);
      } else {
        this.$store.state.audio.play();
        this.$store.commit("changePlaying", true);
      }
    },
    //播放上一首
    preMusic() {
      // eslint-disable-next-line
      console.log(
        "this.$store.state.musicListIndex",
        this.$store.state.musicListIndex
      );
      this.$store.commit("desMusicIndex");
      let index = this.$store.state.musicListIndex;
      let id = this.$store.state.musicList[index].id;
      this.axios.get("/data/song/url?id=" + id).then(response => {
        let musicUrl = response.data.data[0].url;
        // eslint-disable-next-line
        console.log("musicUrl", musicUrl);
        if (musicUrl === null) {
          this.prevMusic();
        }
        this.$store.state.audio.src = musicUrl;
        // eslint-disable-next-line
        console.log("this.$store.state.audio.src", this.$store.state.audio.src);
        this.$store.state.audio.play();
        this.$store.commit("changePlaying", true);
      });
    },
    //播放下一首
    nextMusic() {
      // eslint-disable-next-line
      console.log(
        "this.$store.state.musicListIndex",
        this.$store.state.musicListIndex
      );
      this.$store.commit("addMusicIndex");
      let index = this.$store.state.musicListIndex;
      let id = this.$store.state.musicList[index].id;
      this.axios.get("/data/song/url?id=" + id).then(response => {
        let musicUrl = response.data.data[0].url;
        if (musicUrl === null) {
          this.nextMusic();
        }
        this.$store.state.audio.src = musicUrl;
        this.$store.state.audio.play();
        this.$store.commit("changePlaying", true);
      });
    },
    //收藏单首变红
    colectLike() {
      this.islike=!this.islike

    }
  },
  components: {
    ShowMusicList
  }
};
</script>
<style lang="scss" scoped>
.all-bg {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
.nav-top {
  position: fixed;
  display: flex;
  width: 100%;
  height: 60px;
  background-color: rgb(153, 151, 151);
  border-bottom: 1px solid #ccc;
  .nav-top-tab {
    flex: 0 0 40px;
    margin: 10px 10px;
  }
  .nav-title {
    display: inline-block;
    vertical-align: top;
    color: white;
    margin: 10px 0;
  }
  .nav-singer {
    font-size: 12px;
    color: rgb(187, 187, 187);
  }
}
.bg {
  width: 100%;
  height: 50px;
}

.center-all {
   width: 100%;
   height: 400px;
  .center-img {
    width: 80%;
    height: 50px;
    margin: 25% auto;
    .black-bg {
      position: absolute;
      z-index: 2;
    }
    .playing-pic {
      z-index: 100;
      border-radius: 50%;
      margin: 45px 45px;
      position: absolute;
    }
  }
  .center-img-bottom {
    display: flex;
    width: 80%;
    height: 50px;
    margin-top: 77%;
    margin-left: 10%;
    .center-bottom-img {
      flex: 1;
      border: 1px solid #ccc;
      .bottom-center{
        margin:7px 10px;
      }
    }
  }
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 90px;
  border: 1px solid #ccc;
  background-color: rgb(153, 151, 151);
  .progress-bar {
    width: 100%;
    height: 30px;
  }
  .footer-tab {
    display: flex;
    width: 100%;
    height: 60px;
    bottom: 0;
    .footer-tab-item {
      flex: 1;
      .pre-next-img {
        margin: 15px 10px;
      }
    }
  }
}
</style>

