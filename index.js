const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

// console.log(authRoutes);
dotenv.config();
const app = express();

//DB connection
try {
  mongoose.connect(process.env.MONGO_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log(err.message);
}

mongoose.connection
  .once('open', () => {
    console.log('database connected');
  })
  .on('disconnected', () => {
    console.log('database disconnected');
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('App in up and running.');
});

// app.post('/', (req, res) => {
//   console.log(req.body);
// });

app.use(authRoutes);
app.use(orderRoutes);

app.listen(process.env.PORT);
