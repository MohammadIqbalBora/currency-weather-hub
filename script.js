/* jshint esversion: 8 */

// =========================
// CURRENCY CONVERTER SECTION
// Handles fetching currencies, conversion logic, and UI updates
// =========================

// Get DOM elements for currency converter
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const swapBtn = document.getElementById("swap-btn");

// =========================
// LOAD AVAILABLE CURRENCIES
// Fetches currency list from API and populates dropdowns
// =========================
async function loadCurrencies() {

    try {
        // Fetch latest exchange rates (base USD)
        const response = await fetch(
            "https://open.er-api.com/v6/latest/USD"
        );

        const data = await response.json();

        // Extract currency codes from API response
        const currencies = Object.keys(data.rates);

        // Create dropdown options for each currency
        currencies.forEach(currency => {

            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        // Set default selected values
        fromCurrency.value = "GBP";
        toCurrency.value = "USD";

    } catch (error) {
        // Show error if API fails
        result.innerHTML = "Error loading currencies.";
    }
}

// =========================
// CONVERT CURRENCY FUNCTION
// Uses API to convert selected currencies
// =========================
async function convertCurrency() {

    const amount = amountInput.value;

    // Validate input
    if (amount === "" || amount <= 0) {
        result.innerHTML = "Please enter a valid amount.";
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
        // Fetch exchange rates for selected base currency
        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        const data = await response.json();

        // Get conversion rate
        const rate = data.rates[to];

        // Calculate converted amount
        const convertedAmount = amount * rate;

        // Display result
        result.innerHTML =
            `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;

    } catch (error) {
        // Handle API errors
        result.innerHTML = "Error fetching exchange rates.";
    }
}

// =========================
// EVENT LISTENERS - CURRENCY CONVERTER
// =========================

// Convert button click event
convertBtn.addEventListener("click", convertCurrency);

// Swap currencies button logic
swapBtn.addEventListener("click", () => {

    // Temporarily store "from" value
    const temp = fromCurrency.value;

    // Swap values
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    // Re-run conversion after swap
    convertCurrency();
});

// Load currencies on page load
loadCurrencies();


// =========================
// WEATHER SECTION
// Handles fetching weather data from OpenWeather API
// =========================

// Get DOM elements for weather feature
const cityInput = document.getElementById("city-input");
const weatherBtn = document.getElementById("weather-btn");
const weatherResult = document.getElementById("weather-result");

// API key for OpenWeatherMap
const weatherApiKey = "d356c131591bbd6b2f041f05549c930b";

// =========================
// GET WEATHER FUNCTION
// Fetches weather data for a given city
// =========================
async function getWeather() {

    const city = cityInput.value.trim();

    // Validate input
    if (city === "") {
        weatherResult.innerHTML = "Please enter a city name.";
        return;
    }

    // Build API URL
    const weatherURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    try {
        const response = await fetch(weatherURL);

        // Handle invalid city response
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Display weather information
        weatherResult.innerHTML = `
            <h3>${data.name}</h3>
            <p>🌡 Temperature: ${data.main.temp}°C</p>
            <p>☁ Weather: ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        `;

    } catch (error) {
        // Show error message if city is invalid or API fails
        weatherResult.innerHTML =
            "City not found. Please try again.";
    }
}

// Weather button click event
weatherBtn.addEventListener("click", getWeather);


// =========================
// DARK / LIGHT MODE TOGGLE
// Handles theme switching and saving user preference
// =========================

// Get theme toggle button
const themeToggle = document.getElementById("theme-toggle");

// =========================
// LOAD SAVED THEME
// Checks localStorage for previously selected theme
// =========================
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "Light Mode";
}

// =========================
// TOGGLE THEME
// Switches between dark and light mode
// =========================
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // If dark mode is active
    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "Light Mode";

    } else {

        // Light mode active
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "Dark Mode";
    }
});