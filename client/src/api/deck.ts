import { API_URL } from "./config";

export type TDeck = {
	title: string;
	cards: [];
	_id: string;
}

export const createDeck = async (title: string) => {
	const response = await fetch(`${API_URL}/decks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: title }),
	});
	const data = await response.json();
	return data;
};

export const getDecks = async (): Promise<TDeck[]> => {
	const response = await fetch(`${API_URL}/decks`);
	const data = await response.json();
	return data;
}

export const getDeck = async (id: string): Promise<TDeck> => {
	const response = await fetch(`${API_URL}/decks/${id}`);
	const data = await response.json();
	return data;
}

export const deleteDeck = async (id: string) => {
	const response = await fetch(`${API_URL}/decks/${id}`, {
		method: "DELETE",
	});
	const data = await response.json();
	return data;
}