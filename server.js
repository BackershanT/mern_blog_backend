const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors({
    origin: 'https://localhost:3000',
    credentials: true
}));
app.use(express.json());

//routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

//db + server start

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(5000,()=>console.log('server running on port 5000')).catch(err =>console.error(err));
});