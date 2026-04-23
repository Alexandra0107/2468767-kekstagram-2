import { getThumbs } from './thumbs.js';
import { renderThumbs } from './renderer.js';
import { openFullScreen } from './fullScreenViewer.js';

// Получаем данные
const thumbsList = getThumbs();

// Находим шаблон и контейнер
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');
const picturesContainer = document.querySelector('.pictures');

// Вызываем функцию для отрисовки
renderThumbs(thumbsList, template, picturesContainer);
// Добавляем обработчики клика на миниатюры
picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
        return;
    }

    const index = Number(thumbnail.dataset.id);
    const photoData = thumbsList[index];

    if (photoData) {
        openFullScreen(photoData);
    }
});
