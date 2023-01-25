import React, { useState } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'; 
import AddPlacePopup from './AddPlacePopup';
import Login from './Login.js';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { register, authorization, validityToken } from '../utils/auth';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  //хук состояния открытия поп-апа профиля
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); 
  //хук состояния открытия поп-апа добавления новой карточки
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  //хук состояния открытия поп-апа аватара
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  //хук состояния открытия поп-апа большого фото
  const [selectedCard, setSelectedCard] = useState(null);
  //хук состояния текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  //хук состояния карточек
  const [cards, setCards] = useState([]);
  //хук авторизации пользователя(вошел в систему или нет)
  const [loggedIn, setLoggedIn] = useState(false);
  //хук состояния открытия поп-апа с оповещением при авторизации
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //хук сообщения об успешной/неудачной авторизации
  const [message, setMessage] = useState(false);
  //хук получения почты пользователя, для отображения в хедере
  const [userEmailOnHeader, setUserEmailOnHeader] = useState('');
  const history = useHistory();

  React.useEffect(() => {
    api
      .getUserInfoFromServer()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    checkToken();
  })

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .setLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(i => i._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(info) {
    api
      .setUserInfoFromServer(info)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function handleUpdateAvatar(info) {
    api
      .setUserAvatar(info)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister(email, password) {
    register(password, email)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        if(res) {
          setMessage(true);
          history.push('/sign-in');
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function onLogin(email, password) {
    authorization(password, email)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmailOnHeader(email);
          history.push('/');
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if(token) {
      validityToken(token)
      .then((res) => {
        if(res) {
          setUserEmailOnHeader(res.data.email)
        };
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function logoutProfile() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          userEmailOnHeader={userEmailOnHeader}
          logoutProfile={logoutProfile}
        />

        <Switch>
          <ProtectedRoute
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
            exact path="/"
            loggedIn={loggedIn}
          />
          <ProtectedRoute 
            component={Footer}
            exact path="/"
            loggedIn={loggedIn}
          />
          <Route path="/sign-in">
            <Login 
              onLogin={onLogin}
            />
          </Route>
          <Route path="/sign-up">
            <Register 
              onRegister={onRegister}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up"/>}
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={message}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm 
          name='delete-card' 
          title='Вы уверены?'
          submitButton='Да'
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} 
        />
        <ImagePopup
          isOpen={selectedCard}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
