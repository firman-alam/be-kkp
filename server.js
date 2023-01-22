require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const path = require('path');

const db = require('./models');

db.sequelize
  .sync()
  .then((result) => {
    app.listen(8000, () => {
      console.log('Server started');
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/api/v1/income', require('./routes/income.routes'));
app.use('/api/v1/outcome', require('./routes/outcome.routes'));
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/users', require('./routes/user.routes'));
app.use('/api/v1/category', require('./routes/category.routes'));

app.all('*', (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ messages: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
