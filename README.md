Glass UI Analog Clock with Weather (Next.js + Tailwind)

A modern, responsive web app featuring an **Apple-inspired liquid glass UI** with a real-time **analog clock** and **location-based weather system**.

URL: https://glass-ui-clock.vercel.app/

## Features

- Real-time **Analog Clock**
- **Automatic location detection** using browser GPS
- Live **current weather + weekly forecast**
- Current **date display**
- **Glassmorphism (Liquid Glass UI)** design
- Neon glowing background
- Fully responsive (Desktop + Mobile)

## Tech Stack

This project is built using:

- **Next.js (App Router)**
- **React (useState, useEffect)**
- **Tailwind CSS** 
- **Open-Meteo API**
- **OpenStreetMap (Nominatim API)**
- **Browser Geolocation API**

## UI Design (Glassmorphism / Liquid Glass)
This project uses **Glassmorphism UI**, inspired by Apple’s modern design.

### Key UI Elements:
- `backdrop-blur-xl` → creates glass blur effect
- `bg-white/10` → semi transparent layer
- `border-white/20` → soft glass edges
- `shadow-2xl` → depth and floating feel
- Neon gradient background for glow

## How It Works

### 1. Clock System

- Uses `setInterval` to update every second
- Calculates rotation angles:

```
calculation- 
Hour hand = hours × 30 + minutes × 0.5
Minute hand = minutes × 6
Second hand = seconds × 6
```
- Hands rotate using CSS transforms
### 2. Location Detection

The app automatically detects your location using:
```js
navigator.geolocation.getCurrentPosition()
```
This gives Latitude and Longitude

### 3. Location Name

Coordinates are converted into a readable place name using:

```
https://nominatim.openstreetmap.org/reverse
```

Example:
```
23.81, 90.41 → Dhaka
```
Fallback system ensures it works for City, Town, Village and State

### 4. Weather Data

Weather is fetched from:

```
https://api.open-meteo.com
```
Data includes:
- Current temperature
- Wind speed
- Daily max/min temperatures

### 5. 📊 Weekly Weather Table
- Displays next **7 days forecast**
- Shows:
  - Day
  - Max temparature
  - Min temparature

Rendered dynamically using:
```js
weather.daily.time.slice(0, 7)
```
## Responsive Design

Built using Tailwind responsive utilities:
- **Desktop:**
  - Clock → Right
  - Weather → Left

- **Mobile:**
  - Clock → Top
  - Weather → Bottom

## Important Notes

- Location access must be **allowed in browser**
- Works only on **HTTPS**
- Weather loads after location permission is granted

## Final Thoughts

This project combines:
- Real time systems
- External APIs (weather + geolocation)
- Modern glass UI design (glassmorphism)

