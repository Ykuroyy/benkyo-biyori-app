import { useState, useEffect } from 'react'
import { 
  DiaryEntry, 
  MOOD_OPTIONS, 
  QUICK_MESSAGES,
  MoodType 
} from '../types/Diary'
import './StudyDiary.css'

export function StudyDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [content, setContent] = useState('')
  const [selectedMood, setSelectedMood] = useState<MoodType>('normal')
  const [showAllEntries, setShowAllEntries] = useState(false)

  // localStorageから読み込み
  useEffect(() => {
    const saved = localStorage.getItem('diaryEntries')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  // localStorageに保存
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries))
  }, [entries])

  const handleSave = () => {
    if (!content.trim()) return

    const newEntry: DiaryEntry = {
      id: `${Date.now()}`,
      date: new Date().toLocaleDateString('ja-JP'),
      content: content.trim(),
      mood: selectedMood,
      createdAt: new Date().toISOString()
    }

    setEntries([newEntry, ...entries])
    setContent('')
    setSelectedMood('normal')
    setIsWriting(false)
  }

  const handleQuickMessage = (message: string) => {
    setContent(content + (content ? ' ' : '') + message)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('このメモを削除しますか？')) {
      setEntries(entries.filter(e => e.id !== id))
    }
  }

  const recentEntries = showAllEntries ? entries : entries.slice(0, 3)

  return (
    <div className="study-diary">
      <h2>ひとことメモ 📝</h2>

      {!isWriting ? (
        <div className="diary-prompt">
          <button 
            className="write-button"
            onClick={() => setIsWriting(true)}
          >
            今日のメモを書く ✏️
          </button>
        </div>
      ) : (
        <div className="diary-editor">
          <div className="mood-selector">
            <p className="mood-label">今日の気分は？</p>
            <div className="mood-options">
              {MOOD_OPTIONS.map(mood => (
                <button
                  key={mood.type}
                  className={`mood-button ${selectedMood === mood.type ? 'selected' : ''}`}
                  style={{ 
                    borderColor: mood.color,
                    backgroundColor: selectedMood === mood.type ? mood.color : 'transparent'
                  }}
                  onClick={() => setSelectedMood(mood.type)}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-text">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="content-editor">
            <textarea
              className="diary-textarea"
              placeholder="今日の勉強はどうだった？"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={200}
            />
            <span className="char-count">{content.length}/200</span>
          </div>

          <div className="quick-messages">
            <p className="quick-label">よく使うメッセージ</p>
            <div className="quick-buttons">
              {QUICK_MESSAGES.map((message, index) => (
                <button
                  key={index}
                  className="quick-button"
                  onClick={() => handleQuickMessage(message)}
                >
                  {message}
                </button>
              ))}
            </div>
          </div>

          <div className="editor-actions">
            <button 
              className="cancel-button"
              onClick={() => {
                setIsWriting(false)
                setContent('')
                setSelectedMood('normal')
              }}
            >
              キャンセル
            </button>
            <button 
              className="save-button"
              onClick={handleSave}
              disabled={!content.trim()}
            >
              保存する
            </button>
          </div>
        </div>
      )}

      {entries.length > 0 && (
        <div className="diary-entries">
          <h3>最近のメモ</h3>
          {recentEntries.map(entry => {
            const mood = MOOD_OPTIONS.find(m => m.type === entry.mood)
            return (
              <div key={entry.id} className="diary-entry">
                <div className="entry-header">
                  <span className="entry-date">{entry.date}</span>
                  <div className="entry-mood" style={{ color: mood?.color }}>
                    <span className="mood-emoji">{mood?.emoji}</span>
                    <span className="mood-label">{mood?.label}</span>
                  </div>
                </div>
                <p className="entry-content">{entry.content}</p>
                <button
                  className="delete-entry"
                  onClick={() => handleDelete(entry.id)}
                  aria-label="削除"
                >
                  🗑️
                </button>
              </div>
            )
          })}
          
          {entries.length > 3 && (
            <button
              className="show-more-button"
              onClick={() => setShowAllEntries(!showAllEntries)}
            >
              {showAllEntries ? '閉じる' : `もっと見る (${entries.length - 3}件)`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}