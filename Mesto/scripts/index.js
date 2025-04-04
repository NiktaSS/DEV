const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const popupList = [profilePopup, cardPopup, imagePopup];
popupList.forEach(popup => {
    popup.classList.add('popup_is-animated');
})

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close');

const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');

const profileFormElement = profilePopup.querySelector('.popup__form');
const cardFormElemnt = cardPopup.querySelector('.popup__form');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupImageCloseButton = imagePopup.querySelector('.popup__close');

function openProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

profileEditButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', () => closeModal(profilePopup));
cardAddButton.addEventListener('click', () => openModal(cardPopup));
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
popupImageCloseButton.addEventListener('click', () => closeModal(imagePopup));


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

    const cardEl = createCard(cardData);
    cardList.prepend(cardEl);
    closeModal(cardPopup);
    cardFormElemnt.reset();
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
cardFormElemnt.addEventListener('submit', handleCardFormSubmit);

