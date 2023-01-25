import React from 'react';
import imgEditButton from '../images/pen.svg';
import imgAddButton from '../images/plus.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const userInfo = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-wrap">
          <img className="profile__avatar" alt="Фото Аватара" src={userInfo.avatar}/>
          <div 
            onClick={props.onEditAvatar} 
            aria-label="Редактировать аватар"
            className="profile__avatar-button" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userInfo.name}</h1>
          <button 
            onClick={props.onEditProfile}
            aria-label="Редактировать" 
            type="button" 
            className="profile__edit-button">
            <img src={imgEditButton} alt="Иконка ручки" />
          </button> 
          <p className="profile__subtitle">{userInfo.about}</p> 
        </div>
        <button 
          onClick={props.onAddPlace}
          aria-label="Добавить фото" 
          title="+" type="button" 
          className="profile__add-button">
          <img src={imgAddButton} alt="Иконка плюса" />
        </button>
      </section>
      <section className="elements">
        {
          props.cards.map((item) => (
            <Card 
              key={item._id}
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))
        }
      </section>
    </main>
  )
}

export default Main;