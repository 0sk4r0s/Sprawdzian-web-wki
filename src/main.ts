import ShoppingList, { ItemFilter } from "./ShoppingList.js";
import { validateItem } from "./validation.js";

const shoppingList = new ShoppingList();

const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
const quantityInput = document.querySelector<HTMLInputElement>("#quantityInput");
const addButton = document.querySelector<HTMLButtonElement>("#addButton");
const errorMessage = document.querySelector<HTMLElement>("#errorMessage");
const filterSelect = document.querySelector<HTMLSelectElement>("#filterSelect");
const counter = document.querySelector<HTMLElement>("#counter");
const listContainer = document.querySelector<HTMLElement>("#listContainer");
const clearBoughtButton = document.querySelector<HTMLButtonElement>("#clearBoughtButton");

function buildList(): void {
  if (!listContainer || !counter) return;

  const currentFilter = (filterSelect?.value as ItemFilter) || "all";
  const filteredItems = shoppingList.getFiltered(currentFilter);

  listContainer.innerHTML = "";

  filteredItems.forEach((item) => {
    const itemElement = item.render();
    listContainer.appendChild(itemElement);
  });

  counter.textContent = `Do kupienia: ${shoppingList.countRemaining()}`;
}

addButton?.addEventListener("click", () => {
  if (!nameInput || !quantityInput || !errorMessage) return;

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

listContainer?.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const itemElement = target.closest<HTMLElement>(".item");
  if (!itemElement || !itemElement.dataset.id) return;

  const id = Number(itemElement.dataset.id);

  if (target.classList.contains("toggle-btn")) {
    shoppingList.toggle(id);
    buildList();
  } else if (target.classList.contains("delete-btn")) {
    shoppingList.remove(id);
    buildList();
  }
});

clearBoughtButton?.addEventListener("click", () => {
  shoppingList.clearBought();
  buildList();
});

buildList();
