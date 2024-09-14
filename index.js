import express from "express";
import connectMongo from "./db.js";
import userRoute from "./routes/UserRoute.js";
import dataRoute from "./routes/DataRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongooseUrl = `${process.env.MONGO_URI}`;
const app = express()
const PORT = process.env.PORT;

connectMongo(mongooseUrl);
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api', userRoute)
app.use('/api', dataRoute)
app.use('/api', orderRoute)

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "mernapp", "build")));
    res.sendFile(path.resolve(__dirname, "mernapp", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})