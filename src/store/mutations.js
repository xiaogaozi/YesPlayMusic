import cloneDeep from 'lodash/cloneDeep';

import shortcuts from '@/utils/shortcuts';

export default {
  updateLikedXXX(state, { name, data }) {
    state.liked[name] = data;
    if (name === 'songs') {
      state.player.sendSelfToIpcMain();
    }
  },
  changeLang(state, lang) {
    state.settings.lang = lang;
  },
  changeMusicQuality(state, value) {
    state.settings.musicQuality = value;
  },
  changeLyricFontSize(state, value) {
    state.settings.lyricFontSize = value;
  },
  changeOutputDevice(state, deviceId) {
    state.settings.outputDevice = deviceId;
  },
  updateSettings(state, { key, value }) {
    state.settings[key] = value;
  },
  updateData(state, { key, value }) {
    state.data[key] = value;
  },
  togglePlaylistCategory(state, name) {
    const index = state.settings.enabledPlaylistCategories.findIndex(
      c => c === name
    );
    if (index !== -1) {
      state.settings.enabledPlaylistCategories =
        state.settings.enabledPlaylistCategories.filter(c => c !== name);
    } else {
      state.settings.enabledPlaylistCategories.push(name);
    }
  },
  updateToast(state, toast) {
    state.toast = toast;
  },
  updateModal(state, { modalName, key, value }) {
    state.modals[modalName][key] = value;
    if (key === 'show') {
      // 100ms的延迟是为等待右键菜单blur之后再disableScrolling
      value === true
        ? setTimeout(() => (state.enableScrolling = false), 100)
        : (state.enableScrolling = true);
    }
  },
  toggleLyrics(state) {
    state.showLyrics = !state.showLyrics;
  },
  updateDailyTracks(state, dailyTracks) {
    state.dailyTracks = dailyTracks;
  },
  updateLastfm(state, session) {
    state.lastfm = session;
  },
  updateShortcut(state, { id, type, shortcut }) {
    let newShortcut = state.settings.shortcuts.find(s => s.id === id);
    newShortcut[type] = shortcut;
    state.settings.shortcuts = state.settings.shortcuts.map(s => {
      if (s.id !== id) return s;
      return newShortcut;
    });
  },
  restoreDefaultShortcuts(state) {
    state.settings.shortcuts = cloneDeep(shortcuts);
  },
  enableScrolling(state, status = null) {
    state.enableScrolling = status ? status : !state.enableScrolling;
  },
  updateTitle(state, title) {
    state.title = title;
  },
  updateRecentPlayDjPrograms(
    state,
    { program, prevProgramOrTrackId, prevProgramProgress }
  ) {
    // Save progress of previous played program
    let prevProgram = null;
    if (state.recentPlayDjProgramsCache.has(prevProgramOrTrackId)) {
      prevProgram = state.recentPlayDjProgramsCache.get(prevProgramOrTrackId);
    } else {
      const programs = new Array(...state.recentPlayDjProgramsCache.values());
      prevProgram = programs.find(p => {
        return p.mainSong.id === prevProgramOrTrackId;
      });
    }
    if (prevProgram) {
      console.debug(
        `Save progress of previous DJ program ${prevProgram.id} (${prevProgram.name}) to ${prevProgramProgress}`
      );
      prevProgram.progress = prevProgramProgress;
    } else {
      console.warn(
        `The previous played DJ program ${prevProgramOrTrackId} not found`
      );
    }

    // Delete program from cache if it exists, then add it again.
    if (state.recentPlayDjProgramsCache.has(program.id)) {
      program.progress = state.recentPlayDjProgramsCache.get(
        program.id
      ).progress;
      state.recentPlayDjProgramsCache.delete(program.id);
    }
    state.recentPlayDjProgramsCache.set(program.id, program);

    // TODO(gcj): Limit the maximum length of recentPlayDjProgramsCache
    state.data.recentPlayDjPrograms = new Array(
      ...state.recentPlayDjProgramsCache.entries()
    );
    console.debug(
      `Add DJ program ${program.id} (${program.name}, ${program.progress}) to state.data.recentPlayDjPrograms, total ${state.data.recentPlayDjPrograms.length} items.`
    );
  },
};
