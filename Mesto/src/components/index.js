import '../pages/index.css';
import { openModal, closeModal, setupPopup } from './modal.js';
import { enableValidation, resetValidation } from './validate.js';
import { createCard } from './cards.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateUserAvatar } from './api.js';

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
const avatarPopup = document.querySelector('.popup_type_avatar');
const cardList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close');

const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');

const profileFormElement = profilePopup.querySelector('.popup__form');
const cardFormElement = cardPopup.querySelector('.popup__form');
const avatarFormElement = avatarPopup.querySelector('.popup__form');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupImageCloseButton = imagePopup.querySelector('.popup__close');

const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar_url');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

const popupList = [profilePopup, cardPopup, imagePopup, avatarPopup]; 
popupList.forEach(popup => setupPopup(popup));

let currentUserId = '';

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cards.forEach(cardData => {
      const cardEl = createCard(cardData, handleImageClick, currentUserId);
      cardList.append(cardEl);
    });
  })
  .catch(err => {
    console.log('Ошибка при загрузке данных:', err);
  })

function openProfilePopup() {
    nameInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent;
    resetValidation(profileFormElement, validationSettings);
    openModal(profilePopup);
}

function openCardPopup() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  resetValidation(cardFormElement, validationSettings);
  openModal(cardPopup);
}

function openAvatarPopup() {
  resetValidation(avatarFormElement, validationSettings);
  avatarInput.value = '';
  openModal(avatarPopup);
}

function handleSaving(evt, func) {
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  func(evt)
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    })
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    return updateUserInfo(nameInput.value, jobInput.value)
      .then(userData => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(profilePopup);
      })
      .catch(err => {
        console.error('Ошибка при обновлении профиля:', err)
      })
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };

    return addNewCard(cardData)
      .then(cardData => {
        const cardEl = createCard(cardData, handleImageClick, currentUserId);
        cardList.prepend(cardEl);
        closeModal(cardPopup);
        cardFormElement.reset();
      })
      .catch(err => {
        console.log('Ошибка при создании карточки:', err)
      })    
}

function handleImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  return updateUserAvatar(avatarInput.value)
    .then(userData => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(avatarPopup);
      avatarFormElement.reset();
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err)
    });
}


profileEditButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', () => closeModal(profilePopup));
cardAddButton.addEventListener('click', openCardPopup);
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
popupImageCloseButton.addEventListener('click', () => closeModal(imagePopup));
avatarEditButton.addEventListener('click', openAvatarPopup);

profileFormElement.addEventListener('submit', (evt) => handleSaving(evt, handleProfileFormSubmit)); 
cardFormElement.addEventListener('submit', (evt) => handleSaving(evt, handleCardFormSubmit));
avatarFormElement.addEventListener('submit', (evt) => handleSaving(evt, handleAvatarFormSubmit));

enableValidation(validationSettings);
