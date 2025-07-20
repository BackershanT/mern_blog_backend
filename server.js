// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const postRoutes = require('./routes/post'); // ✅ Ensure correct path and export

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/posts', postRoutes); // ✅ Router must be a function

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON
app.use('/uploads', express.static(Path2D.join(__dirname, 'uploads')));


// API Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); // ✅ User register/login route

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  
  // Start Server Only After DB Connects
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
