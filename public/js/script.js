let modalButton = document.querySelector(`.btn-modal`);
let modalPayed = document.querySelector(`.modal-payed`);
let modalWrapper = document.querySelector(`.modal-wrapper`);

modalButton.addEventListener(`click`, () => {
    modalPayed.style.display = `none`;
    modalWrapper.style.display = `none`;
});