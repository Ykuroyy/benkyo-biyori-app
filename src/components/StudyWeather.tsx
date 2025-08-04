import { useEffect, useState } from 'react'
import { StudyWeather as StudyWeatherType, STUDY_WEATHER_DATA } from '../types/StudyWeather'
import './StudyWeather.css'

export function StudyWeather() {
  const [weather, setWeather] = useState<StudyWeatherType | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    console.log('StudyWeather useEffect triggered')
    console.log('STUDY_WEATHER_DATA:', STUDY_WEATHER_DATA)
    
    // 時間帯に応じて天気を選択
    const hour = new Date().getHours()
    console.log('Current hour:', hour)
    let filteredWeather: StudyWeatherType[]
    
    if (hour >= 6 && hour < 10) {
      // 朝は元気な天気
      filteredWeather = STUDY_WEATHER_DATA.filter(w => w.mood === 'sunny' || w.mood === 'rainbow')
    } else if (hour >= 10 && hour < 15) {
      // 昼間は様々
      filteredWeather = STUDY_WEATHER_DATA.filter(w => w.mood !== 'starry')
    } else if (hour >= 15 && hour < 18) {
      // 午後は少し落ち着いた天気
      filteredWeather = STUDY_WEATHER_DATA.filter(w => w.mood === 'cloudy' || w.mood === 'rainy')
    } else if (hour >= 18 && hour < 22) {
      // 夕方から夜
      filteredWeather = STUDY_WEATHER_DATA.filter(w => w.mood === 'starry' || w.mood === 'rainbow')
    } else {
      // 深夜
      filteredWeather = STUDY_WEATHER_DATA.filter(w => w.mood === 'starry' || w.mood === 'rainy')
    }
    
    console.log('Filtered weather:', filteredWeather)
    
    // フィルタリング結果が空の場合はすべてのデータから選択
    if (filteredWeather.length === 0) {
      filteredWeather = STUDY_WEATHER_DATA
    }
    
    // ランダムに選択
    const randomWeather = filteredWeather[Math.floor(Math.random() * filteredWeather.length)]
    console.log('Selected weather:', randomWeather)
    
    if (randomWeather) {
      setWeather(randomWeather)
      setIsAnimating(true)
      
      // アニメーション終了後にフラグをリセット
      setTimeout(() => setIsAnimating(false), 500)
    }
  }, [])

  if (!weather) return null

  return (
    <div className={`study-weather ${isAnimating ? 'animate-in' : ''}`}>
      <div 
        className="weather-icon"
        style={{ backgroundColor: weather.color }}
      >
        <span className="emoji">{weather.emoji}</span>
      </div>
      <p className="weather-message">{weather.message}</p>
      <div className="motivation-meter">
        <span className="meter-label">やる気メーター</span>
        <div className="meter-bar">
          <div 
            className="meter-fill"
            style={{ 
              width: `${weather.motivationLevel * 20}%`,
              backgroundColor: weather.color
            }}
          />
        </div>
      </div>
    </div>
  )
}