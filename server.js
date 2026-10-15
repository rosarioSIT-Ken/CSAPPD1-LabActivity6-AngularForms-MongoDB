console.log('URI found:', process.env.MONGODB_URI ? 'YES' : 'NO');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connectec to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

const Pokemon = mongoose.model('pokemon', new mongoose.Schema({
    name: String,
    type: String,
    level: Number,
    nature: String
}));

app.get('/api/pokemon', async (req, res) => {
    const pokemons = await Pokemon.find();
    res.send(pokemons);
});

app.post('/api/pokemon', async (req, res) => {
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.send(pokemon);
    console.log("Added new pokemon", pokemon);
});