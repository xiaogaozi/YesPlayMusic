import updateApp from '@/utils/updateApp';

import initLocalStorage from './initLocalStorage';
import pkg from '../../package.json';

if (localStorage.getItem('appVersion') === null) {
  localStorage.setItem('settings', JSON.stringify(initLocalStorage.settings));
  localStorage.setItem('data', JSON.stringify(initLocalStorage.data));
  localStorage.setItem('appVersion', pkg.version);
}

updateApp();

function _loadRecentPlayDjPrograms() {
  const data = JSON.parse(localStorage.getItem('data'));
  const recentPlayDjPrograms = data.recentPlayDjPrograms || [];
  console.debug(
    `Load ${recentPlayDjPrograms.length} recent played DJ programs from local storage`
  );
  return new Map(recentPlayDjPrograms);
}

export default {
  showLyrics: false,
  enableScrolling: true,
  title: 'YesPlayMusic',
  liked: {
    songs: [],
    songsWithDetails: [], // 只有前12首
    playlists: [],
    albums: [],
    artists: [],
    mvs: [],
    cloudDisk: [],
    djs: [],
  },
  contextMenu: {
    clickObjectID: 0,
    showMenu: false,
  },
  toast: {
    show: false,
    text: '',
    timer: null,
  },
  modals: {
    addTrackToPlaylistModal: {
      show: false,
      selectedTrackID: 0,
    },
    newPlaylistModal: {
      show: false,
      afterCreateAddTrackID: 0,
    },
  },
  dailyTracks: [],
  recentPlayDjProgramsCache: _loadRecentPlayDjPrograms(), // The last item is the most recent played program
  lastfm: JSON.parse(localStorage.getItem('lastfm')) || {},
  player: JSON.parse(localStorage.getItem('player')),
  settings: JSON.parse(localStorage.getItem('settings')),
  data: JSON.parse(localStorage.getItem('data')),
};
