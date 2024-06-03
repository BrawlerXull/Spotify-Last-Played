import dotenv from 'dotenv';

dotenv.config();

const spotifyConfig = {
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  redirectUri: process.env.REDIRECT_URI as string,
  refreshToken: process.env.REFRESH_TOKEN as string,
  defaultPort: process.env.DEFAULT_PORT as string,
};

export default spotifyConfig;
