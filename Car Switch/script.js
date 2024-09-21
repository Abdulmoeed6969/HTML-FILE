// carousel.js

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const photobuttonsContainer = document.querySelector('.photobuttons');
      const photobuttons2Container = document.querySelector('.photobuttons2');
      const carousel = document.getElementById('carousel');
      const rightArrow = document.getElementById('right-arrow');

      let currentIndex = 0;
      const buttonsPerPage = 8;

      function renderButtons() {
        photobuttonsContainer.innerHTML = '';
        photobuttons2Container.innerHTML = '';

        data.cars.slice(currentIndex, currentIndex + buttonsPerPage).forEach(car => {
          const button = document.createElement('button');
          button.className = car.buttonClass;
          button.textContent = car.make;
          button.style.backgroundImage = `url(${car.image})`;
          photobuttonsContainer.appendChild(button);
        });

        data.cars.slice(currentIndex + buttonsPerPage, currentIndex + 2 * buttonsPerPage).forEach(car => {
          const button = document.createElement('button');
          button.className = car.buttonClass;
          button.textContent = car.make;
          button.style.backgroundImage = `url(${car.image})`;
          photobuttons2Container.appendChild(button);
        });

        updateCarouselPosition();
      }

      function updateCarouselPosition() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      rightArrow.addEventListener('click', () => {
        currentIndex += buttonsPerPage;

        if (currentIndex >= data.cars.length) {
          currentIndex = 0;
        }

        renderButtons();
      });

      renderButtons(); // Initial render
    })
    .catch(error => console.error('Error loading the data:', error));
})