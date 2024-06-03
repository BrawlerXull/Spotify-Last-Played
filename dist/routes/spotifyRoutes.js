"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotifyService_1 = __importDefault(require("../services/spotifyService"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    spotifyService_1.default.getAccessToken((err, accessToken) => {
        if (err) {
            return res.status(500).send("Error getting access token");
        }
        spotifyService_1.default.getRecentlyPlayedTracks(accessToken, (err, track) => {
            if (err) {
                return res.status(500).send("Error getting recently played track");
            }
            res.send({
                song_name: track.track.name,
                artist_name: track.track.artists[0].name,
                image: track.track.album.images[0],
            });
        });
    });
});
exports.default = router;
