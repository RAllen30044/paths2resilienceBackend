import express from "express";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json());
const publicPath = path.resolve(__dirname, "dist");
app.use(express.static(publicPath));
const PORT = process.env.PORT || 3000;
app.use(cors()); 
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://localhost:${PORT}
  `);
});
