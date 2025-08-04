import { StudyWeather } from './components/StudyWeather'
import { WeeklySchedule } from './components/WeeklySchedule'
import { StampBook } from './components/StampBook'
import { StudyDiary } from './components/StudyDiary'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <h1>べんきょう日和</h1>
      <StudyWeather />
      <WeeklySchedule />
      <StampBook />
      <StudyDiary />
    </div>
  )
}

export default App