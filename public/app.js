const searchButton = document.getElementById('search');
const cityInput = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const apiUrl = `/weather?city=${city}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        temperatureElement.textContent = `Temperature: ${data.temperature}°C`;
        humidityElement.textContent = `Humidity: ${data.humidity}%`;
        descriptionElement.textContent = `Condition: ${data.description}`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data.');
    }
}