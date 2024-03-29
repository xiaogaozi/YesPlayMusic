import { playlistCategories } from '@/utils/staticData';
import shortcuts from '@/utils/shortcuts';

console.debug('[debug][initLocalStorage.js]');
const enabledPlaylistCategories = playlistCategories
  .filter(c => c.enable)
  .map(c => c.name);

let localStorage = {
  player: {},
  settings: {
    lang: null,
    musicLanguage: 'all',
    appearance: 'auto',
    musicQuality: 320000,
    lyricFontSize: 28,
    outputDevice: 'default',
    showPlaylistsByAppleMusic: true,
    enableUnblockNeteaseMusic: true,
    automaticallyCacheSongs: true,
    cacheLimit: 8192,
    enableReversedMode: false,
    nyancatStyle: false,
    showLyricsTranslation: true,
    lyricsBackground: true,
    closeAppOption: 'ask',
    enableDiscordRichPresence: false,
    enableGlobalShortcut: true,
    showLibraryDefault: false,
    subTitleDefault: false,
    linuxEnableCustomTitlebar: false,
    enabledPlaylistCategories,
    proxyConfig: {
      protocol: 'noProxy',
      server: '',
      port: null,
    },
    shortcuts: shortcuts,

    // Maloja settings
    enableMaloja: false,
    malojaConfig: {
      serverUrl: null,
      apiKey: null,
      authUsername: null,
      authPassword: null,
    },
  },
  data: {
    user: {},
    likedSongPlaylistID: 0,
    lastRefreshCookieDate: 0,
    loginMode: null,
    recentPlayDjPrograms: [], // The last item is the most recent played program
  },
};

if (process.env.IS_ELECTRON === true) {
  localStorage.settings.automaticallyCacheSongs = true;
}

export default localStorage;
