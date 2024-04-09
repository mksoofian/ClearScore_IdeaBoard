import { useState } from "react";
import Tile from "./tile";

function MyComponent() {
  const [cards, setCard] = useState([{ id: 1, content: "Card" }]);

  const handleCreateCard = () => {
    const newCard = {
      id: cards.length ? Math.max(...cards.map((card) => card.id)) + 1 : 1,
      content: "New Card", // Or get content from a form, for example
    };
    setCard([...cards, newCard]);
  };

  // Read (Select)
  const getCardById = (cardId) => {
    const card = cards.find((card) => card.id === cardId);
    return card ? card : null; // Return item or null if not found
  };

  // Update
  const updateCard = (updatedCard) => {
    const index = cards.findIndex((card) => card.id === updatedCard.id);
    if (index > -1) {
      cards[index] = updatedCard;
      console.log("Updated card:", updatedCard);
    } else {
      console.error("Card not found for update:", updatedCard.id);
    }
  };

  // Delete
  const deleteCard = (cardId) => {
    const index = cards.findIndex((card) => card.id === cardId);
    if (index > -1) {
      cards.splice(index, 1);
      console.log("Deleted card:", cardId);
    } else {
      console.error("Item not found for delete:", cardId);
    }
  };

  return (
    <div>
      <button onClick={handleCreateCard}>Create New Card</button>
      {cards.map((card) => (
        <div key={card.id}>{Tile()}</div>
      ))}
    </div>
  );
}

export default MyComponent;
