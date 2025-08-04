import { useState, useEffect } from 'react'
import { 
  ScheduleItem, 
  DAYS_OF_WEEK, 
  SUBJECTS, 
  SUBJECT_COLORS,
  DURATION_OPTIONS,
  DayOfWeek,
  Subject
} from '../types/Schedule'
import './WeeklySchedule.css'

export function WeeklySchedule() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([])
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject>('英語')
  const [selectedDuration, setSelectedDuration] = useState(15)
  const [isEditing, setIsEditing] = useState(false)

  // localStorageから読み込み
  useEffect(() => {
    const saved = localStorage.getItem('weeklySchedule')
    if (saved) {
      setSchedules(JSON.parse(saved))
    }
  }, [])

  // localStorageに保存
  useEffect(() => {
    localStorage.setItem('weeklySchedule', JSON.stringify(schedules))
  }, [schedules])

  const handleAddSchedule = () => {
    if (!selectedDay) return

    const newSchedule: ScheduleItem = {
      id: `${Date.now()}`,
      dayOfWeek: selectedDay,
      subject: selectedSubject,
      duration: selectedDuration,
      completed: false
    }

    setSchedules([...schedules, newSchedule])
    setSelectedDay(null)
    setIsEditing(false)
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id))
  }

  const getDaySchedules = (day: DayOfWeek) => {
    return schedules.filter(s => s.dayOfWeek === day)
  }

  const getTotalDuration = (day: DayOfWeek) => {
    return getDaySchedules(day).reduce((sum, s) => sum + s.duration, 0)
  }

  return (
    <div className="weekly-schedule">
      <h2>週間スケジュール 📅</h2>
      
      <div className="days-grid">
        {DAYS_OF_WEEK.map(day => {
          const daySchedules = getDaySchedules(day)
          const totalMinutes = getTotalDuration(day)
          
          return (
            <div key={day} className="day-card">
              <h3>{day}曜日</h3>
              
              <div className="schedule-items">
                {daySchedules.map(schedule => (
                  <div 
                    key={schedule.id} 
                    className="schedule-item"
                    style={{ backgroundColor: SUBJECT_COLORS[schedule.subject] }}
                  >
                    <span className="subject-name">{schedule.subject}</span>
                    <span className="duration">{schedule.duration}分</span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      aria-label="削除"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="day-footer">
                <p className="total-time">
                  合計: <strong>{totalMinutes}分</strong>
                </p>
                {totalMinutes < 30 && (
                  <button
                    className="add-btn"
                    onClick={() => {
                      setSelectedDay(day)
                      setIsEditing(true)
                    }}
                  >
                    + 追加
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {isEditing && selectedDay && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>{selectedDay}曜日の予定を追加</h3>
            
            <div className="form-group">
              <label>教科を選ぶ</label>
              <div className="subject-buttons">
                {SUBJECTS.map(subject => (
                  <button
                    key={subject}
                    className={`subject-btn ${selectedSubject === subject ? 'active' : ''}`}
                    style={{ 
                      backgroundColor: selectedSubject === subject 
                        ? SUBJECT_COLORS[subject] 
                        : 'transparent',
                      borderColor: SUBJECT_COLORS[subject]
                    }}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>時間を選ぶ</label>
              <div className="duration-buttons">
                {DURATION_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    className={`duration-btn ${selectedDuration === option.value ? 'active' : ''}`}
                    onClick={() => setSelectedDuration(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false)
                  setSelectedDay(null)
                }}
              >
                キャンセル
              </button>
              <button 
                className="save-btn"
                onClick={handleAddSchedule}
                disabled={getTotalDuration(selectedDay) + selectedDuration > 30}
              >
                追加する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}