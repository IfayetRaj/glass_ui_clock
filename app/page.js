'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [time, setTime] = useState(new Date())
  const [weather, setWeather] = useState(null)
  const [locationName, setLocationName] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // users location and fetch weather data on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords
        // Reverse geocoding to get place name
        try {
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          const geoData = await geoRes.json()
          setLocationName(geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state || 'Your Location')
        } catch (err) {
          console.log('geo error', err)
        }
        try {
          // API call to Open-Meteo for current weather and daily forecast
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`)
          const data = await res.json()
          setWeather(data.current_weather)
          setWeather({ ...data.current_weather, daily: data.daily })
        } catch (err) {
          console.log('weather error', err)
        }
      })
    }
  }, [])
  // calculating angles for clock hands
  const seconds= time.getSeconds()
  const minutes= time.getMinutes()
  const hours= time.getHours()

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">

      {/* Neon background */}
      <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 opacity-20 blur-3xl"></div>

      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 w-[90%] max-w-6xl flex flex-col md:flex-row gap-6">

       {/* left: Analog Clock */}
       <div className="flex-1 shadow-2xl shadow-black/60 rounded-3xl flex items-center justify-center">
          <div className="relative w-82 h-82 shadow-2xl shadow-black rounded-full border border-white/20 backdrop-blur-lg bg-white/10 flex items-center justify-center">

            {/* Hour hand */}
            <div
              className="absolute w-1 h-16 bg-white origin-bottom left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
              style={{ transform: `rotate(${hours*30+minutes*0.5}deg)` }}
            />

            {/* Minute hand */}
            <div
              className="absolute w-0.5 h-24 bg-white origin-bottom left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
              style={{ transform: `rotate(${minutes*6}deg)` }}
            />

            {/* Second hand */}
            <div
              className="absolute w-px h-28 bg-red-500 origin-bottom left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
              style={{ transform: `rotate(${seconds*6}deg)` }}
            />

            <div className="w-3 h-3 bg-white rounded-full z-10" />
          </div>
        </div>

        {/* right: Weather */}
        <div className="flex-1 text-white">
          <h1 className="text-4xl font-semibold mb-1">Weather</h1>
          <p className="text-sm opacity-70 mb-2"> ➤ {locationName || 'waiting for location...'}</p>
          <p className="text-lg opacity-80 mb-4">
            {time.toDateString()}
          </p>

          {weather ? (
            <div className="backdrop-blur-xl shadow-2xl shadow-black bg-white/9 border border-white/20 rounded-2xl p-4">

              {/* Current Weather */}
              <div className="mb-4">
                <p className="text-3xl font-bold">Temperature: <span className='text-orange-400'>{weather.temperature}</span>°C</p>
                <p className="opacity-70">Wind:<span className='text-red-600'> {weather.windspeed}</span> km/h</p>
              </div>

              {/* Daily Table */}
              <div className="overflow-x-auto ">
                <table className="w-full text-sm text-left">
                  <thead className="border-b border-white/20">
                    <tr >
                      <th className="py-2">Day</th>
                      <th>Max</th>
                      <th>Min</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weather.daily.time.slice(0,7).map((day, i) => (
                      <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-2">- {new Date(day).toLocaleDateString(undefined,{weekday:'short'})}</td>
                        <td>- {weather.daily.temperature_2m_max[i]}°</td>
                        <td>- {weather.daily.temperature_2m_min[i]}°</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="mt-4">Loading weather...</p>
          )}
        </div>
      </div>
    </div>
  )
}
