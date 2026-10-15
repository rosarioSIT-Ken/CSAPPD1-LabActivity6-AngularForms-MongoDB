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

// Delete a pokemon by id
app.delete('/api/pokemon/:id', async (req, res) => {
  await Pokemon.findByIdAndDelete(req.params.id);
  res.status(204).send(); // 204 means successful deletion
  console.log("Deleted pokemon:", req.params.id);
});

// Update a pokemon by id
app.put('/api/pokemon/:id', async (req, res) => {
  const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedPokemon);
  console.log("Updated pokemon:", updatedPokemon);
});