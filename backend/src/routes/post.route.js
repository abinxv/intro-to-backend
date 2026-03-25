import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";
import { Router } from "express"


const router = Router();
router.route("/create").post(createPost)
router.route("/getPosts").get(getPosts)
router.route("/update/:id").patch(updatePost)
router.route("/delete/:id").delete(deletePost)

export default router
