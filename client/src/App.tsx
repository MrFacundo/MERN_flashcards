import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { createDeck, getDecks, deleteDeck, TDeck } from "./api/deck";

function App() {
	const [deckTitle, setDeckTitle] = useState<string>("");
	const [decks, setDecks] = useState<TDeck[]>([]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newDeck = await createDeck(deckTitle);
		setDecks([...decks, newDeck]);
		setDeckTitle("");
	};

	const handleDeleteDeck = async (id: string) => {
		await deleteDeck(id);
		const newDecks = decks.filter((deck) => deck._id !== id);
		setDecks(newDecks);
	};

	useEffect(() => {
		const fetchDecks = async () => {
			const data = await getDecks();
			setDecks(data);
		};
		fetchDecks();
	}, []);

	return (
		<div className="container">
			<div className="App">
				<h1>Your Decks</h1>
				<form onSubmit={handleSubmit}>
					<button
					disabled={!deckTitle}
					>Createa new Deck</button>
					<input
            type="text"
            placeholder="Deck Title"
						id="deck-title"
						value={deckTitle}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setDeckTitle(e.target.value);
						}}
					/>
				</form>
				<ul className="decks">
					{decks.map((deck) => (
						<li key={deck._id}>
							<button onClick={() => handleDeleteDeck(deck._id)}>
								X
							</button>
							<Link to={`decks/${deck._id}`}>{deck.title}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
