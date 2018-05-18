export default function DataStorage() {}

DataStorage.commit = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

DataStorage.get = function(key) {
  return JSON.parse(localStorage.getItem(key));
}
