require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const gamesRoutes = require('./routes/gamesRouter');

// app.get('/testing', (req, res) => {
//   res.json({ msg: 'here' });
// });
app.use('/api', gamesRoutes);

app.get('*', (req, res) => {
  res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server is running on port ', port);
});
