import express from "express";
import path from "path";
import cors from "cors";
import { authController } from "./authRouter";
import { volunteersController } from "./volunteerRouter";
import { donorController } from "./donorRouter";

const app = express();
app.use(express.json());
const publicPath = path.resolve(__dirname, "dist");
app.use(express.static(publicPath));
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (_req, res) => {
  //   res.sendFile(path.join(publicPath, "index.html"));
  res.send("<h1>Paths to Resilience!!!<h1>");
});
app.use(authController);
app.use(volunteersController);
app.use(donorController);

app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://localhost:${PORT}
  `);
});
