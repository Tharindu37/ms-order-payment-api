const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const OrderRoute = require('./routes/OrderRoute');
const {Eureka} = require('eureka-js-client')

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const EUREKA_SERVER = 'localhost'

const client = new Eureka({
    instance: {
        app: 'ORDER-PAYMENT-API',
        instanceId: 'order-payment-api',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: `http://localhost:${PORT}`,
        port: {
            $: PORT,
            '@enabled': true
        },
        vipAddress: 'order-payment-api',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn' // Indicates it's not AWS
        }
    },
    eureka: {
        host: EUREKA_SERVER,
        servicePath: '/eureka/apps/',
        port: 8761
    }
});


// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('order-payment-service/api/v1', OrderRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Order Management API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: 'Something went wrong!', error: err.message });
});

client.start((error)=>{
    if(error){
        console.log('error', error)
    }else{
        console.log('success!')
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
