import axios from 'axios';

export function malojaTrackScrobble(
  serverUrl,
  apiKey,
  authUsername,
  authPassword,
  data
) {
  const url = `${serverUrl}/apis/mlj_1/newscrobble`;

  const reqData = {
    key: apiKey,
    time: data.timestamp,
    artists: [data.artist],
    title: data.track,
    album: data.album,
    length: data.length,
    duration: data.duration,
  };

  const config = {};
  if (authUsername && authPassword) {
    config.auth = {
      username: authUsername,
      password: authPassword,
    };
  }

  return axios.post(url, reqData, config);
}
