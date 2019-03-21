<template>
  <div class="home">
    <div class="nav">
      <router-link to="/" tag="div" class="nav-tab recommend">推荐</router-link>
      <router-link to="/home/friends" tag="div" class="nav-tab friends">朋友</router-link>
      <router-link to="/home/radiostation" tag="div" class="nav-tab radio">电台</router-link>
    </div>

    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
<style lang="scss" scoped>
.home {
  top: 50px;
  width: 100%;
  height: 100%;
  .nav {
    left: 0;
    top: 50px;
    position: fixed;
    width: 100%;
    height: 50px;
    display: flex;
    background-color: red;
    .nav-tab {
      flex: 1;
      line-height: 50px;
      text-align: center;
    }
    .active{
      color: white;
      border-bottom: 3px solid white;
    }
  }
}
</style>

