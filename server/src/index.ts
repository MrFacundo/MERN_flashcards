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

app.get("/decks", async (req, res) => {
	const decks = await Deck.find();
	res.json(decks);
});

app.post("/decks", async (req, res) => {
	const newDeck = new Deck({
		title: req.body.title,
	});
	const createDeck = await newDeck.save();
	res.json(createDeck);
});

mongoose.connect(uri)
	.then(() => {
	console.log(`Server running on port ${PORT}`);
	app.listen(PORT);
})