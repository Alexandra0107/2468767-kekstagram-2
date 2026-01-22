import {generateComments} from './util.js';

const FOTO = [id, url, descriptions, likes, comments];
//Проходимся по каждому массиву и генерм случайный индекс
const FOTO_LIST = FOTO.map(subArr => {const randomIndex = Math.floor(Math.random() * subArr.length);
  return subArr[randomIndex];
});
console.log(FOTO_LIST);
/* eslint-disable no-console */
export {FOTO_LIST};
