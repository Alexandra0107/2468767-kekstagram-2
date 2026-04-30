import { isEscapeKey } from './util.js';
import { getBigPicture, getBody } from './dom.js';

const COMMENTS_PER_PAGE = 5;
let currentCommentsShown = 0;

//функции для работы с элементами
const getElement = (selector) => {
  const bigPicture = getBigPicture();
  return bigPicture?.querySelector(selector) || null;
};

const setTextContent = (selector, value) => {
  const el = getElement(selector);
  if (el) {
    el.textContent = value;
  }
};

const setAttribute = (selector, attr, value) => {
  const el = getElement(selector);
  if (el) {
    el[attr] = value;
  }
};

// Закрытие модального окна
const closeFullScreen = () => {
  const bigPicture = getBigPicture();
  const body = getBody();

  if (bigPicture) {
    bigPicture.classList.add('hidden');
  }
  if (body) {
    body.classList.remove('modal-open');
  }

  currentCommentsShown = 0;
};

// Настройка обработчиков закрытия
const setupCloseHandlers = () => {
  const bigPicture = getBigPicture();
  const closeButton = bigPicture?.querySelector('.big-picture__cancel');

  if (!closeButton) {
    return;
  }

  // Вешаем обработчик на кнопку закрытия
  closeButton.addEventListener('click', closeFullScreen);

  // Вешаем обработчик клавиши Esc
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeFullScreen();
    }
  });
};

const updateCommentCount = (shown, total) => {
  const bigPicture = getBigPicture();
  const shownEl = bigPicture?.querySelector('.social__comment-shown-count');
  const totalEl = bigPicture?.querySelector('.social__comment-total-count');

  if (!shownEl || !totalEl) {
    return;
  }

  shownEl.textContent = shown;
  totalEl.textContent = total;
};

// Создаём элемент комментария
const createCommentElement = (comment) => {
  const commentEl = document.createElement('li');
  commentEl.className = 'social__comment';

  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = comment.avatar;
  img.alt = comment.name;

  const textEl = document.createElement('p');
  textEl.className = 'social__text';
  textEl.textContent = comment.message;

  commentEl.appendChild(img);
  commentEl.appendChild(textEl);

  return commentEl;
};

// Отрисовываем комментарии порциями
const renderComments = (comments) => {
  const bigPicture = getBigPicture();
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const totalComments = comments.length;

  // Определяем диапазон комментариев для текущей порции
  const endIndex = Math.min(currentCommentsShown + COMMENTS_PER_PAGE, totalComments);
  const commentsToShow = comments.slice(currentCommentsShown, endIndex);

  // Отрисовываем новые комментарии
  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsContainer.appendChild(commentElement);
  });

  // Обновляем счётчик ПОСЛЕ отрисовки
  currentCommentsShown = endIndex;
  updateCommentCount(currentCommentsShown, totalComments);

  // Скрываем кнопку, если все комментарии загружены
  const commentsLoaderEl = bigPicture.querySelector('.comments-loader');
  if (currentCommentsShown >= totalComments && commentsLoaderEl) {
    commentsLoaderEl.classList.add('hidden');
  }
};

// Заполняем данные поста
const fillPostData = (photoData) => {
  const bigPicture = getBigPicture();

  const setTextContent = (selector, value) => {
    const el = bigPicture.querySelector(selector);
    if (el) {
      el.textContent = value;
    }
  };
  const setAttribute = (selector, attr, value) => {
    const el = bigPicture.querySelector(selector);
    if (el) {
      el[attr] = value;
    }
  };

  setAttribute('.big-picture__img img', 'src', photoData.url);
  setTextContent('.likes-count', photoData.likes);
  setTextContent('.social__comment-total-count', photoData.comments.length);
  setTextContent('.social__caption', photoData.descriptions || '');
};

// Показываем элементы интерфейса
const showInterfaceElements = () => {
  const bigPicture = getBigPicture();
  const commentCountEl = bigPicture?.querySelector('.social__comment-count');
  const commentsLoaderEl = bigPicture?.querySelector('.comments-loader');

  if (commentCountEl) {
    commentCountEl.classList.remove('hidden');
  }
  if (commentsLoaderEl) {
    commentsLoaderEl.classList.remove('hidden');
  }
};

// Очищаем комментарии
const clearComments = () => {
  const bigPicture = getBigPicture();
  const commentsContainer = bigPicture?.querySelector('.social__comments');
  if (commentsContainer) {
    commentsContainer.innerHTML = '';
  }
  currentCommentsShown = 0;
};

// Настраиваем обработчик загрузки комментариев — вызывается один раз
const setupLoadMoreHandler = () => {
  const bigPicture = getBigPicture();
  const commentsLoaderEl = bigPicture?.querySelector('.comments-loader');

  if (!commentsLoaderEl) {
    return;
  }

  commentsLoaderEl.addEventListener('click', () => {
    const savedComments = bigPicture?.dataset.currentComments;
    if (savedComments) {
      renderComments(JSON.parse(savedComments));
    }
  });
};

const openFullScreen = (photoData) => {
  const bigPicture = getBigPicture();

  if (!bigPicture) {
    throw new Error('Элемент .big-picture не найден в DOM');
  }

  // Сохраняем комментарии в атрибуте
  bigPicture.dataset.currentComments = JSON.stringify(photoData.comments);

  // Заполняем данные
  fillPostData(photoData);

  // Показываем элементы интерфейса
  showInterfaceElements();

  // Очищаем комментарии и сбрасываем счётчик
  clearComments();

  // Отрисовываем первые комментарии
  renderComments(photoData.comments);

  // Добавляем классы
  bigPicture.classList.remove('hidden');
  getBody().classList.add('modal-open');
};

// Инициализация — вызываем один раз при загрузке страницы
const initGallery = () => {
  setupCloseHandlers();
  setupLoadMoreHandler();
};

document.addEventListener('DOMContentLoaded', initGallery);

export {
  openFullScreen,
  initGallery
};
