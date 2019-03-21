<template>
  <div id="app">
    <div class="nav"  v-show="footShow">
      <div class="wraper">
        <img :src="myImg" width="25px" height="25px">
      </div>
      <div class="nav-center">
        
        <router-link to="/mine" tag="div" class="nav-tab mine"></router-link>
        <router-link to="/" tag="div" class="nav-tab home"></router-link> 
        <router-link to="/mv" tag="div" class="nav-tab mymv"></router-link> 
      </div>
      
      <div class="search">
        <img :src="searchImg" width="30px" height="30px" class="search-right">
      </div>
    </div>
    <router-view/>

    <div class="music-footer">
      <div class="footer-avater">头像</div>
      <div class="footer-center">
        <div class="music-name">歌名</div>
      </div>
      <div class="footer-item">
        <img :src="layImg" width="30px" height="30px">
      </div>
      <div class="footer-item">
        <img :src="lstImg" width="30px" height="30px">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      footShow: true,
      myImg:require('../public/img/a41.png'),
      searchImg:require('../public/img/a3y.png'),
      layImg:require('../public/img/akx.png'),
      lstImg:require('../public/img/b68.png'),
    }
  },
  watch: {
    $route(e) {
      if(e.name=="home" || e.name=="mv" || e.name=="mine" || e.name=="recommend" || e.name=="friends" || e.name=="radiostation"){
        this.footShow=true
      }else{
        this.footShow=false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav{
    left: 0;
    top:0;
    position:fixed;
    display: flex;
    width:100%;
    height:50px;
    background-color: red;

    .wraper,
    .nav-center,
    .search{
      flex:1;
      margin-top:15px;
    }

    .nav-center{
      margin: 0 auto;
      display: inline-block;
      
      .nav-tab {
        display: inline-block;
        width:25px;
        height:40px;
        vertical-align: top;
      }
      .home{
        background: url('../public/img/a59.png') no-repeat;
        background-size: 25px 25px;
        margin:15px 13px;
      }
      .home.active{
        background: url('../public/img/a4d.png') no-repeat;
        background-size: 25px 28px;
        margin:15px 13px;
      }
       .mine{
        background: url('../public/img/a59.png') no-repeat;
        background-size: 25px 25px;
        margin-top: 15px;
        
      }
      .mine.active{
        background: url('../public/img/a4d.png') no-repeat;
        background-size: 25px 28px;
        margin-top: 15px;
      }
       .mymv{
        background: url('../public/img/b7x.png') no-repeat;
        background-size: 29px 29px;
        margin-top: 14px;
      }
      .mymv.active{
        background: url('../public/img/a3p.png') no-repeat;
        background-size: 27px 27px;
        margin-top: 14px;
      }
    }

    .search-right{
      display: block;
      float: right;
      margin: 0 15px;
    }
  }


   .music-footer{
    left:0;
    bottom: 0;
    position: fixed;
    display: flex;
    width:100%;
    height: 50px;
    border: 1px solid #ccc;
    background-color: white;

    .footer-avater{
      flex: 0 0 60px;
      background-color: aquamarine;
    }
    .footer-center{
      flex: 0 0 55%;
      border: 1px solid #cccccc;
    }
    .music-name{
      margin-top: 10px;
    }
    .footer-item{
      display: block;
      float:right;
      margin: 10px 5px;
      
    }
  }
</style>


