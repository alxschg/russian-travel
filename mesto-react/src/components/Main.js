import {useEffect, useState} from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userAvatar, setUserAvatar] = useState("#");
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserAvatar(res.avatar);
        setUserName(res.name);
        setUserDescription(res.about);
      })
      .catch((err) => console.error(err));

    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <img className="profile__avatar" src={userAvatar} alt="Аватарка" />
          <button
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          ></button>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__description">{userDescription}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="editAdd"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card, id) => (
            <Card card={card} key={id} onCardClick={props.onCardClick} />
          ))}
          ;
        </ul>
      </section>
    </main>
  );
}

export default Main;
