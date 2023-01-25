class Api {
  constructor(url, token) {
    this._address = url;
    this._token = token;
  }

  //получить ответ от сервера
  _getResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //метод получения карточки от сервера
  getCards() {
    return fetch(`${this._address}cards`, {
      headers: {
        authorization: this._token
      }
    }).then((res) => {
        return this._getResponse(res);
      });
  }

  //метод добавления новой карточки
  addNewCard(data) {
    return fetch(`${this._address}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => {
        return this._getResponse(res);
    });
  }

  //запрос информации о пользователе с сервера
  getUserInfoFromServer() {
    return fetch(`${this._address}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      return this._getResponse(res);
    });
  }

  //запрос изменения данных профиля
  setUserInfoFromServer(info) {
    return fetch(`${this._address}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: info.name, 
        about: info.about
      })
    })
    .then((res) => {
      return this._getResponse(res);
    });
  }

  //запрос изменения фотографии аватара
  setUserAvatar(data) {
    return fetch(`${this._address}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }) 
    .then((res) => {
      return this._getResponse(res);
    });
  }

  //запрос на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._address}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      return this._getResponse(res);
    });
  }

  //выбор запроса на добавление/удаление лайка исходя из состояния лайка
  setLikeStatus(cardId, checkElementLike) {                     
    return fetch(`${this._address}cards/likes/${cardId}`, {     
      method: checkElementLike ? 'DELETE' : 'PUT',              
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      return this._getResponse(res);
    });
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20/', '4a3cde67-2515-4699-b4fa-4d09b066c717');
export default api;
