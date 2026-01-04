import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/databaseConnection.js";
import contactRoute from "./routes/contactRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
const PORT = process.env.PORT || 5000;

app.use("/api", contactRoute);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running at part http://localhost:${PORT}`);
});
