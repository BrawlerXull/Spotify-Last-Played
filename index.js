var SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const cors = require('cors');
const app = express();
const request = require("request");

app.use(cors());

let client_Id = "178fbc553c01482e81b6b8ea9f541dfa";
let client_Secret = "74fee64a34a843a3b79999ff819b36ef";
let redirect_Uri = "http://www.example.com/callback";
var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_Id + ":" + client_Secret).toString("base64"),
  },
  form: {
    grant_type: "refresh_token",
    refresh_token:
      "AQD8I9tPCfSllq3Ps2-QUxnauRxcnvLpPQMJvHFJLblwl3BK7IkQ2BHBFcS3xGKQ0loMP96gcdc3MdfTxCJ68d0Ui3OYmRZr5d7kBRcRQ13jMBSJ5YPsxZwM9kAhKyzCsHQ",
  },
  json: true,
};

app.get("/", (req, res) => {
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      var spotifyApi = new SpotifyWebApi({
        clientId: "178fbc553c01482e81b6b8ea9f541dfa",
        clientSecret: "74fee64a34a843a3b79999ff819b36ef",
        redirectUri: "http://www.example.com/callback",
        accessToken: access_token,
      });
      spotifyApi
        .getMyRecentlyPlayedTracks({
          limit: 1,
        })
        .then(
          function (data) {
            // Output items
            console.log("Your most recently played tracks are:");
            data.body.items.forEach((item) =>
              console.log(item.track.album.name)
            );
            res.send({
              song_name: data.body.items[0].track.name,
              artist_name: data.body.items[0].track.artists[0].name,
              image: data.body.items[0].track.album.images[0],
            });
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
  });
});
const port = 3000;
app.listen(port, () => {
  console.log("Connected to port 3000 successfully");
});
