<template>
  <div class="allsongsheet">
    <div> 
      <div class="nav-top">
        <span @click="backBtn">
          <img :src="backImg" width="30px" height="30px">
        </span>
        <span class="nav-title">精品歌单 * 全部</span>
      </div>
      <div class="bg"></div>

      <div class="songsheet-top"  v-for="(item,index) in highquality" :key="index" @click="highqualityList(item)">
        <div class="songsheet-img">
          <img :src="item.coverImgUrl" width="100px" height="100px">
        </div>
        <div class="songsheet-tab">
          <div class="tab-name">{{item.name}}</div>
          <div class="creator-nickname">by {{item.creator.nickname}}</div>
          <div class="item-copywriter">{{item.copywriter}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "allsongsheet",
   data() {
    return {
      highquality: [],
      backImg: require("../../../public/img/awo.png")
    };
  },
  created() {
    this.axios.get("/data/top/playlist/highquality").then(response => {
      let res = response.data;
      this.highquality = res.playlists;
      // eslint-disable-next-line
      // console.log("this.highquality", this.highquality);
    });
  },
  methods: {
    backBtn() {
      this.$router.back();
    },
    highqualityList(params){
      this.$router.push({name:'highqualityList',params})
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
.bg {
  width: 100%;
  height: 50px;
}

.songsheet-top {
  width: 100%;
  height: 110px;
  display: flex;
  border-bottom: .3px solid #ccc;
  .songsheet-img {
    flex: 0 0 110px;
    border-radius: 6px;
    margin: 8px 8px;
  }
  .tab-name {
    margin: 13px 0;
    line-height: 20px;
  }
  .creator-nickname{
    margin: 5px 0;
    font-size: 10px;
    color:rgb(161, 161, 161);
  }
  .item-copywriter{
    font-size: 11px;
    color:rgb(138, 137, 137);
  }
}
</style>

