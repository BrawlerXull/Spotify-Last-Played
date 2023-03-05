var SpotifyWebApi = require('spotify-web-api-node');
const express = require("express")
const app= express();

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '178fbc553c01482e81b6b8ea9f541dfa',
  clientSecret: '74fee64a34a843a3b79999ff819b36ef',
  redirectUri: 'http://www.example.com/callback',
});
spotifyApi.setAccessToken('BQDnzZTkq84ICjJ9WV4N849gTd1WAwK2zo3JX-v7m72DieC728LuKFe9qKP8elElA6RSqon-KzA2apIdmpuJRwxgameIogVE8IMnP1-F6ZCA_teYYEgEkemq3Jn1dCqxihW43m4MHDRSu74M5u6ivZlY3gRpV_wvAqF82zyo8GPMKFpRXQUlzND-vpdQm42K8ymI8BDxvw');

app.get("/",(req,res)=>{
    spotifyApi.getMyRecentlyPlayedTracks({
        limit : 1
      }).then(function(data) {
          // Output items
          console.log("Your most recently played tracks are:");
          data.body.items.forEach(item => console.log(item.track.album.name));
          res.send({name:data.body.items[0].track.name});
        }, function(err) {
          console.log('Something went wrong!', err);
        });
    
})



app.listen(5005)