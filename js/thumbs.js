import { getRandomInt, getRandomArrayName } from './util.js';
import { NAMES, MESSAGES } from './data.js';

const ARRAY_LEN = 25;
// Функция: генерация ОДНОГО комментария (объекта)
const generateComment = () => {
  let commentId;
  const usedIds = new Set(); // Локальный Set для каждого вызова (если нужно избежать дубликатов в рамках одного generateComments)

  do {
    commentId = getRandomInt(1, 100000);
  } while (usedIds.has(commentId));
  usedIds.add(commentId);

  // Генерация уникального сообщения (1–2 разных предложения)
  const messageLength = getRandomInt(1, 2);
  const usedMessageIndices = new Set();
  const messages = Array.from(
    { length: messageLength },
    () => {
      let idx;
      do {
        idx = getRandomInt(0, MESSAGES.length - 1);
      } while (usedMessageIndices.has(idx));
      usedMessageIndices.add(idx);
      return MESSAGES[idx];
    }
  );

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messages.join(' '),
    name: getRandomArrayName(NAMES)
  };
};

// Функция: генерация массива комментариев (с заданным количеством)
const generateComments = (count) => Array.from({ length: count }, () => generateComment());

// Функция, которая сразу возвращает объект поста
function generatePost(index) {
  return ({
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    likes: getRandomInt(15, 200),
    descriptions: `Описание фотографии №${index + 1}`,
    comments: generateComments(getRandomInt(0, 31))
  });
}

// Функция генерации в массив из 25 объектов
const getThumbs = () => Array.from({ length: ARRAY_LEN }, (_, index) => generatePost(index));

export { getThumbs };
