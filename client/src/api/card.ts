import { API_URL } from "./config";
import { TDeck } from "./deck";

export type TCard = {
	question: string;
	answer: string;
	_id: string;
}

export const createCard = async (deckId: string, question: string, answer: string) => {
	const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ question: question, answer: answer }),
	});
	const data = await response.json();
	return data;
};

export const getCards = async (deckId: string): Promise<TCard[]> => {
	const response = await fetch(`${API_URL}/decks/${deckId}/cards`);
	const data = await response.json();
	return data;
}

export async function deleteCard(
	deckId: string,
	index: number
  ): Promise<TDeck> {
	const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
	  method: "DELETE",
	});
	return response.json();
  }
