const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();

app.get('/', (req, res) => {
  //   res.send('Hello world');
  res.json({ name: 'Musa' });
});

//Middleware for helping to use req.body
// app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false })); //Accept JSON DATA

//DEFINE ALL THE ROUTER
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('The server started');
});
