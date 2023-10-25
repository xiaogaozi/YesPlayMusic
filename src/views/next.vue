<template>
  <div class="next-tracks">
    <h1>{{ $t('next.nowPlaying') }}</h1>
    <TrackList
      :tracks="[currentTrack]"
      :type="trackListType"
      dbclick-track-func="none"
    />
    <h1 v-show="playNextList.length > 0"
      >插队播放
      <button @click="player.clearPlayNextList()">清除队列</button>
    </h1>
    <TrackList
      v-show="playNextList.length > 0"
      :tracks="playNextTracks"
      :type="trackListType"
      :highlight-playing-track="false"
      dbclick-track-func="playTrackOnListByID"
      item-key="id+index"
      :extra-context-menu-item="['removeTrackFromQueue']"
    />
    <h1>{{ $t('next.nextUp') }} ({{ filteredTracks.length }})</h1>
    <TrackList
      :tracks="filteredTracks"
      :type="trackListType"
      :highlight-playing-track="false"
      dbclick-track-func="playTrackOnListByID"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getDjProgramDetail } from '@/api/dj';
import { getTrackDetail } from '@/api/track';
import TrackList from '@/components/TrackList.vue';

export default {
  name: 'Next',
  components: {
    TrackList,
  },
  data() {
    return {
      tracks: [],
    };
  },
  computed: {
    ...mapState(['player']),
    currentTrack() {
      if (this.player.playlistSource.type === 'dj') {
        const trackId = this.player.currentTrack.id;
        const programId = this.player.playlistSource.id[trackId] || trackId;
        return {
          id: programId,
          mainSong: {
            ...this.player.currentTrack,
            dt: this.player.currentTrack.duration,
            playable: true,
          },

          // Context menu needed properties
          al: { picUrl: this.player.currentTrack.al.picUrl },
          name: this.player.currentTrack.name,
          ar: [{ name: this.player.currentTrack.al.name }],
        };
      } else {
        return this.player.currentTrack;
      }
    },
    playerShuffle() {
      return this.player.shuffle;
    },
    filteredTracks() {
      let trackIDs = this.player.list.slice(
        this.player.current + 1,
        this.player.current + 100
      );
      return this.tracks.filter(
        t => trackIDs.includes(t.id) || trackIDs.includes(t.mainTrackId)
      );
    },
    playNextList() {
      return this.player.playNextList;
    },
    playNextTracks() {
      return this.playNextList.map(tid => {
        return this.tracks.find(t => t.id === tid);
      });
    },
    trackListType() {
      return this.player.playlistSource.type === 'dj' ? 'dj' : 'playlist';
    },
  },
  watch: {
    currentTrack() {
      this.loadTracks();
    },
    playerShuffle() {
      this.loadTracks();
    },
    playNextList() {
      this.loadTracks();
    },
  },
  activated() {
    this.loadTracks();
    this.$parent.$refs.scrollbar.restorePosition();
  },
  methods: {
    ...mapActions(['playTrackOnListByID']),
    loadTracks() {
      // 获取播放列表当前歌曲后100首歌
      let trackIDs = this.player.list.slice(
        this.player.current + 1,
        this.player.current + 100
      );

      // 将playNextList的歌曲加进trackIDs
      trackIDs.push(...this.playNextList);

      if (trackIDs.length > 0) {
        if (this.player.playlistSource.type === 'dj') {
          const requests = trackIDs.map(trackId => {
            const programId = this.player.playlistSource.id[trackId] || trackId;
            return getDjProgramDetail(programId);
          });
          Promise.all(requests).then(results => {
            this.tracks = results.map(data => {
              const program = data.program;
              program.mainSong = {
                ...program.mainSong,
                dt: program.duration,
                playable: true,
              };
              return {
                ...program,
                al: { picUrl: program.coverUrl },
                ar: program.mainSong.artists.map(ar => {
                  ar.id = program.radio.id;
                  ar.name = program.radio.name;
                  return ar;
                }),
              };
            });
          });
        } else {
          getTrackDetail(trackIDs.join(',')).then(data => {
            this.tracks = data.songs;
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 36px;
  margin-bottom: 18px;
  cursor: default;
  color: var(--color-text);
  display: flex;
  justify-content: space-between;
  button {
    color: var(--color-text);
    border-radius: 8px;
    padding: 0 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    opacity: 0.68;
    font-weight: 500;
    &:hover {
      opacity: 1;
      background: var(--color-secondary-bg);
    }
    &:active {
      opacity: 1;
      transform: scale(0.92);
    }
  }
}
</style>
