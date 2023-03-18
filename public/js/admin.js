let cancelButton = document.querySelector(`#cancelButton`);
let modalPayed = document.querySelector(`.modal-payed`);
let modalWrapper = document.querySelector(`.modal-wrapper`);
let buttonAdd = document.querySelector(`.btn-add`);

cancelButton.addEventListener(`click`, () => {
    modalPayed.classList.add(`d-none`);
    modalWrapper.classList.add(`d-none`);
});

buttonAdd.addEventListener(`click`, () => {
    modalPayed.classList.remove(`d-none`);
    modalWrapper.classList.remove(`d-none`);
})