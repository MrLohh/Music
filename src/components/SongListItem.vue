<template>
  <ul class="song-list">
    <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
      <!--<img :src="value.song.album.picUrl" alt="">-->
      <img v-lazy="value.picUrl" alt="">
      <div>
        <h3>{{value.name}}</h3>
        <p>{{value.singer}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongListItem',
  props: {
    songs: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
    }
  }
}
</script>

<style scoped lang="scss">
  @import 'src/assets/css/variable';
  @import 'src/assets/css/mixin';
  .song-list {
    width: 100%;
    .item {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      border-bottom: 1px solid #ccc;
      img {
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div {
        width: 70%;
        h3 {
          @include font_size($font_medium);
          margin-bottom: 10px;
          @include font_color();
          @include no-wrap();
        }
        p {
          @include font_size($font_samll);
          @include font_color();
          @include no-wrap();
          opacity: .8;
        }
      }
    }
  }
</style>
