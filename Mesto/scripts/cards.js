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

function createCard(cardData) {
  const template = document.getElementById('card-template');
  const cardEl = template.content.cloneNode(true);

  const imageEl = cardEl.querySelector('.card__image');
  const titleEl = cardEl.querySelector('.card__title');
  const likeButton = cardEl.querySelector('.card__like-button');
  const deleteButton = cardEl.querySelector('.card__delete-button');
  
  imageEl.src = cardData.link;
  imageEl.alt = cardData.name;
  titleEl.textContent = cardData.name;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', () => {
    imageEl.closest('.places__item').remove();
  });

  imageEl.addEventListener('click', () => {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name

    openModal(imagePopup);
  });

  return cardEl;
}

const cardList = document.querySelector('.places__list');

initialCards.forEach(card => {
  const cardEl = createCard(card);
  cardList.append(cardEl);
});