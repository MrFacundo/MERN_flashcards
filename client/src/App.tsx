import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [deckTitle, setDeckTitle] = useState<string>('');
  const [decks, setDecks] = useState<any[]>([]);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: deckTitle })
    });
    setDeckTitle('');
  }

  useEffect(() => {
    const getDecks = async () => {
      const response = await fetch('http://localhost:5000/decks');
      const data = await response.json();
      setDecks(data);
      console.log(data);
    }
    getDecks();
  }, []) 

  return (
    <>
    <ul className="decks">
      {decks.map((deck:any) => (
        <li key={deck._id}>
          <h2>{deck.title}</h2>
        </li>
      ))}
    </ul>
     <form action=""
       onSubmit={handleSubmit}
     >
      <label htmlFor="deck-title">Deck Title</label>
      <input type="text"
        value={deckTitle}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
          setDeckTitle(e.target.value)}
      />
      <button>Create Deck</button>
     </form>
    </>
  )
}

export default App
