function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
}

function closeByEsc(popup) {
    return function(evt) {
        if (evt.key === 'Escape') {
            closeModal(popup);
        }
    };
}


function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc(popup));
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc(popup));
}
function setupPopup(popup) {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('mousedown', handleOverlayClick);
}

export { openModal, closeModal, setupPopup };
