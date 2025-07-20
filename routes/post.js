const express = require ('express');
const router = express.Router();
const Post = require('../models/Post');

//create post
router.post('/', async (req, res) => {
    const{title, content, author } req.body;
    const post = new Post({title, content, author});
    await post.save();
    res.json(post);
});

//get all

router.get('/', async(req, res)=> {
    const posts = await Post.find().populate('author','username');
    res.json(posts);
});

//get one

router.get('/:id',async (req , res)=>{
    const post = await Post.findById(req.params.id).populate('author','username');
    res.json(post);
});

//update 

router.put('/:id',async (req,res)=>{
    await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(Post);
});

//delete

router.delete('/:id',async(req,res)=>{
    await Post.findByIdAndDelete(req.params.id);
    res.json({msg:'Deleted'});
});

module.exports = router;