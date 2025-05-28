import React, { useState } from "react";
import "./gameCard.css"; // Asegúrate de tener un archivo CSS para los estilos
const deck = [
  { suit: "♠", value: "A", points: 11 },
  { suit: "♠", value: "2", points: 2 },
  { suit: "♥", value: "3", points: 3 },
  { suit: "♦", value: "4", points: 4 },
  { suit: "♣", value: "5", points: 5 },
  { suit: "♠", value: "6", points: 6 },
  { suit: "♦", value: "7", points: 7 },
  { suit: "♥", value: "8", points: 8 },
  { suit: "♣", value: "9", points: 9 },
  { suit: "♠", value: "10", points: 10 },
  { suit: "♥", value: "J", points: 10 },
  { suit: "♦", value: "Q", points: 10 },
  { suit: "♣", value: "K", points: 10 },
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
    <div className="container">
      <h1>Juego de Cartas</h1>
      <div>
        <h2>Puntuación: {playerScore}</h2>
        <h3>{gameOver ? "¡Perdiste! Tu puntuación excedió 21." : "¡Sigue jugando!"}</h3>
      </div>

      <div className="card-deck">
        {playerCards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.suit === "♥" || card.suit === "♦" ? "red" : ""}`}
          >
            <div className="suit">{card.suit}</div>
            <div>{card.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="btn btn-primary me-3" onClick={drawCard} disabled={gameOver}>
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
