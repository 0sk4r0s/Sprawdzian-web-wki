export default class ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  isBought: boolean;

  constructor(id: number, name: string, quantity: number, isBought: boolean = false) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.isBought = isBought;
  }

  toggle(): void {
    this.isBought = !this.isBought;
  }

  render(): HTMLElement {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    if (this.isBought) {
      itemDiv.classList.add("bought");
    }
    itemDiv.dataset.id = String(this.id);

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("item-name");
    nameSpan.textContent = this.name;

    const quantitySpan = document.createElement("span");
    quantitySpan.classList.add("item-quantity");
    quantitySpan.textContent = String(this.quantity);

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-btn");
    toggleBtn.textContent = this.isBought ? "Cofnij" : "Kupione";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Usuń";

    itemDiv.appendChild(nameSpan);
    itemDiv.appendChild(quantitySpan);
    itemDiv.appendChild(toggleBtn);
    itemDiv.appendChild(deleteBtn);

    return itemDiv;
  }
}
