<template>
  <div>
    <div class="nav">
      <div class="nav-top">
        <span @click="backBtn">
          <img :src="backImg" width="30px" height="30px">
        </span>
        <span class="nav-title">本地音乐</span>
      </div>

      <div class="nav-center">
        <router-link to="/mine" tag="div" class="nav-tab mine">
          <div class="music-router">单曲</div>
        </router-link>
        <router-link to="/" tag="div" class="nav-tab home">
          <div class="music-router">歌手</div>
        </router-link>
        <router-link to="/mv" tag="div" class="nav-tab mymv">
          <div class="music-router">专辑</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "localmusic",
  data() {
    return {
      backImg: require("../../public/img/awo.png")
    };
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
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: red;
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

.nav-center {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: red;
  display: flex;
  .nav-tab{
        flex:1;
        color: white;
        text-align: center;
  }
}
</style>

