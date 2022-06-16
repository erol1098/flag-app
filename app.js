//*=========================================================
//*                     FLAG-APP
//*=========================================================
const getCountries = async (countryName) => {
  // if (countryName.textContent === "Select Country") return;
  // countryName = countryName.value;
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await res.json();
    renderCard(data[0]);
  } catch (err) {
    renderError(err);
  }
};

const getAllCountryName = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    const names = data.map((country) => country.name.common);
    names.sort();
    names.forEach((country) => renderSelect(country));
  } catch (error) {
    renderError(err);
  }
};
getAllCountryName();

const renderSelect = (country) => {
  const newOption = document.createElement("option");
  newOption.value = country;
  newOption.textContent = country;
  document.querySelector("select").append(newOption);
};
const renderCard = (data) => {
  const {
    flags: { svg },
    name: { official },
    capital,
    region,
    languages,
    currencies,
  } = data;
  const language = getLanguage(languages);
  const currency = getCurrency(currencies);
  const country = document.createElement("div");
  country.classList.add("d-flex", "justify-content-center", "mt-4");
  country.innerHTML = `
    <div class="card" style="width: 18rem">
        <img src="${svg}" class="card-img-top" alt="${official} flag" />
        <div class="card-body">
          <h5 class="card-title">${official}</h5>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><i class="fa-solid fa-earth-europe"></i> ${region}</li>
          <li class="list-group-item"><i class="fas fa-lg fa-landmark"></i> ${capital}</li>
          <li class="list-group-item"><i class="fa-solid fa-language"></i> ${language}</li>
          <li class="list-group-item"><i class="fa-solid fa-money-bill-wave"></i> ${currency}</li>
        </ul>
      </div>`;

  document.querySelector(".cards").innerHTML = "";
  document.querySelector(".cards").append(country);
};

const renderError = (err) => {
  document.querySelector("body").innerHTML = `
    <img src="./img/error.jpg" class="img-thumbnail mt-2">`;
};
const getLanguage = (languages) => {
  return Object.values(languages).join(" ");
};

const getCurrency = (currencies) => {
  return `${Object.entries(currencies)[0][1].symbol || ""} ${
    Object.entries(currencies)[0][1].name
  }`;
};

const dropdown = document.querySelector("select");
dropdown.onchange = (e) =>
  getCountries(dropdown.options[dropdown.selectedIndex].text);
