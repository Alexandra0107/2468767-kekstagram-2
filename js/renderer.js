const renderThumbs = (thumbsList, template, picturesContainer) => {
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

    // Добавляем элемент во fragment
    fragment.appendChild(element);
  });

  // Добавляем фрагмент в контейнер
  picturesContainer.appendChild(fragment);
};

export { renderThumbs };
