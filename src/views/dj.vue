<template>
  <div v-show="show" class="dj-page">
    <div class="playlist-info">
      <Cover
        :id="rid"
        :image-url="picUrl"
        :show-play-button="false"
        :always-show-shadow="true"
        :click-cover-to-play="true"
        :fixed-size="288"
        type="dj"
        :cover-hover="false"
        :play-button-size="18"
      />
      <div class="info">
        <div class="title">{{ title }}</div>
        <div v-if="subtitle !== ''" class="subtitle">{{ subtitle }}</div>
        <div class="artist">Podcast by {{ dj.nickname }}</div>
        <div class="date-and-count">
          <span :title="createTime | formatDate">{{
            new Date(createTime).getFullYear()
          }}</span>
          <span> · {{ programCount }} {{ $t('podcast.episodes') }}</span>
        </div>
        <div class="description" @click="toggleFullDescription">
          {{ description }}
        </div>
        <div class="buttons" style="margin-top: 32px">
          <ButtonTwoTone icon-class="play" @click.native="playThisDj">
            {{ $t('common.play') }}
          </ButtonTwoTone>
          <ButtonTwoTone color="grey" @click.native="toggleSubscribeDj">
            <span v-if="subscribed">{{ $t('podcast.unsubscribe') }}</span>
            <span v-else>{{ $t('podcast.subscribe') }}</span>
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

    <TrackList
      :id="rid"
      :tracks="programs"
      :type="'dj'"
      :dbclick-track-func="'playDjPrograms'"
    />

    <div class="load-more">
      <ButtonTwoTone
        v-show="hasMore"
        color="grey"
        :loading="loadingMore"
        @click.native="loadMore()"
        >{{ $t('explore.loadMore') }}</ButtonTwoTone
      >
    </div>

    <Modal
      :show="showFullDescription"
      :close="toggleFullDescription"
      :show-footer="false"
      :click-outside-hide="true"
      :title="$t('podcast.podcastDesc')"
    >
      <p class="description-fulltext">
        {{ description }}
      </p>
    </Modal>

    <ContextMenu ref="djMenu">
      <div class="item" @click="copyUrl(rid)">{{
        $t('contextMenu.copyUrl')
      }}</div>
      <div class="item" @click="openInBrowser(rid)">{{
        $t('contextMenu.openInBrowser')
      }}</div>
    </ContextMenu>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NProgress from 'nprogress';

import { formatTimestamp } from '@/utils/common';
import { getDjDetail, getDjPrograms, subscribeDj } from '@/api/dj';
import { isAccountLoggedIn } from '@/utils/auth';
import ButtonTwoTone from '@/components/ButtonTwoTone';
import ContextMenu from '@/components/ContextMenu.vue';
import Cover from '@/components/Cover';
import Modal from '@/components/Modal';
import TrackList from '@/components/TrackList';
import locale from '@/locale';

export default {
  name: 'Dj',
  components: {
    ButtonTwoTone,
    ContextMenu,
    Cover,
    Modal,
    TrackList,
  },
  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params.id);
    next();
  },
  data() {
    return {
      show: false,
      rid: 0,
      title: '',
      subtitle: '',
      description: '',
      picUrl: '',
      dj: {
        id: 0,
        nickname: '',
      },
      programCount: 0,
      programs: [],
      hasMore: true,
      loadingMore: true,
      showFullDescription: false,
      createTime: 0,
      subscribed: false,
    };
  },
  computed: {
    ...mapState(['player']),
  },
  activated() {
    if (this.rid?.toString() !== this.$route.params.id) {
      this.loadData(this.$route.params.id);
    } else {
      this.$parent.$refs.scrollbar.restorePosition();
    }
  },
  methods: {
    ...mapActions(['showToast']),
    playThisDj() {
      let programMap = {};
      let trackIDs = this.programs.map(t => {
        programMap[t.mainTrackId] = t.id;
        return t.mainTrackId;
      });
      this.player.replacePlaylist(trackIDs, programMap, 'dj');
    },
    loadData(rid) {
      this.show = false;
      setTimeout(() => {
        if (!this.show) NProgress.start();
      }, 1000);
      getDjDetail(rid).then(data => {
        data = data.data;
        this.rid = data.id;
        this.title = data.name;
        this.subtitle = data.rcmdText;
        this.description = data.desc;
        this.dj = data.dj;
        this.picUrl = data.picUrl;
        this.createTime = data.createTime;
        this.subscribed = data.subed;

        // Reset programs
        this.programs = [];
        this.programCount = 0;
        this.loadMore();

        NProgress.done();
        this.show = true;
      });
    },
    loadMore() {
      this.loadingMore = true;
      getDjPrograms(this.$route.params.id, {
        limit: 50,
        offset: this.programs.length,
      }).then(data => {
        this.programCount = data.count;
        this.programs.push(
          ...data.programs.map(p => {
            p.mainSong = {
              ...p.mainSong,
              dt: p.duration,
              playable: true,
            };
            p = {
              ...p,
              al: {
                picUrl: p.coverUrl,
              },
              ar: [
                {
                  name: p.dj.nickname,
                },
              ],
            };
            // Use create time as the artist name
            p.mainSong.artists[0].name = formatTimestamp(p.createTime);
            return p;
          })
        );
        this.hasMore = data.more;
      });
      this.loadingMore = false;
    },
    toggleSubscribeDj() {
      if (!isAccountLoggedIn()) {
        this.showToast(locale.t('toast.needToLogin'));
        return;
      }
      subscribeDj({
        rid: this.rid,
        t: this.subscribed ? 0 : 1,
      }).then(data => {
        if (data.code === 200) this.subscribed = !this.subscribed;
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
      this.$refs.djMenu.openMenu(e);
    },
    copyUrl(id) {
      let showToast = this.showToast;
      this.$copyText(`https://music.163.com/#/djradio?id=${id}`)
        .then(function () {
          showToast(locale.t('toast.copied'));
        })
        .catch(error => {
          showToast(`${locale.t('toast.copyFailed')}${error}`);
        });
    },
    openInBrowser(id) {
      const url = `https://music.163.com/#/djradio?id=${id}`;
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.dj-page {
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
    .subtitle {
      font-size: 22px;
      font-weight: 600;
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
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
