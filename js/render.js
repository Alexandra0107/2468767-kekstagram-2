const renderThumbs = (thumbsList) => {
  // Находим шаблон
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('a');

  // Находим контейнер
  const picturesContainer = document.querySelector('.pictures');

  // Создаём фрагмент для эффективной отрисовки
  const fragment = document.createDocumentFragment();

  thumbsList.forEach((data, index) => {
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
    comments.textContent = data.comments.length;
    element.dataset.id = index;

    // Добавляем элемент во фрагмент
    fragment.appendChild(element);
  });

  // Добавляем фрагмент в контейнер
  picturesContainer.appendChild(fragment);
  return picturesContainer;
};

export { renderThumbs };
