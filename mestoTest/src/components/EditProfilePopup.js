import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const userInfo = React.useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  //эффект обновления переменных состояния при изменении контекста
  React.useEffect(() => {
    setName(userInfo.name || '');
    setDescription(userInfo.about || '');
  }, [userInfo]);

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }


  return (
    <PopupWithForm 
      name='edit'
      title='Редактировать профиль'
      submitButton='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="user-name" name="userName" className="popup__input popup__input_type_name" type="text" 
        value={name} onChange={handleChangeName} placeholder="Имя" required minLength={2} maxLength={40} />
      <span id="user-name-error" className="popup__error" />
      <input id="user-job" name="userJob" className="popup__input popup__input_type_job" type="text" 
        value={description} onChange={handleChangeDescription} placeholder="О себе" required minLength={2} maxLength={200} />
      <span id="user-job-error" className="popup__error" />
    </PopupWithForm>

  )
}

export default EditProfilePopup;