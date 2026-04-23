This is a contemporary responsive web application which uses Next.js and Tailwind CSS frameworks and incorporates real time analog clock and live weather updates based on the user’s geographic location. The overall interface design is inspired by the Apple liquid glass UI theme and has an ethereal glow, blur effect, and neon glow effect, creating a futuristic interface appearance. Here you can check the application live: https://glass-ui-clock.vercel.app/

The real-time analog clock of the app is fully functional and works using JavaScript’s setInterval function. In addition, the dynamic rotation of the clock hands is calculated using the following formulas:

• Hours hand rotates depending on hours × 30 + minutes × 0.5;
• Minute hand rotates at 6 degrees per minute;
• Second hand rotates at 6 degrees per second.

These calculations are used in order to apply the required CSS transform function for rotating the hands.

To provide location-based features, the Geolocation API from the browser is used. Upon getting permission, it detects the latitude and longitude of the user and passes this information to the OpenStreetMap Nominatim reverse geocoding API, which provides the readable location in terms of city or town names. However, there is also a backup plan for places such as villages and regions.

The weather data is obtained from the Open-Meteo API without having an API key. Current temperature, wind speed, and daily temperature minima and maxima are provided by the application. Additionally, a 7-day weather forecast is rendered with the help of API response mapping using the table component.

In terms of designing, the idea of ​​glassmorphism is implemented using a liquid glass UI. It consists of Tailwind utilities such as backdrop-blur-xl for blur, bg-white/10 for transparent backgrounds, border-white/20 for soft borders, and shadow-md for a floating effect. A neon gradient background makes the application look more modern.

The layout is responsive and adjusts seamlessly to any device used. In case of desktop computers, the clock and weather layouts appear in parallel format, but in the case of mobile phones, the two are placed one above the other in a vertical formation.

There are a couple of requirements that make sure the application works optimally. The first is that location services must be turned on in the browser since the application runs on HTTPS for security reasons related to geolocation. In addition, weather information is not loaded until location permissions are granted.

In summary, this project combines concepts from real-time systems, API connections, and user interface design to generate a visually engaging product.
