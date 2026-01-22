/* eslint-disable no-console */
// вычисляем случайный ID
const id = Array.from({ length: 25 },(_, i) => i + 1);
// вычисляем случайный url
// eslint-disable-next-line no-template-curly-in-string
const url = Array.from({ length: 25 }, (_, i) => ({ url: 'photos/${ i + 1 }.jpg' }));
// Случайное описание
const descriptions = [];
for (let i = 1; i <= 25; i++) {
  // eslint-disable-next-line no-template-curly-in-string
  descriptions.push({ description: 'Описание фотографии №${i}' });
}
const likes = [];
for (let i = 0; i < 25; i++) {
  likes.push({ likes: Math.floor(Math.random() * (200 - 15 + 1)) + 15 });
}
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив случайных имён
const names = [
  'Алексей',
  'Мария',
  'Дмитрий',
  'Елена',
  'Сергей',
  'Анна',
  'Иван',
  'Ольга',
  'Николай',
  'Татьяна'
];

// Функция: случайное целое число в диапазоне [min, max]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция: случайное сообщение (1 или 2 предложения)
function getRandomMessage() {
  const count = getRandomInt(1, 2);
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(messages[getRandomInt(0, messages.length - 1)]);
  }
  return result.join(' ');
}

// Функция: случайное имя
function getRandomName() {
  return names[getRandomInt(0, names.length - 1)];
}

// Функция: генерация массива комментариев
function generateComments() {
  const commentsCount = getRandomInt(0, 30); // 0–30 комментариев
  const comments = [];
  const usedIds = new Set();

  for (let i = 0; i < commentsCount; i++) {
    let id;
    // Уникальный id
    do {
      id = getRandomInt(1, 100000);
    } while (usedIds.has(id));
    usedIds.add(id);

    // Формируем объект комментария: name в конце
    comments.push({
      id: id,
      // eslint-disable-next-line no-template-curly-in-string
      avatar: 'img/avatar-${getRandomInt(1, 6)}.svg',
      message: getRandomMessage(),
      name: getRandomName()
    });
  }

  return comments;
}

// Пример вызова
comments = generateComments();
//console.log(comments);
export {generateComments};

