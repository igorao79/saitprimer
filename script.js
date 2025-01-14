

document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.querySelector(".firstblock__header__burger");
    const navMenu = document.querySelector(".firstblock__header__nav");

    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("open");
        navMenu.classList.toggle("active");
    });
});






// ///////////////////////////////////////////////////////////////////////////////////////////



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


// ////////////////////////////////////////////////////////////////////////////



const cards = document.querySelectorAll('.fourthblock__clientblock__cardblock__card');

cards.forEach(card => {
    const labels = card.querySelectorAll('.fourthblock__clientblock__cardblock__card__head__rating__label');
    const inputs = card.querySelectorAll('.fourthblock__clientblock__cardblock__card__head__rating__input');
    
    labels.forEach(label => {
        label.addEventListener('mouseenter', () => {
            // Добавляем класс hovered для подсветки звёзд
            label.classList.add('hovered');
            let nextLabel = label;
            while (nextLabel = nextLabel.nextElementSibling) {
                if (nextLabel.classList.contains('fourthblock__clientblock__cardblock__card__head__rating__label')) {
                    nextLabel.classList.add('hovered');
                }
            }
        });

        label.addEventListener('mouseleave', () => {
            // Убираем класс hovered при уходе мыши
            label.classList.remove('hovered');
            let nextLabel = label;
            while (nextLabel = nextLabel.nextElementSibling) {
                if (nextLabel.classList.contains('fourthblock__clientblock__cardblock__card__head__rating__label')) {
                    nextLabel.classList.remove('hovered');
                }
            }
        });

        label.addEventListener('click', () => {
            // Убираем класс hovered со всех меток в текущей карточке
            labels.forEach(l => l.classList.remove('hovered'));

            // Устанавливаем класс hovered для всех меток до и включая выбранную
            let isHovered = false;
            labels.forEach(l => {
                if (l === label) {
                    isHovered = true;
                }
                if (isHovered) {
                    l.classList.add('hovered');
                } else {
                    l.classList.remove('hovered');
                }
            });

            // Также обновляем состояния радиокнопок
            inputs.forEach(input => {
                if (input.nextElementSibling === label) {
                    input.checked = true;
                }
            });
        });
    });
});


// ///////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function () {
    const contentLists = document.querySelectorAll('.fifthblock__main__card__content');
    const cardElements = document.querySelectorAll('.fifthblock__main__card'); // Находим все карточки

    const svgDown = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve">
            <style>.st0{display:none}.st1{display:inline}.st2{fill:#0a0a0a}</style>
            <g id="row2_1_"><g id="_x35__3_">
                <path class="st2" d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm21.7-63.2L70.4 70.3V41.7c0-2.2-2.3-3.2-4.4-3.2h-4c-2.2 0-3.9 1.8-3.9 3.9v28.4L42.3 58.1c-2.2 0-3.9 1.8-3.9 3.9v7.1L64 95.8l25.6-26.7V62c0-2.2-1.8-3.9-3.9-3.9z"/>
            </g></g>
        </svg>
    `;

    const svgUp = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve">
            <style>.st0{display:none}.st1{display:inline}.st2{fill:#0a0a0a}</style>
            <g id="row2_1_"><g id="_x34__3_">
                <path class="st2" d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zM38.4 58.9V66c0 2.2 1.8 3.9 3.9 3.9l15.3-12.2v28.7c0 2.2 2.3 3.2 4.4 3.2h4c2.2 0 3.9-1.8 3.9-3.9V57.2l15.8 12.7c2.2 0 3.9-1.8 3.9-3.9v-7.1L64 32.2 38.4 58.9z"/>
            </g></g>
        </svg>
    `;

    contentLists.forEach((contentList, index) => {
        const toggleButton = contentList.querySelector('.fifthblock__main__card__content__toggle');
        const hiddenItems = contentList.querySelectorAll('li.hidden');
        const cardElement = cardElements[index]; // Получаем соответствующую карточку для текущего списка

        toggleButton.innerHTML = svgDown; // Начальное состояние кнопки с SVG вниз

        toggleButton.addEventListener('click', function () {
            hiddenItems.forEach(item => {
                item.classList.toggle('hidden');
            });

            toggleButton.classList.toggle('fifthblock__main__card__content__toggle--expanded');
            if (toggleButton.classList.contains('fifthblock__main__card__content__toggle--expanded')) {
                toggleButton.innerHTML = svgUp; // Меняем на SVG вверх
                cardElement.style.minHeight = '900px'; // Устанавливаем min-height для увеличения высоты карточки
            } else {
                toggleButton.innerHTML = svgDown; // Меняем на SVG вниз
                cardElement.style.minHeight = ''; // Возвращаем исходное значение min-height
            }
        });
    });
});
