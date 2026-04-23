import { getThumbs } from './thumbs.js';
import { renderThumbs } from './renderer.js'; // Импортируем нашу функцию

// Получаем данные
const thumbsList = getThumbs();

// Находим шаблон и контейнер
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');
const picturesContainer = document.querySelector('.pictures');

// Вызываем функцию для отрисовки
renderThumbs(thumbsList, template, picturesContainer);
