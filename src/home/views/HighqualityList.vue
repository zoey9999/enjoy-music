<template>
  <div>
    <div class="nav-top">
      <span @click="backBtn">
        <img :src="backImg" width="30px" height="30px">
      </span>
      <span class="nav-title">歌单</span>
    </div>
    <div class="bg"></div>

    <div class="songsheet-top-all">
      <div class="songsheet-top" v-if="highquality">
        <div class="songsheet-img">
          <img :src="highquality.coverImgUrl" width="100px" height="100px" class="coverImgUrl">
        </div>
        <div class="songsheet-tab">
          <div class="tab-name">{{highquality.name}}</div>
          <img :src="highquality.creator.avatarUrl" width="20px" height="20px" class="avatarUrl">
          <div class="highquality-copywriter">{{highquality.creator.nickname}}</div>
        </div>
      </div>
      <div class="highquality-center">
        <div class="tap-item">
          <img :src="playImg" width="20px" height="20px">
          <div>{{highquality.commentCount}}</div>
        </div>
        <div class="tap-item">
          <img :src="playImg" width="20px" height="20px">
          <div>{{highquality.shareCount}}</div>
        </div>
        <div class="tap-item">
          <img :src="playImg" width="20px" height="20px">
          <div>下载</div>
        </div>
        <div class="tap-item">
          <img :src="playImg" width="20px" height="20px">
          <div>多选</div>
        </div>
      </div>
    </div>

    <div>
      <div class="play-all">
        <img :src="playImg" width="20px" height="20px">
        <span class="all-play">播放全部</span>
        <span class="all-num">共{{tracks.length}} 首</span>
        <div class="collect-num"  @click="collectMusicList($store.state.musicList)">+ 收藏({{ highquality.subscribedCount}})</div>
      </div>
      <div
        v-for="(item,index) in tracks"
        :key="item.id"
        class="play-item"
        @click="addMusicList(tracks)"
      >
        <div class="item-index">{{index+1}}</div>
        <div class="play-name" @click="changeMusic(item.id,index)">
          <!-- <div  @click="changeMusic(item.al.id)"> -->
          <div class="item-name">{{item.name}}</div>
          <div class="item-ar">{{item.ar[0].name}}-{{item.al.name}}</div>
          <!-- </div> -->
        </div>
        <div class="play-right">
          <img :src="playImg" width="20px" height="20px">
          <img :src="playImg" width="20px" height="20px">
        </div>
      </div>
    </div>

    <audio ref="audio"></audio>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "highqualityList",
  data() {
    return {
      tracks: [],
      musicAudio: null,
      playImg: require("../../../public/img/akx.png"),
      backImg: require("../../../public/img/awo.png")
    };
  },
  mounted() {
    this.$store.commit("getAudio", this.$refs.audio);
  },
  created() {
    if (this.$route.params.id !== null) {
      // eslint-disable-next-line
      // console.log("id不等于null");
      this.axios
        .get("/data/playlist/detail?id=" + this.$route.params.id)
        .then(response => {
          let res = response.data;
          this.playlist = res.playlist;
          this.tracks = this.playlist.tracks;
          if (this.$store.state.musicList !== []) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$store.state.ref, {
                click: true
              });
            });
          }
        });
    }
  },
  methods: {
    //返回上一个路由
    backBtn() {
      this.$router.back();
    },
    //收藏歌单
    collectMusicList(list) {
      this.$store.commit("collectMusicList", list);
      // eslint-disable-next-line 
      console.log('收藏歌单成功')
    },

    //传列表到vuex
    addMusicList(list) {
      this.$store.commit("addMusicList", list);
    },

    //切歌，修改 vuex 中的 musicIndex
    changeMusic(id, index) {
      this.$store.state.audio.pause();
      this.$store.commit("changeIndex", index);
      // if(!this.$store.state.musicList){
      //    this.$store.commit("changePlayListData", index);
      // }

      this.$store.commit("changePlayingMusicId", id);
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
        // eslint-disable-next-line
        console.log("this.$store.state.audio.src", this.$store.state.audio.src);
        this.$store.state.audio.play();
        this.$store.commit("changePlaying", true);
      });
    }
  },
  computed: {
    highquality: function() {
      return this.$route.params;
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-top {
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgb(153, 151, 151);
  img {
    margin: 10px 10px;
  }
  .nav-title {
    margin: auto 10px;
    display: inline-block;
    vertical-align: top;
    color: white;
  }
}
.bg {
  width: 100%;
  height: 50px;
}

.songsheet-top-all {
  width: 100%;
  height: 180px;
  background-color: #ccc;
  overflow: hidden;
  .songsheet-top {
    width: 100%;
    height: 130px;
    display: flex;
    .bgImg {
      z-index: -2;
    }
    .coverImgUrl {
      flex: 0 0 120px;
      margin: 15px 15px;
      border-radius: 10px;
    }
    .tab-name {
      font-size: 18px;
      color: white;
      margin: 16px 0;
      line-height: 26px;
    }
    .avatarUrl {
      display: inline-block;
      border-radius: 50%;
    }
    .highquality-copywriter {
      display: inline-block;
      font-size: 14px;
      color: rgb(236, 233, 233);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.highquality-center {
  width: 100%;
  height: 50px;
  display: flex;
  .tap-item {
    flex: 1;
    text-align: center;
    color: white;
  }
}

.play-all {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  img {
    display: inline-block;
    margin: 10px 10px;
  }
  .all-play {
    display: inline-block;
    line-height: 40px;
    vertical-align: top;
  }
  .all-num {
    display: inline-block;
    line-height: 40px;
    font-size: 13px;
    vertical-align: top;
    color: #ccc;
    margin-left: 10px;
  }
  .collect-num {
    width: 38%;
    height: 40px;
    display: block;
    float: right;
    background-color: red;
    color: white;
    border-radius: 10px;
  }
}

.play-item {
  width: 100%;
  height: 60px;
  display: flex;
  .item-index {
    margin: 10px 5px;
    flex: 0 0 40px;
    line-height: 40px;
    text-align: center;
  }
  .play-name {
    border-bottom: 1px solid #ccc;
    width: 70%;
    flex: 0 0 65%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .item-name {
      margin: 10px 0;
    }
    .item-ar {
      margin: 10px 0;
      font-size: 12px;
      color: #838282;
    }
  }
  .play-right {
    width: 100%;
    height: 60px;
    img {
      margin: 20px 5px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>

