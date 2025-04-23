function createCard(cardData, handleImageClick) {
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

  imageEl.addEventListener('click', () => handleImageClick(cardData));

  return cardEl;
}

export { createCard };
