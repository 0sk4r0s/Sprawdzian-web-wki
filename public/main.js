import ShoppingList from "./ShoppingList.js";
import { validateItem } from "./validation.js";
const shoppingList = new ShoppingList();
const nameInput = document.querySelector("#nameInput");
const quantityInput = document.querySelector("#quantityInput");
const addButton = document.querySelector("#addButton");
const errorMessage = document.querySelector("#errorMessage");
const filterSelect = document.querySelector("#filterSelect");
const counter = document.querySelector("#counter");
const listContainer = document.querySelector("#listContainer");
const clearBoughtButton = document.querySelector("#clearBoughtButton");
function buildList() {
    if (!listContainer || !counter)
        return;
    const currentFilter = filterSelect?.value || "all";
    const filteredItems = shoppingList.getFiltered(currentFilter);
    listContainer.innerHTML = "";
    filteredItems.forEach((item) => {
        const itemElement = item.render();
        listContainer.appendChild(itemElement);
    });
    counter.textContent = `Do kupienia: ${shoppingList.countRemaining()}`;
}
addButton?.addEventListener("click", () => {
    if (!nameInput || !quantityInput || !errorMessage)
        return;
    const name = nameInput.value;
    const quantityText = quantityInput.value;
    const error = validateItem(name, quantityText);
    if (error !== null) {
        errorMessage.textContent = error;
        return;
    }
    shoppingList.add(name, Number(quantityText));
    nameInput.value = "";
    quantityInput.value = "";
    errorMessage.textContent = "";
    buildList();
});
filterSelect?.addEventListener("change", () => {
    buildList();
});
listContainer?.addEventListener("click", (event) => {
    const target = event.target;
    const itemElement = target.closest(".item");
    if (!itemElement || !itemElement.dataset.id)
        return;
    const id = Number(itemElement.dataset.id);
    if (target.classList.contains("toggle-btn")) {
        shoppingList.toggle(id);
        buildList();
    }
    else if (target.classList.contains("delete-btn")) {
        shoppingList.remove(id);
        buildList();
    }
});
clearBoughtButton?.addEventListener("click", () => {
    shoppingList.clearBought();
    buildList();
});
buildList();
