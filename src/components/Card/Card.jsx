import { useState } from "react";

const Card = ({ card, currentUser, onCardLike, onCardDelete }) => {
  const { name, link, _id, likes } = card;

  // Si no hay currentUser todavía, el isLiked es false por defecto
  const isLiked = currentUser?._id
    ? (likes || []).some((user) => user._id === currentUser._id)
    : false;

  // 2. Estados locales
  const [openImage, setOpenImage] = useState(false);

  // 3. Lógica del Like (Basada en los datos que vienen de la API)
  // Verificamos si el usuario actual ya le dio like a esta tarjeta
  // Versión protegida

  return (
    <div className="cards__content">
      <img
        src={link}
        alt={name}
        className="cards__content-image"
        onClick={() => setOpenImage(true)}
      />

      <button
        type="button"
        className="cards__content-trash"
        onClick={() => onCardDelete(card)}
      ></button>

      <div className="cards__content-block">
        <h2 className="cards__content-description">{name}</h2>
        
        <button
          type="button"
          className={`cards__content-like ${isLiked ? "cards__content-like_active" : ""}`}
          onClick={() => onCardLike(card)} // <-- ¡Esta es la clave!
        ></button>
      </div>

      {openImage && (
        <div className="popup__overlay" onClick={() => setOpenImage(false)}>
          <img
            src={link}
            alt={name}
            className="popup__image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
