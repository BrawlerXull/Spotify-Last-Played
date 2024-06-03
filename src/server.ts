import app from "./app";
import spotifyConfig from "./config/spotifyConfig";

const port = spotifyConfig.defaultPort;

app.listen(port, () => {
  console.log(`Connected to port ${port} successfully`);
});
