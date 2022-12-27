<template>
  <div v-show="show" class="dj-program-page">
    <div class="playlist-info">
      <Cover
        :id="djProgram.id"
        :image-url="djProgram.coverUrl | resizeImage(1024)"
        :show-play-button="false"
        :always-show-shadow="true"
        :click-cover-to-play="true"
        :fixed-size="288"
        type="djProgram"
        :cover-hover="false"
        :play-button-size="18"
        @click.right.native="openMenu"
      />

      <div class="info">
        <div class="title" @click.right="openMenu"> {{ djProgram.name }}</div>
        <div class="artist">
          <span>
            <span>Podcast by </span>
            <router-link :to="`/dj/${djProgram.radio.id}`">{{
              djProgram.radio.name
            }}</router-link>
          </span>
        </div>
        <div class="date-and-count">
          <span :title="djProgram.createTime | formatDate">{{
            djProgram.createTime | formatDate('YYYY-MM-DD')
          }}</span>
        </div>
        <div class="description" @click="toggleFullDescription">
          {{ djProgram.description }}
        </div>
        <div class="buttons" style="margin-top: 32px">
          <ButtonTwoTone icon-class="play" @click.native="playDjProgram()">
            {{ $t('common.play') }}
          </ButtonTwoTone>
          <ButtonTwoTone
            icon-class="more"
            :icon-button="true"
            :horizontal-padding="0"
            color="grey"
            @click.native="openMenu"
          >
          </ButtonTwoTone>
        </div>
      </div>
    </div>

    <div>
      <TrackList
        :id="djProgram.radio.id"
        :tracks="tracks"
        :type="'dj'"
        :dbclick-track-func="'playDjPrograms'"
      />
    </div>

    <Modal
      :show="showFullDescription"
      :close="toggleFullDescription"
      :show-footer="false"
      :click-outside-hide="true"
      :title="$t('podcast.episodeDesc')"
    >
      <p class="description-fulltext">
        {{ djProgram.description }}
      </p>
    </Modal>

    <ContextMenu ref="djProgramMenu">
      <div class="item" @click="copyUrl(djProgram.id)">{{
        $t('contextMenu.copyUrl')
      }}</div>
      <div class="item" @click="openInBrowser(djProgram.id)">{{
        $t('contextMenu.openInBrowser')
      }}</div>
    </ContextMenu>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NProgress from 'nprogress';

import { getDjProgramDetail } from '@/api/dj';
import ButtonTwoTone from '@/components/ButtonTwoTone.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import Cover from '@/components/Cover.vue';
import Modal from '@/components/Modal.vue';
import TrackList from '@/components/TrackList.vue';
import locale from '@/locale';

export default {
  name: 'DjProgram',
  components: {
    ButtonTwoTone,
    ContextMenu,
    Cover,
    Modal,
    TrackList,
  },
  beforeRouteUpdate(to, from, next) {
    this.show = false;
    this.loadData(to.params.id);
    next();
  },
  data() {
    return {
      show: false,
      djProgram: {
        id: 0,
        name: '',
        description: '',
        picUrl: '',
        radio: {
          id: 0,
          name: '',
        },
      },
      tracks: [],
      showFullDescription: false,
    };
  },
  computed: {
    ...mapState(['player', 'data']),
  },
  created() {
    this.loadData(this.$route.params.id);
  },
  methods: {
    ...mapActions(['showToast']),
    playDjProgram() {
      let programMap = { [this.djProgram.mainTrackId]: this.djProgram.id };
      let trackIDs = [this.djProgram.mainTrackId];
      this.player.replacePlaylist(trackIDs, programMap, 'dj');
    },
    loadData(id) {
      setTimeout(() => {
        if (!this.show) NProgress.start();
      }, 1000);
      getDjProgramDetail(id).then(data => {
        this.djProgram = data.program;
        this.tracks = [
          {
            id: this.djProgram.id,
            name: this.djProgram.name,
            coverUrl: this.djProgram.coverUrl,
            mainTrackId: this.djProgram.mainTrackId,
            mainSong: {
              name: this.djProgram.name,
              dt: this.djProgram.duration,
              playable: true,
            },
            al: {
              picUrl: this.djProgram.coverUrl,
            },
            ar: [
              {
                name: this.djProgram.radio.name,
              },
            ],
          },
        ];
        NProgress.done();
        this.show = true;
      });
    },
    toggleFullDescription() {
      this.showFullDescription = !this.showFullDescription;
      if (this.showFullDescription) {
        this.$store.commit('enableScrolling', false);
      } else {
        this.$store.commit('enableScrolling', true);
      }
    },
    openMenu(e) {
      this.$refs.djProgramMenu.openMenu(e);
    },
    copyUrl(id) {
      let showToast = this.showToast;
      this.$copyText(`https://music.163.com/#/program?id=${id}`)
        .then(function () {
          showToast(locale.t('toast.copied'));
        })
        .catch(error => {
          showToast(`${locale.t('toast.copyFailed')}${error}`);
        });
    },
    openInBrowser(id) {
      const url = `https://music.163.com/#/program?id=${id}`;
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.dj-program-page {
  margin-top: 32px;
}

.playlist-info {
  display: flex;
  width: 78vw;
  margin-bottom: 72px;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    margin-left: 56px;
    color: var(--color-text);
    .title {
      font-size: 56px;
      font-weight: 700;
    }
    .artist {
      font-size: 18px;
      opacity: 0.88;
      margin-top: 24px;
      a {
        font-weight: 600;
      }
    }
    .date-and-count {
      font-size: 14px;
      opacity: 0.68;
      margin-top: 2px;
    }
    .description {
      user-select: none;
      font-size: 14px;
      opacity: 0.68;
      margin-top: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      cursor: pointer;
      white-space: pre-line;
      &:hover {
        transition: opacity 0.3s;
        opacity: 0.88;
      }
    }
    .buttons {
      margin-top: 32px;
      display: flex;
      button {
        margin-right: 16px;
      }
    }
  }
}

.description-fulltext {
  font-size: 16px;
  margin-top: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-line;
}
</style>
