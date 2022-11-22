import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import {useState, useEffect} from "react";
import api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    api.getUserInfo()
      .then(setCurrentUser)
      .catch(console.error);
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Введите ваше имя"
          minLength="2"
          maxLength="40"
          required
          className="popup__input popup__input_type_name"
        />
        <span id="name-error" className="popup__input-error"></span>

        <input
          name="aboutName"
          id="aboutName"
          type="text"
          placeholder="Расскажите о себе"
          minLength="2"
          maxLength="200"
          required
          className="popup__input popup__input_type_job"
        />
        <span id="aboutName-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar-popup"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          name="avatarLink"
          id="avatarLink"
          type="url"
          placeholder="Ссылка на аватарку"
          required
          className="popup__input"
        />
        <span id="avatarLink-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="create-card"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          name="imageName"
          id="imageName"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          className="popup__input popup__input_type_name"
        />
        <span id="imageName-error" className="popup__input-error"></span>

        <input
          name="imageLink"
          id="imageLink"
          type="url"
          placeholder="Ссылка на картинку"
          required
          className="popup__input popup__input_type_job"
        />
        <span id="imageLink-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm name="delete-popup" title="Вы уверены?" buttonText="Да" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
