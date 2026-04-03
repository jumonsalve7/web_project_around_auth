import { useState } from "react";
import NewCard from "../Form/NewCard/NewCard";
import edit from "../../assets/images/edit.png";
import pencil from "../../assets/images/pencil.png";
import add from "../../assets/images/add.png";
import Popup from "./components/Popup/Popup";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import EditProfile from "../Form/EditProfile/EditProfile";
import EditAvatar from "../Form/EditAvatar/EditAvatar";
import Card from "../Card/Card";

export default function Main(props) {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const {
    cards,
    currentUser,
    handleCardDelete,
    handleCardLike,
  } = props;

  const editAvatar = { title: "New Photo", children: <EditAvatar /> };
  const newProfilePopup = { title: "Name", children: <EditProfile /> };
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__edit-photo">
          <img
            src={currentUser.avatar}
            alt="profile"
            className="profile__avatar"
          />
          <img
            src={pencil}
            className="profile__edit-pencil"
            onClick={() => handleOpenPopup(editAvatar)}
          />
        </div>

        <div className="profile__container">
          <h2 className="profile__name">{currentUser.name}</h2>
          <h3 className="profile__profession">{currentUser.about}</h3>
        </div>

        <button className="profile__edit-button">
          <img
            src={edit}
            className="profile__edit-image"
            onClick={() => handleOpenPopup(newProfilePopup)}
          />
        </button>

        <button className="profile__add-button">
          <img
            src={add}
            className="profile__add-image"
            onClick={() => handleOpenPopup(newCardPopup)}
          />
        </button>

        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </section>

      <section className="cards">
        <div className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              handleCardDelete={handleCardDelete}
              handleCardLike={handleCardLike}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      </section>

      {selectedCard && (
        <ImagePopup
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </main>
  );
}