import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup (props) {
  const [cardTitle, setCardTitle] = React.useState('');
  const [cardLink, setCardLink] = React.useState(''); 

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: cardTitle,
      link: cardLink
    })
  }

  React.useEffect(() => {
    if(props.isOpen === false) {
      setCardTitle('');
      setCardLink('');
    }
  }, [props.isOpen])

  return (
    <PopupWithForm 
      name='add' 
      title='Новое место'
      submitButton='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="name-photo" name="namePhoto" className="popup__input popup__input_type_photo-name" 
      type="text" placeholder="Название" onChange={(evt) => setCardTitle(evt.target.value)} value={cardTitle} required minLength={2} maxLength={30} />
      <span id="name-photo-error" className="popup__error" />
      <input id="link-photo" name="linkPhoto" className="popup__input popup__input_type_link-photo" 
      type="url" placeholder="Ссылка на картинку" onChange={(evt) => setCardLink(evt.target.value)} value={cardLink} required />
      <span id="link-photo-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;