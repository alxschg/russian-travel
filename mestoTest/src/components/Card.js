import React from 'react';
import imgDelete from '../images/delete.svg'; 
import imgLike from '../images/heart.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const userInfo = React.useContext(CurrentUserContext);

  //вызываем обработчик handleCardClick из компонента Card
  function handleClick() {
    onCardClick(card);
  }

  //обработчик клика лайка проброшенный из app
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === userInfo._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete ${!isOwn ? 'element__delete_disabled' : ''}`
  );
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === userInfo._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`element__desc-like ${!isLiked ? '' : 'element__desc-like_type_off'}`);

  return (
    <article className="element">
      <div className="element__photo-wrap">
        <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick} />
        <button className={cardDeleteButtonClassName} type="button"><img src={imgDelete} alt="Иконка урны" onClick={handleDeleteClick} /></button>
      </div>  
      <div className="element__desc">
        <h2 className="element__desc-title">{card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} type="button"><img src={imgLike} alt="Иконка сердца" onClick={handleLikeClick} /></button>
          <p className="element__like_counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;