import ShoppingItem from "./ShoppingItem.js";
export default class ShoppingList {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }
    add(name, quantity) {
        const trimmedName = name.trim();
        const existingItem = this.items.find((item) => item.name.toLowerCase() === trimmedName.toLowerCase());
        if (existingItem) {
            existingItem.quantity += quantity;
            return existingItem;
        }
        const newItem = new ShoppingItem(this.nextId++, trimmedName, quantity);
        this.items.push(newItem);
        return newItem;
    }
    remove(id) {
        this.items = this.items.filter((item) => item.id !== id);
    }
    getById(id) {
        return this.items.find((item) => item.id === id);
    }
    toggle(id) {
        const item = this.getById(id);
        if (item) {
            item.toggle();
        }
    }
    countRemaining() {
        return this.items.filter((item) => !item.isBought).length;
    }
    getFiltered(filter) {
        if (filter === "toBuy") {
            return this.items.filter((item) => !item.isBought);
        }
        if (filter === "bought") {
            return this.items.filter((item) => item.isBought);
        }
        return [...this.items];
    }
    clearBought() {
        this.items = this.items.filter((item) => !item.isBought);
    }
}
