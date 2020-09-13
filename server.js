const express = require('express');

const app = express();

app.get('/', (req, res) => {
  //   res.send('Hello world');
  res.json({ name: 'Musa' });
});

//DEFINE ALL THE ROUTER
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('The server started');
});
