<template>
  <div>
    <div class="nav">
      <span class="back" @click="backBtn">
        <img :src="backBtnimg" width="35px" height="35px">
      </span>
      <input type="text" placeholder="搜你感兴趣的热搜" @input="changeVal" v-model="searchVal">
      <span class="search-text" @click="searchResult">搜索</span>
    </div>

    <div class="contain">
      <ul>
        <li
          v-for="(item,index) in songsList"
          :key="index"
          class="item-list"
          @click="toDetail(item,item.id)"
        >
          <div class="item-title">
            <span class="num">{{index+1}}</span>
            <span class="title">{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      songsList: [],
      searchVal: "",
      backBtnimg: require("../../public/img/awo.png")
    };
  },
  methods: {
    backBtn() {
      this.$router.back();
    },

    changeVal(e) {
      if (e.target.value.length !== 0) {
        this.searchVal = e.target.value;
        //   this.showHot = false;
      } else {
        //   this.showHot = true;
      }
    },
    searchResult() {
      if (this.searchVal !== "") {
        this.axios
          .get("/data/search?keywords=" + this.searchVal)
          .then(response => {
            let res = response.data.result;
            this.songsList = res.songs;
            // eslint-disable-next-line
            console.log("this.songsList", this.songsList);
          });
      }
    },
    toDetail(item,id) {
      // eslint-disable-next-line
      console.log("id", id);
      this.$store.commit("searchDtail", id);
      this.$router.push({ name: "musicdetail",item});
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  background-color: red;

  .back {
    width: 30px;
    height: 25px;
    margin: 4px 6px;
    display: inline-block;
  }
  input {
    width: 65%;
    height: 25px;
    margin: 5px 6px;
    vertical-align: top;
    border-radius: 15px;
    border: 1px solid #ccc;
    outline: medium;
    text-align: center;
    background-color: red;
    color: white;
  }
  .search-text {
    display: inline-block;
    vertical-align: top;
    width: 35px;
    height: 30px;
    line-height: 30px;
    margin-top: 8px;
  }
}

.item-list {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #ccc;
  line-height: 45px;
  white-space: nowrap;
  .num {
    display: inline-block;
    margin: auto 10px;
    height: 45px;
    color: rgb(94, 93, 93);
    vertical-align: top;
  }
  .title {
    display: inline-block;
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

