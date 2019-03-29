<template>
  <div class="recommend" ref="wrapper">
    <div class="gap"></div>
    <div class="nav-carousel">
      <div class="bgc"></div>
      <div class="carousel">
        <div class="carousel-item" v-for="(item,index) in banner" :key="index">
          <img :src="item.imageUrl" width="100%" height="100%">
        </div>
      </div>
    </div>

    <div class="tab">
      <div class="tab-item" @click="primaryFM">
        <div class="img-red">
          <img :src="fmImg" width="50px" height="70px">
        </div>
        <div>私人FM</div>
      </div>
      <div class="tab-item" @click="dailyRecommended">
        <div class="img-red">
          <img :src="dayImg" width="30px" height="30px">
        </div>
        <div>每日推荐</div>
      </div>
      <div class="tab-item" @click="songSheet">
        <div class="img-red">
          <img :src="sheepImg" width="35px" height="35px">
        </div>
        <div>歌单</div>
      </div>
      <div class="tab-item" @click="charts">
        <div class="img-red">
          <img :src="paiImg" width="35px" height="35px">
        </div>
        <div>排行榜</div>
      </div>
    </div>

    <div class="recommend-list" @click="songSheet">
      推荐歌单
      <!-- <img :src=""> -->
    </div>

    <div class="recommend-item">
      <div
        class="music-item"
        v-for="(item,index) in playlists"
        :key="index"
        @click="highqualityList(item,item.id)"
      >
        <img :src="item.coverImgUrl" width="98%" height="100px">
        <div class="item-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      playlists: [],
      banner: [],
      fmImg: require("../../public/img/a7e.png"),
      dayImg: require("../../public/img/adw.png"),
      sheepImg: require("../../public/img/ad5.png"),
      paiImg: require("../../public/img/abw.png")
      // ad5歌单 a7e abw排 adw每日推荐
    };
  },
  mounted() {
    if (this.$store.state.playing) {
      this.$store.state.audio.play();
      this.$store.commit("changePlaying", true);
    }
  },
  created() {
    this.axios.get("/data/top/playlist/?limit=6&order=hot").then(response => {
      let res = response.data;
      this.playlists = res.playlists;
    }),
      this.axios.get("/data/banner").then(response => {
        this.banner = response.data.banners;
        // eslint-disable-next-line
        // console.log("this.banner", this.banner);
      });
  },
  methods: {
    primaryFM() {
      this.$router.push({ name: "musicdetail"});
    },
    dailyRecommended() {
      this.$router.push({ name: "highqualityList" });
    },
    songSheet() {
      this.$router.push({ name: "songsheet" });
    },
    charts() {
      this.$router.push({ name: "musiccharts" });
    },

    highqualityList(data,id) {
      this.$store.commit("highqualityList", data);
      this.$store.commit("highqualityListId", id);
      this.$router.push({ name: "highqualityList" });
    }
  }
};
</script>
<style lang="scss" scoped>
.gap {
  width: 100%;
  height: 100px;
}
.nav-carousel {
  width: 100%;
  height: 130px;
  border: 1px solid #ccc;
  .bgc {
    width: 100%;
    height: 13px;
    background-color: red;
  }
  .carousel {
    top: 110px;
    width: 90%;
    height: 100px;
    margin-left: 4%;
    z-index: 10;
    overflow: hidden;
    .carousel-item {
      width: 100%;
      height: 100px;
    }
    img {
      display: inline-block;
      border-radius: 3px;
    }
  }
}

.tab {
  width: 100%;
  height: 90px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 13px;
    .img-red {
      width: 50px;
      height: 50px;
      margin: 8px auto;
      border-radius: 50%;
      background-color: red;
      img{
        margin-top:5px;
      }
    }
  }
}

.recommend-list {
  width: 100%;
  height: 50px;
  font-size: 17px;
  font-weight: 800;
  line-height: 60px;
}

.recommend-item {
  width: 98%;
  height: 300px;
  margin: 0 auto;
  .music-item {
    width: 32%;
    height: 140px;
    margin: 5px 2px;
    display: inline-table;
    img {
      border-radius: 7px;
    }
    .item-name {
      font-size: 11px;
      color: rgb(122, 122, 122);
    }
  }
}
</style>
