import express from "express";
import cors from "cors";
import spotifyRoutes from "./routes/spotifyRoutes";

const app = express();
app.use(cors());

app.use("/", spotifyRoutes);

export default app;
