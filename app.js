const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
