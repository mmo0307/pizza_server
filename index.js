require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const userRouter = require('./routes/user.router');
const addressRouter = require('./routes/address.router');
const rolesController = require('./routes/roles.router');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/order', addressRouter);
app.use('/roles', rolesController);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server started ${PORT}`));
    } catch(e){
        console.log('e=>', e);
    }
}

start();