import { useState, useEffect } from 'react'
import { 
  Stamp, 
  StampProgress, 
  getRandomStampEmoji, 
  getEncouragementMessage,
  MILESTONE_REWARDS 
} from '../types/Stamp'
import './StampBook.css'

export function StampBook() {
  const [stamps, setStamps] = useState<Stamp[]>([])
  const [progress, setProgress] = useState<StampProgress>({
    totalStamps: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastStampDate: null
  })
  const [showReward, setShowReward] = useState<string | null>(null)
  const [isStamping, setIsStamping] = useState(false)

  // localStorageから読み込み
  useEffect(() => {
    const savedStamps = localStorage.getItem('stamps')
    const savedProgress = localStorage.getItem('stampProgress')
    
    if (savedStamps) {
      setStamps(JSON.parse(savedStamps))
    }
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  // localStorageに保存
  useEffect(() => {
    localStorage.setItem('stamps', JSON.stringify(stamps))
    localStorage.setItem('stampProgress', JSON.stringify(progress))
  }, [stamps, progress])

  const canStampToday = () => {
    const today = new Date().toDateString()
    return !stamps.some(stamp => stamp.date === today)
  }

  const calculateStreak = (newStamps: Stamp[]) => {
    if (newStamps.length === 0) return { current: 0, longest: 0 }
    
    // 日付でソート（新しい順）
    const sortedStamps = [...newStamps].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    let currentStreak = 1
    let longestStreak = 1
    let tempStreak = 1
    
    for (let i = 1; i < sortedStamps.length; i++) {
      const prevDate = new Date(sortedStamps[i - 1].date)
      const currDate = new Date(sortedStamps[i].date)
      const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        tempStreak++
        if (i === 1) currentStreak = tempStreak
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 1
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak)
    
    return { current: currentStreak, longest: longestStreak }
  }

  const handleStamp = () => {
    if (!canStampToday()) return
    
    setIsStamping(true)
    
    const newStamp: Stamp = {
      id: `${Date.now()}`,
      date: new Date().toDateString(),
      emoji: getRandomStampEmoji(),
      message: getEncouragementMessage()
    }
    
    const newStamps = [...stamps, newStamp]
    const streaks = calculateStreak(newStamps)
    
    setStamps(newStamps)
    setProgress({
      totalStamps: newStamps.length,
      currentStreak: streaks.current,
      longestStreak: streaks.longest,
      lastStampDate: newStamp.date
    })
    
    // マイルストーン確認
    const milestone = MILESTONE_REWARDS.find(m => m.count === newStamps.length)
    if (milestone) {
      setTimeout(() => {
        setShowReward(milestone.message)
        setTimeout(() => setShowReward(null), 5000)
      }, 500)
    }
    
    setTimeout(() => setIsStamping(false), 1000)
  }

  const getMonthStamps = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const monthStamps = []
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day).toDateString()
      const stamp = stamps.find(s => s.date === date)
      monthStamps.push({ day, stamp })
    }
    
    return monthStamps
  }

  return (
    <div className="stamp-book">
      <h2>スタンプ帳 📖</h2>
      
      <div className="progress-section">
        <div className="progress-item">
          <span className="progress-label">合計スタンプ</span>
          <span className="progress-value">{progress.totalStamps}個</span>
        </div>
        <div className="progress-item">
          <span className="progress-label">連続記録</span>
          <span className="progress-value">{progress.currentStreak}日</span>
        </div>
        <div className="progress-item">
          <span className="progress-label">最長記録</span>
          <span className="progress-value">{progress.longestStreak}日</span>
        </div>
      </div>
      
      <div className="stamp-action">
        <button
          className={`stamp-button ${isStamping ? 'stamping' : ''}`}
          onClick={handleStamp}
          disabled={!canStampToday()}
        >
          {canStampToday() ? '今日の勉強完了！スタンプをもらう' : '今日はスタンプ済み✓'}
        </button>
      </div>
      
      <div className="calendar-section">
        <h3>今月のスタンプ</h3>
        <div className="stamp-calendar">
          {getMonthStamps().map(({ day, stamp }) => (
            <div 
              key={day} 
              className={`calendar-day ${stamp ? 'has-stamp' : ''}`}
            >
              <span className="day-number">{day}</span>
              {stamp && <span className="stamp-emoji">{stamp.emoji}</span>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="milestones-section">
        <h3>マイルストーン</h3>
        <div className="milestones">
          {MILESTONE_REWARDS.map(milestone => (
            <div 
              key={milestone.count}
              className={`milestone ${progress.totalStamps >= milestone.count ? 'achieved' : ''}`}
            >
              <span className="milestone-count">{milestone.count}日</span>
              <span className="milestone-reward">{milestone.reward}</span>
            </div>
          ))}
        </div>
      </div>
      
      {showReward && (
        <div className="reward-popup">
          <div className="reward-content">
            <h3>{showReward}</h3>
            <div className="fireworks">🎉🎊✨</div>
          </div>
        </div>
      )}
    </div>
  )
}