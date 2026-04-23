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

  // Обрабатываем комментарии
  const commentsContainer = bigPicture.querySelector('.social__comments');
  commentsContainer.innerHTML = ''; // Очищаем предыдущие комментарии

  photoData.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.className = 'social__comment';
    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsContainer.appendChild(commentElement);
  });

  // Устанавливаем количество показанных комментариев (равно общему количеству)
  bigPicture.querySelector('.social__comment-shown-count').textContent = photoData.comments.length;

  // Спрячем блоки счётчика комментариев и загрузки новых комментариев
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  // Добавляем класс modal-open к body
  body.classList.add('modal-open');

  // Навешиваем обработчики для закрытия
  setupCloseHandlers(bigPicture, body);
};

export { openFullScreen };
