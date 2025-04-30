import { deleteCard, likeCard, unlikeCard } from './api.js';

function createCard(cardData, handleImageClick, currentUserId) {
  const template = document.getElementById('card-template');
  const cardEl = template.content.cloneNode(true);

  const imageEl = cardEl.querySelector('.card__image');
  const titleEl = cardEl.querySelector('.card__title');
  const likeButton = cardEl.querySelector('.card__like-button');
  const likeCountEl = cardEl.querySelector('.card__like-count');
  
  imageEl.src = cardData.link;
  imageEl.alt = cardData.name;
  titleEl.textContent = cardData.name;
  likeCountEl.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some(like => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    const likeAction = likeButton.classList.contains('card__like-button_is-active');
    const promise = likeAction ? unlikeCard(cardData._id) : likeCard(cardData._id);
    promise
      .then(updatedCard => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeCountEl.textContent = updatedCard.likes.length;
      })
      .catch(err => {
        console.error('Ошибка при изменении лайка:', err);
      });
  });
  
  if (cardData.owner._id === currentUserId) {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'card__delete-button';
    imageEl.insertAdjacentElement('afterend', deleteButton);
    deleteButton.addEventListener('click', () => {
      deleteCard(cardData._id)
        .then(() => {
          imageEl.closest('.places__item').remove();
        })
        .catch(err => {
          console.error('Ошибка при удалении карточки:', err);
        });
    });
  }

  imageEl.addEventListener('click', () => handleImageClick(cardData));

  return cardEl;
}

export { createCard };