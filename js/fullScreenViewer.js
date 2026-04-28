let currentCommentsShown = 0;
const COMMENTS_PER_PAGE = 5;
const setupCloseHandlers = (bigPicture, body) => {
  const closeButton = bigPicture.querySelector('.big-picture__cancel');

  // Закрытие по клику на крестик
  closeButton.addEventListener('click', closeFullScreen);

  // Закрытие по нажатию Esc
  document.addEventListener('keydown', onEscapePress);

  function onEscapePress(evt) {
    if (evt.key === 'Escape') {
      closeFullScreen();
    }
  }

  function closeFullScreen() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    // Убираем обработчики событий при закрытии
    closeButton.removeEventListener('click', closeFullScreen);
    document.removeEventListener('keydown', onEscapePress);
    // Сбрасываем состояние для комментариев
    currentCommentsShown = 0;
  }
};
const updateCommentCount = (shown, total, bigPicture) => {
  const commentCountEl = bigPicture.querySelector('.social__comment-count');
  if (commentCountEl) {
    commentCountEl.textContent = `${shown} из ${total} комментариев`;
  }
};

const createCommentElement = (comment) => {
  const commentEl = document.createElement('li');
  commentEl.className = 'social__comment';

  commentEl.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

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

  // Удаляем класс hidden, чтобы показать окно
  bigPicture.classList.remove('hidden');

  // Заполняем данными из переданного объекта photoData
  bigPicture.querySelector('.big-picture__img img').src = photoData.url;
  bigPicture.querySelector('.likes-count').textContent = photoData.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = photoData.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photoData.description || '';
  
// Показываем блоки счётчика и кнопки загрузки
  const commentCountEl = bigPicture.querySelector('.social__comment-count');
  const commentsLoaderEl = bigPicture.querySelector('.comments-loader');

  if (commentCountEl) commentCountEl.classList.remove('hidden');
  if (commentsLoaderEl) commentsLoaderEl.classList.remove('hidden');

  // Обрабатываем комментарии
  const commentsContainer = bigPicture.querySelector('.social__comments');
  commentsContainer.innerHTML = ''; // Очищаем предыдущие комментарии

  // Устанавливаем общее количество комментариев
  bigPicture.querySelector('.social__comment-total-count').textContent = photoData.comments.length;

  // Инициализируем счётчик показанных комментариев
  currentCommentsShown = 0;

  // Отрисовываем первые 5 комментариев
  renderComments(photoData.comments, bigPicture);

  // Настраиваем обработчик кнопки «Загрузить ещё»
  commentsLoaderEl.addEventListener('click', () => {
    renderComments(photoData.comments, bigPicture);
  });

  // Добавляем класс modal-open к body
  body.classList.add('modal-open');

  // Навешиваем обработчики для закрытия
  setupCloseHandlers(bigPicture, body);
};

export { openFullScreen };
