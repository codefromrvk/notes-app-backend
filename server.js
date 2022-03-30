//server.js
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import note from "./routes/noteRoute.js";
import { urlencoded } from "express";

dotenv.config();

const app = express();

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const DB_CONNECTION =
  process.env.DATABASE_URL ||
  "mongodb+srv://abc:abc@cluster0.rajx8.mongodb.net/todo?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

app.use("/", note);

app.get("/", (req, res) => {
  res.send("Home route");
});

// app.post('/create', (req, res) => {

// })

mongoose
  .connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running @ : http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.error(error));
