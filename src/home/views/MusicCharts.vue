<template>
  <div>
    <div class="nav-top">
      <span @click="backBtn">
        <img :src="backImg" width="30px" height="30px">
      </span>
      <span class="nav-title">排行榜</span>
    </div>
    <div class="ranking-list"></div>

    <div class="ranking-list">官方榜</div>

    <div class="ranking-list-item" v-for="(item,index) in list" :key="index">
      <div class="ranking-item">
        <img :src="item.coverImgUrl" width="90px" height="90px">
      </div>
      <div class="ranking-music" v-for="(three,index) in topthree" :key="index">
        <div class="ranking-item">{{three}}</div>
      </div>
    </div>

    <div class="ranking-list">推荐榜</div>

    <div class="ranking-list-two" v-for="item in list2" :key="item.id">
      <div class="ranking-item-two">
        <img :src="item.coverImgUrl" width="98%" height="98%">
      </div>
      <div class="ranking-music-two">{{item.name}}</div>
    </div>

    <div class="ranking-list">全球榜</div>
    <div class="ranking-list-two" v-for="item in list3" :key="item.id">
      <div class="ranking-item-two">
        <img :src="item.coverImgUrl" width="98%" height="98%">
      </div>
      <div class="ranking-music-two">{{item.name}}</div>
    </div>
    <div class="ranking-list"></div>
  </div>
</template>

<script>
export default {
  name: "musiccharts",
  data() {
    return {
      list: [],
      list2: [],
      list3: [],
      biaosheng: [],
      newmusic: [],
      personmusic: [],
      hotmusic: [],
      backImg: require("../../../public/img/awo.png"),
      topthree: [
        {
          biaosheng: []
        },
        { newmusic: [] },
        { personmusic: [] },
        { hotmusic: [] }
      ]
    };
  },
  created() {
    this.axios.get("/data/toplist").then(response => {
      let res = response.data.list;
      this.list = res.splice(0, 4);
      this.list2 = res.splice(5, 6);
      this.list3 = res.splice(11, 3);
      // eslint-disable-next-line
      console.log("this.list", this.list);
    }),
      this.axios.get("/data/top/list?idx=3").then(response => {
        let res = response.data.playlist;
        this.biaosheng = res.tracks.splice(0, 3);
        // eslint-disable-next-line
        console.log("this.biaosheng", this.biaosheng);
      }),
      this.axios.get("/data/top/list?idx=0").then(response => {
        let res = response.data.playlist;
        this.newmusic = res.tracks.splice(0, 3);
        // eslint-disable-next-line
        console.log("this.newmusic", this.newmusic);
      }),
      this.axios.get("/data/top/list?idx=2").then(response => {
        let res = response.data.playlist;
        this.personmusic = res.tracks.splice(0, 3);
        // eslint-disable-next-line
        console.log("this.personmusic", this.personmusic);
      }),
      this.axios.get("/data/top/list?idx=1").then(response => {
        let res = response.data.playlist;
        this.hotmusic = res.tracks.splice(0, 3);
        // eslint-disable-next-line
        console.log("this.hotmusic", this.hotmusic);
      });
  },
  methods: {
    backBtn() {
      this.$router.back();
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
  background-color: rgb(247, 7, 7);
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
.ranking-list {
  width: 100%;
  height: 40px;
  font-weight: 800;
  line-height: 40px;
  margin-left: 10px;
}
.ranking-list-item {
  width: 100%;
  height: 100px;
  display: flex;
  border-bottom: 0.2px solid #ccc;
  .ranking-item {
    flex: 0 0 110px;
    img {
      margin: 5px 10px;
      border-radius: 10px;
    }
  }
  .ranking-music {
    .ranking-music-name {
      margin: 15px 0;
      color: rgb(92, 91, 91);
    }
  }
}

.ranking-list-two {
  width: 30%;
  height: 130px;
  margin-left: 8px;
  display: inline-table;
  img {
    border-radius: 10px;
  }
  .ranking-music-two {
    font-size: 12px;
    margin-top: 8px;
  }
}
</style>

