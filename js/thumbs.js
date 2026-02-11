import { getRandomInt, getRandomArrayName } from './util.js';
import { NAMES, MESSAGES } from './data.js';

const ARRAY_LEN = 25;
// Функция: генерация ОДНОГО комментария (объекта)
function generateComment() {
  return ({
    id: Array.from({ length: 1 },() => Math.floor(Math.random() * 1000000) + 1)[0],
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrayName(MESSAGES),
    name: getRandomArrayName(NAMES)
  });
}

// Функция, которая сразу возвращает объект поста
function generatePost(index) {
  return ({
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    likes: getRandomInt(15, 200),
    descriptions: `Описание фотографии №${index + 1}`,
    comments: Array.from({ length: getRandomInt(0, 31) }, () => generateComment())
  });
}

// Функция генерации в массив из 25 объектов
const getThumbs = () => Array.from({ length: ARRAY_LEN }, (_, index) => generatePost(index));

export { getThumbs };
