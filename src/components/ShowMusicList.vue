<template>
  <div class="show-music-list">
    <div class="show-music-top" @click="listMusic"></div>
    <div class="show-music-bottom">
      <div class="nav-top">
        <div class="top-play-list">播放列表({{this.$store.state.musicList.length}})</div>
        <div class="top-play-right">
          <span>收藏全部</span>
          <span @click="clearMusicList">
            全删除
            <!-- <img :src=""  width="30px" height="30px"> -->
          </span>
        </div>
      </div>

      <div class="music-list" v-for="(item,index) in musicList" :key="index" ref="wrapper">
        <div class="music-list-left" @click="changeMusic(item.id,index)">
          <span class="music-list-name">{{item.name}}</span>
          <span class="music-list-creator">--{{item.ar[0].name}}</span>
        </div>
        <div @click="removeMusic(item.id,index)">
          删除
          <!-- <img :src=""  width="30px" height="30px"> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
export default {
  name: "ShowMusicList",
  data() {
    return {
      listShow: true
    };
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.scroll = new BScroll(this.$refs.wrapper, {
  //       click: true
  //     });
  //   });
  // },
  methods: {
    // 传值给父组件
    listMusic() {
      this.listShow = false;
      this.$emit("transform", this.listShow);
    },

    // 清除播放列表
    clearMusicList() {
      // eslint-disable-next-line
      console.log("点击全删除");
      this.$store.state.audio.pause();
      this.$store.state.audio.src = null;
      // eslint-disable-next-line
      console.log(this.$store.state.audio.src);
      this.$store.commit("clearMusicList");
      this.$store.commit("changePlaying", false);
    },

    //切歌，修改 vuex 中的 musicIndex
    changeMusic(id, index) {
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
    // 删除播放列表中一首音乐
    removeMusic(id, index) {
      this.$store.commit("removeMusic", id);
      // 如果列表索引等于 vuex 中音乐索引
      if (index === this.$store.state.musicListIndex) {
        // 音乐暂停
        this.$store.state.audio.pause();
        this.$store.commit("changePlaying", false);
        // 定义一个比 musicListIndex 大 1 的值 musicIndex
        let musicIndex = this.$store.state.musicListIndex - 1;
        // 如果 musicIndex 等于 musicListIndex
        // eslint-disable-next-line
        console.log("musicIndex", musicIndex);   //可打印
        if (musicIndex === this.$store.state.musicListIndex) {
          // 获取 musicList 音乐列表音乐的 id
          let musicId = this.$store.state.musicList[musicIndex].id;
          // 获取单曲详情
          this.axios.get("/data/song/url?id=" + musicId).then(response => {
            // 获取 url
            let musicUrl = response.data.data[0].url;
            // 播放新音乐
            // eslint-disable-next-line
            console.log("musicUrl", musicUrl);//打印不出来
            this.$store.state.audio.src = musicUrl;
            this.$store.state.audio.play();
            this.$store.commit("changePlaying", true);
          });
        } else {
          // 当删除最后一首正在播放中的音乐，创建一个比 musicListIndex 小 1 的值
          let musicIndex = this.$store.state.musicListIndex - 1;
          if (musicIndex < 0) {
            musicIndex = 0;
            // this.$store.commit("removeMusic", id);
            if (this.$store.state.musicList.length === 0) {
              return;
            }
          }
          // 获取音乐 id
          let musicId = this.$store.state.musicList[musicIndex].id;
          // 修改 musicIndex 的值
          this.$store.commit("changeIndex", musicIndex);
          // 获取音乐地址(url)并播放
          this.axios.get("/data/song/url?id=" + musicId).then(response => {
            let musicUrl = response.data.data[0].url;
            this.$store.state.audio.src = musicUrl;
            this.$store.state.audio.play();
            this.$store.commit("changePlaying", true);
          });
        }
        // 从列表中删除 id 相同的这首歌曲
        // this.$store.commit("remodeMusic", id);
        // 如果渲染列表索引小于 musicListIndex 就让 musicListIndex 的值减 1,控制播放中状态的样式
      } else if (index < this.$store.state.musicListIndex) {
        this.$store.commit("desMusicIndex");
      }
      // 如果音乐列表的歌等于零，暂停音乐并把 ended 监听删除
      if (this.$store.state.musicList.length === 0) {
        this.$store.state.audio.pause();
        this.$store.commit("changePlaying", false);
        this.$store.state.audio.src = null;
        removeEventListener("ended", this.$store.state.endedListener);
        this.$store.commit("changeEndedListener", null);
      }
    }
  },
  computed: {
    // 获取播放列表
    musicList() {
      return this.$store.state.musicList;
    }
  }
};
</script>
<style lang="scss" scoped>
.show-music-list {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  .show-music-top {
    width: 100%;
    height: 40%;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
  .show-music-bottom {
    width: 100%;
    height: 60%;
    background-color: white;
    .nav-top {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #ccc;
      display: flex;
      .top-play-list {
        flex: 0 0 60%;
        margin-left: 10px;
      }
    }
    .music-list {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #ccc;
      display: flex;
      .music-list-left {
        flex: 0 0 85%;
        margin-left: 10px;
      }
      .music-list-creator {
        font-size: 11px;
        color: #696969;
      }
    }
  }
}
</style>

