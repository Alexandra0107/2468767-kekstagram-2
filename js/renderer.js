import {thumbsList} from './main';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

// Проходим по данным и создаём элементы
for (let i = 0; i < thumbsList.length; i++) {
  const data = thumbsList[i];

  // Клонируем шаблон
  const element = template.cloneNode(true);

  // Находим нужные элементы внутри клона
  const img = element.querySelector('.picture__img');
  const likes = element.querySelector('.picture__likes');
  const comments = element.querySelector('.picture__comments');

  // Заполняем данными
  img.src = data.url;
  img.alt = data.descriptions;
  likes.textContent = data.likes;
  comments.textContent = data.comments.map((comment) => comment.message).join(',');

  // Добавляем элемент во fragment
  fragment.appendChild(element);
}
picturesContainer.appendChild(fragment);

