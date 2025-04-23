import '../pages/index.css';
import { openModal, closeModal, setupPopup } from './modal.js';
import { enableValidation, resetValidation } from './validate.js';
import { createCard } from './cards.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const cardList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close');

const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');

const profileFormElement = profilePopup.querySelector('.popup__form');
const cardFormElement = cardPopup.querySelector('.popup__form');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupImageCloseButton = imagePopup.querySelector('.popup__close');

const popupList = [profilePopup, cardPopup, imagePopup]; 
popupList.forEach(popup => setupPopup(popup));

function openProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    resetValidation(profileFormElement, validationSettings);
    openModal(profilePopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    
    const cardData = {
        name: cardNameInput.value,
        link:cardLinkInput.value
    };

    const cardEl = createCard(cardData, handleImageClick);
    cardList.prepend(cardEl);
    closeModal(cardPopup);
    cardFormElement.reset();
}

function handleImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
}


profileEditButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', () => closeModal(profilePopup));
cardAddButton.addEventListener('click', () => openModal(cardPopup));
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
popupImageCloseButton.addEventListener('click', () => closeModal(imagePopup));

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
cardFormElement.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(cardData => {
    const cardEl = createCard(cardData, handleImageClick);
    cardList.append(cardEl);
});

enableValidation(validationSettings);
