import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
const app = express();
app.use(express.json());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect("mongodb+srv://admin:MaHXUAeyF01299yE@cluster0.8wxv1ho.mongodb.net/Blog?retryWrites=true&w=majority").then(()=>app.listen(5000)).then(()=>console.log("connected to DB")).catch((err)=>console.log(err));
// then is used here bacauuse mongoose.connect will give a promise so to solve that we use then here  
