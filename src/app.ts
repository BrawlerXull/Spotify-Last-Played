import express from "express";
import cors from "cors";
import spotifyRoutes from "./routes/spotifyRoutes";
import publicRoutes from "./routes/publicRoutes";

const app = express();

app.use(cors());

app.use("/", spotifyRoutes);

app.use("/", publicRoutes);

export default app;

