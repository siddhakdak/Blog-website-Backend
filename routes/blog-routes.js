import express from "express";
import { deleteById, getAllBlogs, getById, getByUserId, newBlog, updateBlog } from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", newBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteById);
blogRouter.get("/user/:id", getByUserId);

export default blogRouter;
