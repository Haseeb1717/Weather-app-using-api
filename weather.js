
        const cityInput = document.getElementById('city-input');
        const suggestionsContainer = document.getElementById('suggestions');
        const cityName = document.getElementById('city');
        const temperature = document.getElementById('temperature');
        const weatherDescription = document.getElementById('description');

        // Example array of cities (could be replaced with a more comprehensive list or API)
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose','Oman','Pakistan','london'];

        cityInput.addEventListener('input', () => {
            const query = cityInput.value.toLowerCase();
            suggestionsContainer.innerHTML = '';

            if (query) {
                const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
                filteredCities.forEach(city => {
                    const item = document.createElement('div');
                    item.textContent = city;
                    item.className = 'autocomplete-item';
                    item.addEventListener('click', () => {
                        cityInput.value = city;
                        suggestionsContainer.innerHTML = '';
                        getWeatherData(city);
                    });
                    suggestionsContainer.appendChild(item);
                });
            }
        });

        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = "4624630c30425b5f25b59ecf8eedb100";

        async function getWeatherData(city) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        function displayWeather(data) {
            const { name, main, weather } = data;
            const temperatureValue = main.temp;
            const description = weather[0].description;

            cityName.textContent = name;
            temperature.textContent = `${temperatureValue}°C`;
            weatherDescription.textContent = description;
        }
