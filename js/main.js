import { getThumbs } from './thumbs.js';
import { renderThumbs } from './render.js';
import { openFullScreen,initGallery } from './full-screen-vewer.js';

// Получаем данные
const thumbsList = getThumbs();

// получаем контейнер после отрисвки в render и вызываем функцию
const picturesContainer = renderThumbs(thumbsList);
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
