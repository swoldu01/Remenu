const db = require('./db');
(require('dotenv').config());
const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// const logger = require('morgan');
const PORT = process.env.PORT || 5000;

const adminRoutes = require('./routes/adminRoutes');
// const dishRoutes = require('./routes/dishRoutes');
const authRoutes = require('./routes/authRoutes');
const ownerRoutes  = require('./routes/ownerRoutes');

const app = express();

// app.use(logger('dev'));
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// app.use('/dishes', dishRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/owner', ownerRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// const reviewRoutes = require('./routes/reviewRoutes');


// app.use('/api', reviewRoutes);


  