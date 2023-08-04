import express	from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import Deck from '../models/Deck';

config();
const PORT = 5000;

const app = express();
const uri = process.env.MONGO_URL || "";

app.use(express.json());
app.use(cors());

// get all decks
app.get("/decks", async (req, res) => {
	const decks = await Deck.find();
	res.json(decks);
});

// get a deck
app.get("/decks/:deckId", async (req, res) => {
	const deckId = await req.params.deckId;
	const deck = await Deck.findById(deckId);
	res.json(deck);
});

// create a new deck
app.post("/decks", async (req, res) => {
	const newDeck = new Deck({
		title: req.body.title,
	});
	const createDeck = await newDeck.save();
	res.json(createDeck);
});

// delete a deck	
app.delete("/decks/:deckId", async (req, res) => {
	const deckId = await req.params.deckId;
	const deck = await Deck.findByIdAndDelete(deckId);
	res.json(deck);
});

// get all cards
app.get("/decks/:deckId/cards", async (req, res) => {
	const deckId = await req.params.deckId;
	const deck = await Deck.findById(deckId);
	res.json(deck?.cards);
});

// create a new card
app.post("/decks/:deckId/cards", async (req, res) => {
	const deckId = await req.params.deckId;
	const newCard = {
		question: req.body.question,
		answer: req.body.answer,
	};
	const deck = await Deck.findById(deckId);
	deck?.cards.push(newCard);
	const updatedDeck = await deck?.save();
	res.json(updatedDeck);
});

// delete a card
app.delete("/decks/:deckId/cards/:index", async (req, res) => {
	const deckId = await req.params.deckId;
	const index = await req.params.index;
	const deck = await Deck.findById(deckId);
	deck?.cards.splice(parseInt(index), 1);
	const updatedDeck = await deck?.save();
	res.json(updatedDeck);
});

mongoose.connect(uri)
	.then(() => {
	console.log(`Server running on port ${PORT}`);
	app.listen(PORT);
})