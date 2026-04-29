import { isEscapeKey } from './util.js';
const COMMENTS_PER_PAGE = 5;
let currentCommentsShown = 0;
let escapeHandler = null;

// Закрытие модального окна
const closeFullScreen = (bigPicture, body, closeButton) => {
  if (bigPicture) bigPicture.classList.add('hidden');
  if (body) body.classList.remove('modal-open');
  if (closeButton) closeButton.removeEventListener('click', closeFullScreen);
  if (escapeHandler) {
    document.removeEventListener('keydown', escapeHandler);
    escapeHandler = null;
  }
  currentCommentsShown = 0;
};

// Настройка обработчиков закрытия
const setupCloseHandlers = (bigPicture, body) => {
  const closeButton = bigPicture?.querySelector('.big-picture__cancel');
  if (!closeButton) return;

  escapeHandler = (evt) => {
    if (isEscapeKey(evt)) closeFullScreen(bigPicture, body, closeButton);
  };

  closeButton.addEventListener('click', () => closeFullScreen(bigPicture, body, closeButton));
  document.addEventListener('keydown', escapeHandler);
};

// Обновление счётчика комментариев
const updateCommentCount = (shown, total, bigPicture) => {
  const el = bigPicture?.querySelector('.social__comment-count');
  if (el) el.textContent = `${shown} из ${total} комментариев`;
};

//Создаем элемент комментария
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

const renderComments = (comments, bigPicture) => {
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const totalComments = comments.length;

  // Определяем диапазон комментариев для текущей порции
  const endIndex = Math.min(currentCommentsShown + COMMENTS_PER_PAGE, totalComments);
  const commentsToShow = comments.slice(currentCommentsShown, endIndex);

  // Отрисовываем новые комментарии
  commentsToShow.forEach(comment => {
    const commentElement = createCommentElement(comment);
    commentsContainer.appendChild(commentElement);
  });

  // Обновляем счётчик
  currentCommentsShown = endIndex;
  updateCommentCount(currentCommentsShown, totalComments, bigPicture);

  // Скрываем кнопку, если все комментарии загружены
  const commentsLoaderEl = bigPicture.querySelector('.comments-loader');
  if (currentCommentsShown >= totalComments && commentsLoaderEl) {
    commentsLoaderEl.classList.add('hidden');
  }
};
const openFullScreen = (photoData) => {
  const bigPicture = document.querySelector('.big-picture');
  const body = document.body;

  // Проверка существования bigPicture
  if (!bigPicture) {
    console.error('Элемент .big-picture не найден в DOM');
    return;
  }

  // Безопасное заполнение данных
  const setTextContent = (selector, value) => {
    const el = bigPicture.querySelector(selector);
    if (el) el.textContent = value;
  };
  const setAttribute = (selector, attr, value) => {
    const el = bigPicture.querySelector(selector);
    if (el) el[attr] = value;
  };

  // Заполняем данные — устанавливаем .social__comment-total-count только один раз
  setAttribute('.big-picture__img img', 'src', photoData.url);
  setTextContent('.likes-count', photoData.likes);
  setTextContent('.social__comment-total-count', photoData.comments.length);
  setTextContent('.social__caption', photoData.descriptions || '');

  // Показываем элементы интерфейса
  const commentCountEl = bigPicture.querySelector('.social__comment-count');
  const commentsLoaderEl = bigPicture.querySelector('.comments-loader');

  if (commentCountEl) commentCountEl.classList.remove('hidden');
  if (commentsLoaderEl) commentsLoaderEl.classList.remove('hidden');

  // Очищаем комментарии и сбрасываем счётчик
  const commentsContainer = bigPicture.querySelector('.social__comments');
  if (commentsContainer) commentsContainer.innerHTML = '';
  currentCommentsShown = 0;

  // Отрисовываем первые комментарии
  renderComments(photoData.comments, bigPicture);

  // Настраиваем обработчик кнопки «Загрузить ещё» с удалением старого
  if (commentsLoaderEl) {
    // Удаляем старый обработчик, если есть
    commentsLoaderEl.replaceWith(commentsLoaderEl.cloneNode(true));
    // Добавляем новый
    const newLoader = bigPicture.querySelector('.comments-loader');
    newLoader.addEventListener('click', () => {
      renderComments(photoData.comments, bigPicture);
    });
  }

  // Добавляем классы для отображения
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  // Навешиваем обработчики закрытия
  setupCloseHandlers(bigPicture, body);
};

export { openFullScreen };
