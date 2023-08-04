import mongoose from 'mongoose';

const schema = mongoose.Schema;

const CardSchema = new schema({
	question: String,
	answer: String,
});

const CardModel = mongoose.model('Card', CardSchema);

export default CardModel;