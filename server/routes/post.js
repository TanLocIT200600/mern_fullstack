const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');

const Post = require("../models/post");

//@route GET api/posts
//desc GET post
//access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user',['username'])
    res.json({ success: true, posts });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

//@route POST api/posts
//desc create post
//access Private
router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //Simple validation
  if (!title)
    return res.status(400).json({
      success: false, message: "Title is required"
    })

  try {
    const newPost = new Post({
      title,
      description,
      url: (url.startsWith('https://')) ? url : `https://${url}`,
      status: status || 'TO LEARN',
      user: req.userId,
    })

    await newPost.save();
    res.json({ success: true, message: "Happy Learning !!!", post: newPost })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

//@route PUT api/posts
//desc update post
//access Private
router.put('/:id',(req,res) =>{
  const {title,description,url,status} = req.body;

  //Simple validation
  if (!title)
    return res.status(400).json({
      success: false, message: "Title is required"
    })

  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith('https://') ? url : `https://${url}`) || "",
      status: status || 'TO LEARN',
    }

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

module.exports = router