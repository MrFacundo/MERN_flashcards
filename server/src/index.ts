import express	from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import Deck from '../models/Deck';

config();
const PORT = 5000;

const app = express();
const uri = process.env.MONGO_URL || "";

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
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