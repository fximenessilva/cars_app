function sortArrayByIdAscending(
  array: {
    id: number;
    name: string;
    brand?: string;
    email?: string;
    favorite_cars?: number[];
  }[]
): typeof array {
  if (array.length) {
    return array.sort((a, b) => a.id - b.id);
  }
  return array;
}

export { sortArrayByIdAscending };
