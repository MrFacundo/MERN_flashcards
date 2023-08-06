import React, { useEffect, useState } from "react";
import { TDeck, getDeck } from "./api/deck";
import { TCard, createCard, deleteCard } from "./api/card";
import { useParams } from "react-router-dom";
import "./Deck.css";

export default function Deck() {
	const [deck, setDeck] = useState<TDeck | undefined>();
	const [cards, setCards] = useState<TCard[]>([]);
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const { deckId } = useParams();

	async function handleCreateDeck(e: React.FormEvent) {
		e.preventDefault();
		console.log("deckId: " + deckId);
		const { cards: serverCards } = await createCard(
			deckId!,
			question,
			answer
		);
		setCards(serverCards);
		setQuestion("");
		setAnswer("");
	}

	async function handleDeleteCard(index: number) {
		if (!deckId) return;
		const newDeck = await deleteCard(deckId, index);
		setCards(newDeck.cards);
	}

	useEffect(() => {
		async function fetchDeck() {
			if (!deckId) return;
			const newDeck = await getDeck(deckId);
			setDeck(newDeck);
			console.log(newDeck);
			setCards(newDeck.cards);
		}
		fetchDeck();
	}, [deckId]);

	return (
		<div className="Deck">
			<h1>{deck?.title}</h1>
			<form onSubmit={handleCreateDeck}>
				<button disabled={!question || !answer}>Create Card</button>
				<div className="container">
					<input
						placeholder="Question"
						id="card-question"
						value={question}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setQuestion(e.target.value);
						}}
					/>
					<input
						placeholder="Answer"
						id="card-answer"
						value={answer}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setAnswer(e.target.value);
						}}
					/>
				</div>
			</form>
			<ul className="cards">
				{cards.map((card, index) => (
					<li key={index}>
						<button onClick={() => handleDeleteCard(index)}>
							X
						</button>
						<span>question: {card.question}</span>-{" "}
						<span>answer: {card.answer}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
