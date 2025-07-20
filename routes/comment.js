const express = require ('express');
const router = express.Router();
const Comment = require('../models/Comments');

//Add comment

router.post('/',async(requestAnimationFrame, res)=>{
    const comment =new Comment(requestAnimationFrame.body);
    await comment.save();
    res.json(comment);
});

//get comment for post

router.get('/:postId', async (req,res)=>{
    const comments =await Comment.find({
        post:req.params.postId}).populate('user','username');
        res.json(comments);
});

//update

router.put('/:postId',async (req,res)=>{
    await Comment.findByIdAndUpdate(req.params.postId,{new:true});
    res.json(Comment);
});

//delete

router.delete('/:postId',async (req,res)=>{
    await Comment.findByIdAndDelete(req.params.postId);
    res.json({msg:'Deleted'});
});

module.exports = router;
