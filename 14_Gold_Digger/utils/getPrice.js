const min = 3000;
const max = 4500;

export function getRandomPrice() {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
}