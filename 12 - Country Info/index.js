"use strict";

const input = document.querySelector("input");
const btn = document.querySelector("button");
const countriesContainer = document.querySelector(".countries");

function renderCountry(data, neighbour = "") {
  const html = `
              <article class="country ${neighbour}">
                  <img class="country__img" src="${data.flags.svg}" />
                  <div class="country__data">
                      <h3 class="country__name">${data.name.official}</h3>
                      <h4 class="country__region">${data.region}</h4>
                      <p class="country__row"><span>👫</span>${(
                        +data.population / 1_00_00_000
                      ).toFixed(1)} Cr people</p>
                      <p class="country__row"><span>🗣️</span>${Object.keys(
                        data.languages
                      )
                        .map(
                          (_, i) =>
                            data.languages[Object.keys(data.languages)[i]]
                        )
                        .join(", ")}</p>
                      <p class="country__row"><span>💰</span>${
                        data.currencies[Object.keys(data.currencies)[0]].name
                      }</p>
                  </div>
              </article>
  
            `;
  console.log(
    Object.keys(data.languages).map(
      (_, i) => data.languages[Object.keys(data.languages)[i]]
    )
  );

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

function getCountryAndNeighbour(country) {
  // Ajax Call

  try {
    const request = new XMLHttpRequest();

    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    console.log(request);
    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);

      // Render Country
      renderCountry(data);

      //Render Neighbours
      const neighhbours = data.borders;

      if (!neighhbours) return;
      neighhbours.forEach((ctry) => {
        // Ajax Call
        const request = new XMLHttpRequest();
        request.open("GET", `https://restcountries.com/v3.1/alpha/${ctry}`);
        request.send();
        request.addEventListener("load", function () {
          const [data] = JSON.parse(this.responseText);
          console.log(data);

          // Render Country
          renderCountry(data, "neighbour");
        });
      });
    });
  } catch (err) {
    throw err;
  }
}
btn.addEventListener("click", function (e) {
  e.preventDefault();
  try {
    countriesContainer.innerHTML = "";
    getCountryAndNeighbour(`${input.value}`);
  } catch (err) {
    countriesContainer.innerHTML = "sfsf";
    console.log(err);
  }
});

// const whereAmI = async function (country) {
//   try {
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//     console.log(res);

//     const [data] = await res.json();
//     console.log(data);
//     renderCountry(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// whereAmI("republic of india");
