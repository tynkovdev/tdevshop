let rowTable = document.querySelectorAll(`#row-table`);
let totalPrice = document.querySelector(`.total-price`);
let formOrder = document.querySelector(`#formOrder`);

let counterTotalPrice = 0;

let titles = [];
for (let i = 0; i < rowTable.length; i++) {
    let row = rowTable[i];
    let title = row.querySelector(`#titleCard`).innerHTML;

    if (title) {
        titles.push(title);
    }

    let price = Number(row.querySelector(`#tableTotalPrice`).innerHTML);
    counterTotalPrice += price;

}

totalPrice.innerHTML = `Итого: ${counterTotalPrice} руб.`;

let counterOrder = 0;
for (let i = 0; i < titles.length; i++) {
    let title = titles[i];
    counterOrder++;
    formOrder.innerHTML += `<input type="hidden" name="title${counterOrder}" value="${title}">`;
}

formOrder.innerHTML += `
    <input type="hidden" name="totalPrice" value="${counterTotalPrice}">
    <input type="hidden" name="status" value="Ожидает подтверждения">
    <input type="hidden" name="status_waiting" value="true">
    <button type="submit" class="btn btn-success mt-2">Оформить заказ</button>`;