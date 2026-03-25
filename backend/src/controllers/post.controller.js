import { Post } from "../models/post.module.js"

// create a post
const createPost = async (req,res) =>{
    try{
        const { name, description, age} = req.body

        if(!name || !description || !age){
            return res.status(400).json({
                message: "all fields are required"
            })
        }

        const post = await Post.create({ name, description, age})
        res.status(201).json({
            message: "post created succesfully",
            post
        })

    } catch(error){
        res.status(500).json({
            message: "internal server error: ", error
        })
    }
}

// get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "posts fetched successfully",
            count: posts.length,
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
}

// update post by id
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, age } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { name, description, age },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: "post not found"
            });
        }

        res.status(200).json({
            message: "post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
}

// delete post by id
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                message: "post not found"
            });
        }

        res.status(200).json({
            message: "post deleted successfully",
            post: deletedPost
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
}

export{
    createPost,
    getPosts,
    updatePost,
    deletePost
}
