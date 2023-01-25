import React from 'react';

function PopupWithForm(props) {
//  let popupVisibleClass;

//   props.isOpen ? popupVisibleClass='popup_opened' : popupVisibleClass='';

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={props.onClose} />
        <form name={props.name} className="popup__form popup__form_profile" onSubmit={props.onSubmit}>
          <h3 className="popup__form-title">{props.title}</h3>
          {props.children}
          <button type="submit" className="popup__form-save">{props.submitButton}</button>
        </form>  
      </div>
    </div>
  )
}


export default PopupWithForm;




