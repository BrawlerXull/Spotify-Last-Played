"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const spotifyConfig_1 = __importDefault(require("../config/spotifyConfig"));
const getAccessToken = (callback) => {
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization: "Basic " + Buffer.from(`${spotifyConfig_1.default.clientId}:${spotifyConfig_1.default.clientSecret}`).toString("base64"),
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: spotifyConfig_1.default.refreshToken,
        },
        json: true,
    };
    request_1.default.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(null, body.access_token);
        }
        else {
            callback(error || new Error("Failed to refresh token"));
        }
    });
};
const getRecentlyPlayedTracks = (accessToken, callback) => {
    const spotifyApi = new spotify_web_api_node_1.default({
        clientId: spotifyConfig_1.default.clientId,
        clientSecret: spotifyConfig_1.default.clientSecret,
        redirectUri: spotifyConfig_1.default.redirectUri,
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
exports.default = {
    getAccessToken,
    getRecentlyPlayedTracks,
};
