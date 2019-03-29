<template>
  <div>
    <div class="video-container" ref="wrapper">
      <div>
        <div v-for="(item,index) in videoList" :key="index"  @click="playNewVideo(item.id)">
          <div class="video-item">
            <video
              width="100%"
              height="100%"
              controls
              :poster="item.cover"
            ></video>
            <div class="title-item">
              <span class="title">{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "mv",
  data() {
    return {
      videoList: [],
      isindex: -1
    };
  },
  created() {
    this.axios.get("/data/mv/first?limit=20").then(response => {
      let res = response.data;
      this.videoList = res.data;
      // eslint-disable-next-line
      console.log("this.videoList", this.videoList);
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        });
      });
    });
  },
  method: {
    playNewVideo(data) {
      // eslint-disable-next-line
      console.log("点击播放音乐");
      this.axios.get("/data/mv/url?id=" + data).then(response => {
        //   let res = response.data;
        //   this.videoList = res.data;
        // eslint-disable-next-line
        console.log("response", response);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.video-container {
  margin-top: 60px;
  width: 100%;
  height: 450px;
  overflow: hidden;

  .video-item {
    margin-bottom: 10px;
    position: relative;
    height: 211px;

    .title-item {
      position: absolute;
      z-index: 10;
      top: 30px;
    }

    .title {
      color: white;
      font-size: 20px;
    }
  }
}
</style>
