const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.router');
const addressRouter = require('./routes/address.router');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/order', addressRouter);

app.listen(PORT, () => console.log(`server started`));