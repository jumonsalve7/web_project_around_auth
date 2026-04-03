import { useState } from "react";
import Card from "../Card/Card";
import '../../../blocks/cards.css'

const initialCards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

const Cards = () => {
  const [cards, setCards] = useState(initialCards);

  const eliminarCard = (id) => {
    setCards(prev => prev.filter(card => card._id !== id));
  };

  return (
    <section className="cards">
      <div className="cards__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            id={card._id}         
            name={card.name}
            link={card.link}
            onEliminar={eliminarCard} 
          />
        ))}
      </div>
    </section>
  );
};

export default Cards;
