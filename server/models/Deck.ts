import mongoose from 'mongoose';

const schema = mongoose.Schema;

const DeckSchema = new schema({
	title: String,
	cards: [{
		question: String,
		answer: String,
	}],
});

const DeckModel = mongoose.model('Deck', DeckSchema);

export default DeckModel;