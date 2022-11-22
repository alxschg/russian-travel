function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__group-like">
          <button
            type="button"
            className="element__like"
            aria-label="Лайк"
          ></button>
          <span className="element__like-quantity"></span>
        </div>
      </div>
      <button
        type="button"
        className="element__delete"
        aria-label="Удалить"
      ></button>
    </li>
  );
}

export default Card;
