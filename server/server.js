require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');

const itemsRoutes = require('./routes/item.routes');
const orderRoutes = require('./routes/order.routes');

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('The database has been connected...');
  })
  .catch((error) => console.log(error.message));

app.use('/', itemsRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
