const getter = (namespace: string) => {
  const item = localStorage.getItem(namespace);
  if (item === null) {
    return null;
  }
  return JSON.parse(item);
};

const setter = (namespace: string, value: any) => {
  return localStorage.setItem(namespace, JSON.stringify(value));
};

const remover = (namespace: string) => {
  return localStorage.removeItem(namespace);
};

export { getter, setter, remover };
