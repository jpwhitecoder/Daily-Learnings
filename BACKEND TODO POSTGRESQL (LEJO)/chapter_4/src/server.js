import express from "express";
import "dotenv/config";
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

console.log("Hello world");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
console.log(__filename);

app.use(express.static(path.join(__dirname, "../public")));

// console.log(path.join(__dirname,'../public'))

app.use('/auth',authRoutes);
app.use('/todos',authMiddleware,todoRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public"), "index.html");
});

app.listen(PORT, () => {
  console.log(`server has started on port: ${PORT}`);
});
