document.querySelectorAll('.sixblock__header__content__details').forEach((details) => {
    const text = details.querySelector('.sixblock__header__content__details__text');

    details.addEventListener('toggle', () => {
        // При открытии, задаём максимальную высоту для анимации
        if (details.open) {
            text.style.maxHeight = `${text.scrollHeight}px`;  // Принудительно подгоняем высоту
            text.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out'; // Плавный переход
        } else {
            // При закрытии сбрасываем значения, чтобы анимация сработала
            text.style.transition = 'none';  // Убираем переход для мгновенного скрытия
            text.offsetHeight; // Перерисовка
            text.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out'; // Включаем плавный переход
            text.style.maxHeight = '0';  // Скрываем элемент
        }
    });
});
