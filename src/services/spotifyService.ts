import request from "request";
import SpotifyWebApi from "spotify-web-api-node";
import spotifyConfig from "../config/spotifyConfig";

const getAccessToken = (callback: (err: Error | null, token?: string) => void): void => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + Buffer.from(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: spotifyConfig.refreshToken,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(null, body.access_token);
    } else {
      callback(error || new Error("Failed to refresh token"));
    }
  });
};

const getRecentlyPlayedTracks = (accessToken: string, callback: (err: Error | null, track?: any) => void): void => {
  const spotifyApi = new SpotifyWebApi({
    clientId: spotifyConfig.clientId,
    clientSecret: spotifyConfig.clientSecret,
    redirectUri: spotifyConfig.redirectUri,
    accessToken: accessToken,
  });

  spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
    .then(data => {
      callback(null, data.body.items[0]);
    })
    .catch(err => {
      callback(err);
    });
};

export default {
  getAccessToken,
  getRecentlyPlayedTracks,
};
