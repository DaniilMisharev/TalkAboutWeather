/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const cityInput = document.querySelector('#city-input');
const buttonForm = document.querySelector('#city-button');
const test = document.querySelector('.city');

const KEY = '4bdaf307c9926faf0a5ae780cfc58204';

const url = `https://openweathermap.org/api.openweathermap.org/data/2.5/weather?id=${cityInput.value}&appid=${KEY}`;

buttonForm.addEventListener('click', async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${KEY}`);
    const data = await response.json();
    const {
      main, name, sys, weather,
    } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const li = document.createElement('li');
    li.classList.add('city');
    const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp) - 273.5}<sup>°C</sup>
      </div>
      <figure>
        <img class="city-icon" src=${icon} alt=${weather[0].main}>
        <figcaption>${weather[0].description}</figcaption>
      </figure>
    `;
    li.innerHTML = markup;
    test.innerHTML = '';
    test.appendChild(li);
    form.reset();
    input.focus();
  } catch (error) {
    console.log(error);
  }
});
