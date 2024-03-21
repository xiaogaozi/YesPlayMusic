import axios from 'axios';

export function malojaTrackScrobble(serverUrl, apiKey, data) {
  const url = `${serverUrl}/apis/mlj_1/newscrobble`;
  return axios.post(url, {
    key: apiKey,
    artists: [data.artist],
    title: data.track,
    album: data.album,
    length: data.duration,
    time: data.timestamp,
  });
}
