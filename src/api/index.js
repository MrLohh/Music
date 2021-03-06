// 这个js文件就是用来管理请求各种接口地址的
import Network from './network'
// 获取轮播数据
export const getBanner = () => Network.get('banner?type=2')
// 获取推荐歌单数据
export const getPersonalized = () => Network.get('personalized?limit=6')
// 获取最新专辑数据
export const getNewAlbum = () => Network.get('album/newest')
// 获取最新音乐数据
export const getNewSong = () => Network.get('personalized/newsong')
// 获取推荐歌单详情页数据
export const getPlayList = (data) => Network.get('playlist/detail', data)
// 获取最新专辑详情页数据
export const getAlbum = (data) => Network.get('album', data)
// 获取歌曲详情数据
export const getSongDetail = (data) => Network.get('song/detail', data)
// 获取歌曲歌词
export const getSongLyric = (data) => Network.get('lyric', data)
// 获取音乐播放地址
export const getSongURL = (data) => Network.get('song/url', data)
// 获取热门歌手
// export const getHotArtists = () => Network.get('top/artists?offset=0&limit=5')
// 简单封装 改变抛出的数据 直接为数组，方便后续渲染
export const getHotArtists = () => {
  return new Promise((resolve, reject) => {
    Network.get('top/artists?offset=0&limit=5')
      .then((result) => {
        // console.log(result)
        resolve(result.artists)
      })
      .catch(err => {
        // console.log(err)
        reject(err)
      })
  })
}
// 获取 字母开头的 歌手
export const getLetterArtists = (letter) => {
  let letterArtists = []
  return new Promise((resolve, reject) => {
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&cat=1001&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=1002&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=1003&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=2002&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=2003&initial=${letter}`)
    ])
      .then(result => {
        // console.log(result)
        // resolve(result)
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 获取所有字母 歌手
export const getAllArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    let keys = ['热']
    let list = [getHotArtists()]
    for (let i = 65; i < 91; i++) { // 利用ascall码值生成字母
      let char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    // console.log(keys)
    Network.all(list)
      .then(function (result) {
        let obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
// 获取歌手单曲详情
export const getArtistsSongs = (data) => Network.get('artists', data)
// 获取排行榜详情
export const getTopListDetail = () => {
  return new Promise((resolve, reject) => {
    let category = {
      officialList: [
        { name: '云音乐飙升榜', id: 3 },
        { name: '云音乐新歌榜', id: 0 },
        { name: '网易原创歌曲榜', id: 2 },
        { name: '云音乐热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '抖音排行榜', id: 26 },
        { name: '云音乐ACG音乐榜', id: 22 },
        { name: '云音乐古典音乐榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard周榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon周榜', id: 10 },
        { name: 'iTunes榜', id: 8 },
        { name: '英国Q杂志中文版周榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '新声榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '电竞音乐榜', id: 30 },
        { name: '云音乐欧美热歌榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then((data) => {
        data.list.forEach((obj) => {
          let flag = false
          for (let key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        // console.log(category)
        resolve(category)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 获取榜单歌曲详情
export const getTopList = (data) => Network.get('top/list', data)
// 获取搜索单曲
export const getSearchList = (data) => Network.get('search?type=1', data)
// 获取热搜列表
export const getHotSearch = () => Network.get('search/hot')
