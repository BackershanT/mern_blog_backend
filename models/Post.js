// const mongoose =require ('mongoose');
// const PostSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     author: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
// },{timestamps:true});
// module.exports =mongoose.model('Post',PostSchema);

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
