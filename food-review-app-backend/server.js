//Express Server Setup
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


const reviewRoutes = require('../routes/reviewRoutes');


app.use('/api', reviewRoutes);


  