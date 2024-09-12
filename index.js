import express from "express";
import connectMongo from "./db.js";
import userRoute from "./routes/UserRoute.js";
import dataRoute from "./routes/DataRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const mongooseUrl = process.env.MONGO_URI;
const app = express()
const PORT = process.env.PORT || 5000;

connectMongo(mongooseUrl);
app.get('/', (req, res) => {
    res.send("Hello world!")
})
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api', userRoute)
app.use('/api', dataRoute)
app.use('/api', orderRoute)

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})