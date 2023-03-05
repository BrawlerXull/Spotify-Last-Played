var SpotifyWebApi = require('spotify-web-api-node');
const express = require("express")
const app= express();

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '178fbc553c01482e81b6b8ea9f541dfa',
  clientSecret: '74fee64a34a843a3b79999ff819b36ef',
  redirectUri: 'http://www.example.com/callback',
});
spotifyApi.setAccessToken('BQBjtZO8SwF7tN6ZaY5Qnfcq1KHL2iOpK2zo1j0XT4Yxc9cxeCftPy3Kv9gWKr_Zkcw49q3xfAJGvWf6-mjoWBwVNDxXznsNRPQULVTDLq5YVKyFzlVhVq2jvI4UmUgxoHN7cZ3sRikkJVHLIY3kiDrO2yYxYq8xk6cPtoLYaqrDWmoD5avgOqj8LPm9qHmgsUnfK0aBng');

app.get("/",(req,res)=>{
    spotifyApi.getMyRecentlyPlayedTracks({
        limit : 20
      }).then(function(data) {
          // Output items
          console.log("Your 20 most recently played tracks are:");
          data.body.items.forEach(item => console.log(item.track));
          res.send(data.body.items);
        }, function(err) {
          console.log('Something went wrong!', err);
        });
    
})



app.listen(5005)