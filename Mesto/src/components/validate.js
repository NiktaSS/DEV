function toggleSaveButton(formElement, inputList, settings) {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    buttonElement.disabled = !inputList.every(input => input.validity.valid);
}

function checkInputValidity(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    if (!inputElement.validity.valid) {
        errorElement.textContent = inputElement.validationMessage;
    } else {
        errorElement.textContent = '';
    }
}

function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleSaveButton(formElement, inputList, settings);
        });
    });
}

function resetValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    
    inputList.forEach(inputElement => {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        errorElement.textContent = '';
    });
    
    buttonElement.disabled = true;
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
}

export { enableValidation, resetValidation };

