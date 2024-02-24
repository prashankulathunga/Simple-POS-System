const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const userRoute = require('./route/userRoute');
const customerRoute = require('./route/customerRoute');
const orderRoute = require('./route/orderRoute');
const productRoute = require('./route/productRoute');
const cors = require("cors");

const port = process.env.SERVICE_PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors())

try {
    mongoose.connect('mongodb://127.0.0.1:27017/posapi');
    app.listen(port, () => {
        console.log(`server started & running on port ${port}`);
    });
} catch (e) {
    console.log(e);
}

app.get('/test-api', (req, resp) => {
    return resp.json({message: 'server started!'});
});

app.use('/api/v1/users', userRoute);
app.use('/api/v1/customers', customerRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/products', productRoute);