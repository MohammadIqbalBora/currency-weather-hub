// =========================
// CURRENCY CONVERTER
// =========================

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const swapBtn = document.getElementById("swap-btn");

// Load currencies
async function loadCurrencies() {

    try {

        const response = await fetch(
            "https://open.er-api.com/v6/latest/USD"
        );

        const data = await response.json();

        const currencies =
            Object.keys(data.rates);

        currencies.forEach(currency => {

            const option1 =
                document.createElement("option");

            option1.value = currency;
            option1.textContent = currency;

            const option2 =
                document.createElement("option");

            option2.value = currency;
            option2.textContent = currency;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "GBP";
        toCurrency.value = "USD";

    } catch (error) {

        result.innerHTML =
            "Error loading currencies.";
    }
}

// Convert currency
async function convertCurrency() {

    const amount = amountInput.value;

    if (amount === "" || amount <= 0) {

        result.innerHTML =
            "Please enter a valid amount.";

        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        const data = await response.json();

        const rate = data.rates[to];

        const convertedAmount =
            amount * rate;

        result.innerHTML =
            `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;

    } catch (error) {

        result.innerHTML =
            "Error fetching exchange rates.";
    }
}

// Convert button
convertBtn.addEventListener(
    "click",
    convertCurrency
);

// Swap currencies
swapBtn.addEventListener("click", () => {

    const temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;

    toCurrency.value = temp;

    convertCurrency();
});

// Load currencies
loadCurrencies();
// =========================
// WEATHER SECTION
// =========================

const cityInput = document.getElementById("city-input");
const weatherBtn = document.getElementById("weather-btn");
const weatherResult = document.getElementById("weather-result");

// WEATHER API KEY
const weatherApiKey = "d356c131591bbd6b2f041f05549c930b";

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {

        weatherResult.innerHTML =
            "Please enter a city name.";

        return;
    }

    const weatherURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    try {

        const response = await fetch(weatherURL);

        if (!response.ok) {

            throw new Error("City not found");
        }

        const data = await response.json();

        weatherResult.innerHTML = `
            <h3>${data.name}</h3>

            <p>🌡 Temperature: ${data.main.temp}°C</p>

            <p>☁ Weather: ${data.weather[0].description}</p>

            <p>💧 Humidity: ${data.main.humidity}%</p>

            <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        `;

    } catch (error) {

        weatherResult.innerHTML =
            "City not found. Please try again.";
    }
}

weatherBtn.addEventListener("click", getWeather);


// =========================
// DARK / LIGHT MODE
// =========================

const themeToggle =
    document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "Light Mode";
}

// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains("dark-mode")
    ) {

        localStorage.setItem("theme", "dark");

        themeToggle.textContent = "Light Mode";

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.textContent = "Dark Mode";
    }
});

