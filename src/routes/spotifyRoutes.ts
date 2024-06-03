import express, { Request, Response } from "express";
import spotifyService from "../services/spotifyService";

const router = express.Router();

router.get("/data", (req: Request, res: Response) => {
  spotifyService.getAccessToken((err, accessToken) => {
    if (err) {
      return res.status(500).send("Error getting access token");
    }

    spotifyService.getRecentlyPlayedTracks(accessToken as string, (err, track) => {
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

export default router;
