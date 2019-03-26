<template>
  <div class="songsheet">
    <div class="nav">
      <div class="nav-top">
        <span @click="backBtn">
          <img :src="backImg" width="30px" height="30px">
        </span>
        <span class="nav-title">歌单</span>
      </div>
      <div class="bg"></div>

      <div class="songsheet-top"  @click="allSongsheet">
        <!-- <img :src="playtops.coverImgUrl" width="200%" height="200%" class="bgImg"> -->
        <div class="songsheet-img">
          <img :src="playtops.coverImgUrl" width="90px" height="90px">
        </div>
        <div class="songsheet-tab">
          <div class="tab-name">精品歌单</div>
          <div class="playtops-name">{{playtops.name}}</div>
          <div class="playtops-copywriter">{{playtops.copywriter}}</div>
        </div>
      </div>
    </div>

    <div class="all-tab" @click="allSongsheet">
      <div class="all-item">全部歌单</div>
      <div class="all-item all-right">
        <div class="all-right">
          <span>华语</span>|
          <span>说唱</span>|
          <span>民谣</span>
        </div>
      </div>
    </div>

    <div class="songsheet-every">
      <div class="songsheet-contain" v-for="(item,index) in playlists" :key="index">
        <div class="contain-img">
          <img :src="item.coverImgUrl" width="100%" height="100%">
        </div>
        <div class="contain-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "songsheet",
  data() {
    return {
      playlists: [],
      playtops: [],
      backImg: require("../../../public/img/awo.png")
    };
  },
  created() {
    this.axios.get("/data/top/playlist/catlist").then(response => {
      let res = response.data;
      this.playlists = res.playlists;
      // eslint-disable-next-line
      // console.log("this.playlists", this.playlists);
    }),
      this.axios
        .get("/data/top/playlist/highquality/?limit=1")
        .then(response => {
          let res = response.data;
          this.playtops = res.playlists[0];
        });
  },
  methods: {
    backBtn() {
      this.$router.back();
    },
    allSongsheet() {
      this.$router.push({ name: "allsongsheet" });
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
  background-color: rgb(151, 150, 150);
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
.songsheet-top {
  width: 100%;
  height: 120px;
  display: flex;
  background-color: #ccc;
  overflow: hidden;
  .bgImg{
    z-index: -2;
  }
  .songsheet-img {
    flex: 0 0 100px;
    margin: 5px 5px;
    border-radius: 10px;
  }
  .tab-name {
    font-size: 18px;
    color: white;
    margin: 20px 0;
  }
  .playtops-name {
    font-size: 14px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 8px 1px;
  }
  .playtops-copywriter{
    font-size: 10px;
    color: rgb(218, 216, 216);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.all-tab {
  width: 100%;
  height: 50px;
  display: flex;
  line-height: 50px;
  .all-item {
    flex: 1;
  }
  .all-right {
    display: block;
    float: right;
    color: #7c7a7a;
    span {
      margin: 0 5px;
      font-size: 13px;
    }
  }
}

.songsheet-every {
  width: 100%;
  height: 100%;
  .songsheet-contain {
    width: 49%;
    height: 210px;
    display: inline-table;
    .contain-img {
      margin: 5px 5px;
      border-radius: 5px;
    }
    .contain-name {
      margin: 5px 5px;
      font-size: 13px;
      color: rgb(90, 89, 89);
    }
  }
}
</style>

