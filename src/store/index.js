import Vue from 'vue'
import Vuex from 'vuex'
import getter from './getter'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    // 播放器
    audio: null,
    // 音乐列表
    musicList: [],
    // 是否正在播放
    playing: false,
    // 音乐列表索引
    musicListIndex: 0,


    endedListener: null,
    // 正在播放的音乐 id
    playingMusicId: null,
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