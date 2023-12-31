import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Deck from "./Deck.tsx";
import Header from "./Header";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/MERN_flashcards/",
		element: <App />,
	},
	{
		path: "/MERN_flashcards/decks/:deckId",
		element: <Deck />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<div className="page">
			<Header />
			<RouterProvider router={router} />
		</div>
	</React.StrictMode>
);
