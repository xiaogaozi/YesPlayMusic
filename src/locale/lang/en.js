export default {
  common: {
    play: 'PLAY',
    songs: 'Songs',
  },
  nav: {
    home: 'Home',
    explore: 'Explore',
    library: 'Library',
    search: 'Search',
    github: 'GitHub Repo',
  },
  footer: {
    settings: 'Settings',
  },
  home: {
    recommendPlaylist: 'Recommended Playlists',
    recommendArtist: 'Recommended Artists',
    newAlbum: 'Latest Albums',
    seeMore: 'SEE MORE',
    charts: 'Charts',
  },
  library: {
    sLibrary: "'s Library",
    likedSongs: 'Liked Songs',
    sLikedSongs: "'s Liked Songs",
    playlists: 'Playlists',
    albums: 'Albums',
    artists: 'Artists',
    mvs: 'MVs',
    podcasts: 'Podcasts',
    cloudDisk: 'Cloud Disk',
    newPlayList: 'New Playlist',
    uploadSongs: 'Upload Songs',
    playHistory: {
      title: 'Play History',
      week: 'Latest Week',
      all: 'All Time',
    },
    userProfileMenu: {
      settings: 'Settings',
      logout: 'Logout',
    },
  },
  explore: {
    explore: 'Explore',
    loadMore: 'Load More',
  },
  artist: {
    latestRelease: 'Latest Releases',
    latestMV: 'Latest MV',
    popularSongs: 'Popular Songs',
    showMore: 'SHOW MORE',
    showLess: 'SHOW LESS',
    EPsSingles: 'EPs & Singles',
    albums: 'Albums',
    withAlbums: 'Albums',
    artist: 'Artist',
    videos: 'Music Videos',
    following: 'Following',
    follow: 'Follow',
    similarArtists: 'Similar Artists',
    artistDesc: 'Artist Description',
  },
  album: {
    released: 'Released',
    albumDesc: 'Album Description',
  },
  playlist: {
    playlist: 'Playlists',
    updatedAt: 'Updated at',
    search: 'Search in playlist',
  },
  login: {
    accessToAll: 'Access to all data',
    loginText: 'Login to Netease',
    search: 'Search account',
    readonly: 'Only access to public data',
    usernameLogin: 'Username Login',
    searchHolder: 'Your account username',
    enterTip: "Press 'enter' to search",
    choose: 'Choose your account',
    confirm: 'Confirm',
    countryCode: 'Country code',
    phone: 'Phone',
    email: 'Email address',
    password: 'Password',
    login: 'Login',
    loginWithEmail: 'Login with Email',
    loginWithPhone: 'Login with Phone',
    notice: `YesPlayMusic promises not to save any of your account information to the cloud.<br />
      Your password will be MD5 encrypted locally and then transmitted to NetEase Music API.<br />
      YesPlayMusic is not the official website of NetEase Music, please consider carefully before entering account information. You can also go to <a href="https://github.com/qier222/YesPlayMusic">YesPlayMusic's GitHub repository</a> to build and use the self-hosted NetEase Music API.`,
    noticeElectron: `Your password will be MD5 encrypted locally and then transmitted to NetEase Music API.<br />
      YesPlayMusic promises not to save any of your account information to the cloud.<br />`,
  },
  mv: {
    moreVideo: 'More Videos',
  },
  next: {
    nowPlaying: 'Now Playing',
    nextUp: 'Next Up',
  },
  player: {
    like: 'Like',
    previous: 'Previous Song',
    next: 'Next Song',
    repeat: 'Repeat',
    repeatTrack: 'Repeat Track',
    shuffle: 'Shuffle',
    reversed: 'Reversed',
    play: 'Play',
    pause: 'Pause',
    mute: 'Mute',
    nextUp: 'Next Up',
  },
  modal: {
    close: 'Close',
  },
  search: {
    artist: 'Artists',
    album: 'Albums',
    song: 'Songs',
    mv: 'Music Videos',
    playlist: 'Playlists',
    podcast: 'Podcasts',
    noResult: 'No Results',
    searchFor: 'Search for',
  },
  settings: {
    settings: 'Settings',
    logout: 'LOGOUT',
    language: 'Languages',
    musicQuality: {
      text: 'Music Quality',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      lossless: 'Lossless',
    },
    cacheLimit: {
      text: 'Songs Cache limit',
      none: 'None',
    },
    lyricFontSize: {
      text: 'Lyric Font Size',
      small: 'Small',
      medium: 'Medium',
      large: 'Large (Default)',
      xlarge: 'X-Large',
    },
    deviceSelector: 'Audio Output Device',
    permissionRequired: 'Microphone Permission Required',
    appearance: {
      text: 'Appearance',
      auto: 'Auto',
      light: 'Light',
      dark: 'Dark',
    },
    automaticallyCacheSongs: 'Automatically cache songs',
    clearSongsCache: 'Clear Songs Cache',
    cacheCount: 'Cached {song} songs ({size})',
    showLyricsTranslation: 'Show lyrics translation',
    showPlaylistsByAppleMusic: 'Show playlists by Apple Music',
    enableDiscordRichPresence: 'Enable Discord Rich Presence',
    enableGlobalShortcut: 'Enable Global Shortcut',
    showLibraryDefault: 'Show Library after App Launched',
    subTitleDefault: 'Show Alias for Subtitle by default',
    enableReversedMode: 'Enable Reversed Mode (Experimental)',
    enableCustomTitlebar: 'Enable custom title bar (Need restart)',
    lyricsBackground: {
      text: 'Show Lyrics Background',
      off: 'Off',
      on: 'On',
      dynamic: 'Dynamic (High GPU usage)',
    },
    closeAppOption: {
      text: 'Close App...',
      ask: 'Ask',
      exit: 'Exit',
      minimizeToTray: 'Minimize to tray',
    },
    unm: {
      enable: 'Enable',
      audioSource: {
        title: 'Audio Sources',
      },
      enableFlac: {
        title: 'Enable FLAC Sources',
        desc: 'To take effect, it may be required to clear the cache after enabling this function.',
      },
      searchMode: {
        title: 'Audio Search Mode',
        fast: 'Speed Priority',
        order: 'Order Priority',
      },
      cookie: {
        joox: 'Cookie for Joox use',
        qq: 'Cookie for QQ use',
        desc1: 'Click here for the configuration instruction. ',
        desc2: 'Leave empty to pick up the default value',
      },
      ytdl: 'The youtube-dl Executable File for YtDl',
      proxy: {
        title: 'Proxy Server for UNM',
        desc1:
          'The proxy server to use for requesting services such as YouTube',
        desc2: 'Leave empty to pick up the default value',
      },
    },
  },
  contextMenu: {
    play: 'Play',
    addToQueue: 'Add to queue',
    saveToMyLikedSongs: 'Save to my Liked Songs',
    removeFromMyLikedSongs: 'Remove from my Liked Songs',
    saveToLibrary: 'Save to library',
    removeFromLibrary: 'Remove from library',
    addToPlaylist: 'Add to playlist',
    searchInPlaylist: 'Search in playlist',
    copyUrl: 'Copy URL',
    openInBrowser: 'Open in Browser',
    allPlaylists: 'All Playlists',
    minePlaylists: 'My Playlists',
    likedPlaylists: 'Liked Playlists',
    cardiacMode: 'Cardiac Mode',
  },
  toast: {
    savedToPlaylist: 'Saved to playlist',
    removedFromPlaylist: 'Removed from playlist',
    savedToMyLikedSongs: 'Saved to my Liked Songs',
    removedFromMyLikedSongs: 'Removed from my Liked Songs',
    copied: 'Copied',
    copyFailed: 'Copy failed: ',
    needToLogin: 'Need to log into netease account',
  },
  podcast: {
    episodes: 'Episodes',
    podcastDesc: 'Podcast Description',
    episodeDesc: 'Episode Description',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe',
  },
};
