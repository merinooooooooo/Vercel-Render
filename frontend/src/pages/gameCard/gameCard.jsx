import React, { useState } from "react";

// Baraja de cartas
const deck = [
  { suit: "♠", value: "A", points: 11 },
  { suit: "♠", value: "2", points: 2 },
  { suit: "♠", value: "3", points: 3 },
  { suit: "♠", value: "4", points: 4 },
  { suit: "♠", value: "5", points: 5 },
  { suit: "♠", value: "6", points: 6 },
  { suit: "♠", value: "7", points: 7 },
  { suit: "♠", value: "8", points: 8 },
  { suit: "♠", value: "9", points: 9 },
  { suit: "♠", value: "10", points: 10 },
  { suit: "♠", value: "J", points: 10 },
  { suit: "♠", value: "Q", points: 10 },
  { suit: "♠", value: "K", points: 10 },
  // Repite para ♣, ♥, ♦ (puedes agregar más si deseas una baraja completa)
];

const drawRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck[randomIndex];
};

const CardGame = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const drawCard = () => {
    if (gameOver) return;

    const newCard = drawRandomCard();
    const newScore = playerScore + newCard.points;

    setPlayerCards((prev) => [...prev, newCard]);
    setPlayerScore(newScore);

    if (newScore > 21) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setPlayerCards([]);
    setPlayerScore(0);
    setGameOver(false);
  };

  return (
    <div className="container my-5 text-center">
      <h1>Juego de Cartas</h1>

      <div className="my-4">
        <h2>Puntuación: {playerScore}</h2>
        <h3>{gameOver ? "¡Perdiste! Tu puntuación excedió 21." : "¡Sigue jugando!"}</h3>
      </div>

      <div className="my-4">
        {playerCards.map((card, index) => (
          <span key={index} className="badge bg-secondary mx-1">
            {card.value} {card.suit}
          </span>
        ))}
      </div>

      <div className="my-4">
        <button
          className="btn btn-primary me-2"
          onClick={drawCard}
          disabled={gameOver}
        >
          Robar Carta
        </button>
        <button className="btn btn-danger" onClick={resetGame}>
          Reiniciar Juego
        </button>
      </div>
    </div>
  );
};

export default CardGame;
