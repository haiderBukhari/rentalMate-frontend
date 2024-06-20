const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rental_mate_db', { useNewUrlParser: true, useUnifiedTopology: true });

const Item = mongoose.model('Item', { name: String });

app.use(bodyParser.json());

// Define routes
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.json(newItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
