export function validateItem(name: string, quantityText: string): string | null {
  const trimmedName = name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 30) {
    return "Nazwa produktu musi mieć od 2 do 30 znaków.";
  }

  if (quantityText.trim() === "") {
    return "Ilość nie może być pusta.";
  }

  const quantity = Number(quantityText);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return "Ilość musi być liczbą całkowitą od 1 do 99.";
  }

  return null;
}
