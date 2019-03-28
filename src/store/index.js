import Vue from 'vue'
import Vuex from 'vuex'
import getter from './getter'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    ref:null,
    // 播放器
    audio: null,
    // 音乐列表
    musicList: [],
    // 是否正在播放
    playing: false,
    // 音乐列表索引
    musicListIndex: 0,
    //收藏歌单
    collectlist:null,
    //搜索的结果id
    searchDtail:null,
    // 正在播放的音乐 id
    playingMusicId: null,
    // 正在播放的音乐图片
    nowPlayingPicUrl:null,
    // 正在播放的歌名
    nowPlayingName:null,
    // 正在播放的歌手
    nowPlayingArname:null,
    //点进去的歌单列表
    highqualityList:null,
    //点进去的歌单id
    highqualityListId:null,



    endedListener: null,
    // 排行榜数据
    topListData: null,
    // 排行榜评论数据
    reviewData: null,
    // 歌单数据
    playListData: [],
    // 歌单分类
    typeName: '全部',
    // 歌单数量
    totalMusicList: null,
}

export default new Vuex.Store({
    state,
    getter,
    mutations
})