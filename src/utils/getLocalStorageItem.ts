export function getLocalStorageItem(key: string) {
  const data = localStorage.getItem(key);
  if (!data) return;

  return JSON.parse(data);
}
