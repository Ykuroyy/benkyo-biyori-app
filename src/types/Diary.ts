export interface DiaryEntry {
  id: string
  date: string
  content: string
  mood: MoodType
  studyTime?: number // 分単位
  subjects?: string[]
  createdAt: string
}

export type MoodType = 'happy' | 'normal' | 'tired' | 'proud' | 'confused'

export interface MoodOption {
  type: MoodType
  emoji: string
  label: string
  color: string
}

export const MOOD_OPTIONS: MoodOption[] = [
  {
    type: 'happy',
    emoji: '😊',
    label: 'たのしい',
    color: 'var(--color-primary-pink)'
  },
  {
    type: 'normal',
    emoji: '😌',
    label: 'ふつう',
    color: 'var(--color-primary-blue)'
  },
  {
    type: 'tired',
    emoji: '😪',
    label: 'つかれた',
    color: 'var(--color-primary-lavender)'
  },
  {
    type: 'proud',
    emoji: '😤',
    label: 'がんばった',
    color: 'var(--color-primary-peach)'
  },
  {
    type: 'confused',
    emoji: '🤔',
    label: 'むずかしい',
    color: 'var(--color-primary-mint)'
  }
]

export const QUICK_MESSAGES = [
  '今日は集中できた！',
  'ちょっと難しかった',
  '楽しく勉強できた',
  '明日もがんばる',
  '新しいことを学んだ',
  'テスト対策した',
  '友達と一緒に勉強した',
  '計画通りにできた'
]