<template>
    <transition @enter="enter" @leave="leave" :css="false">
      <div class="mini-player" v-show="this.isShowMiniPlayer">
        <div class="player-wrapper">
          <div class="player-left" @click.stop="showNormalPlayer">
            <img :src="this.currentSong.picUrl" ref="cd">
            <div class="title">
              <h3>{{this.currentSong.name}}</h3>
              <p>{{this.currentSong.singer}}</p>
            </div>
          </div>
          <div class="player-right">
            <div class="play" @click="play" ref="play"></div>
            <div class="list" @click.stop="showList"></div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'MiniPlayer',
  methods: {
    showList () {
      this.setListPlayer(true)
    },
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    showNormalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, function () {
        done()
      })
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.cd.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cd.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.mini-player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left {
      display: flex;
      padding-left: 30px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: sport 5s linear infinite;
        // 设置动画状态为暂停
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
      }
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        /*align-items: center;*/
        h3 {
          @include font_size($font_medium);
          //@include font_color();
          color: #ddd;
        }
        p {
          @include font_size($font_medium_s);
          //@include font_color();
          color: #ddd;
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active {
          @include bg_img('../../assets/images/pause')
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
}
  @keyframes sport {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
