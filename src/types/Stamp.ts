export interface Stamp {
  id: string
  date: string
  emoji: string
  message: string
}

export interface StampProgress {
  totalStamps: number
  currentStreak: number
  longestStreak: number
  lastStampDate: string | null
}

export const STAMP_EMOJIS = [
  '⭐', '🌟', '✨', '🌸', '🌺', '🌻', '🌈', '🦋', '🐣', '🐰',
  '🎀', '💎', '🍀', '🌙', '☀️', '🍓', '🍑', '🍰', '🧁', '💖'
]

export const MILESTONE_REWARDS = [
  { count: 7, message: '1週間達成！すごい！🎉', reward: '新しい背景テーマ解放' },
  { count: 14, message: '2週間継続！えらい！🌈', reward: '新しいキャラクター解放' },
  { count: 30, message: '1ヶ月達成！天才！✨', reward: 'スペシャルスタンプ解放' },
  { count: 50, message: '50日達成！レジェンド！👑', reward: 'レインボーテーマ解放' },
  { count: 100, message: '100日達成！マスター！🏆', reward: '全テーマ・キャラクター解放' }
]

export const getRandomStampEmoji = (): string => {
  return STAMP_EMOJIS[Math.floor(Math.random() * STAMP_EMOJIS.length)]
}

export const getEncouragementMessage = (): string => {
  const messages = [
    'がんばったね！えらい！',
    '今日もお疲れさま！',
    'すごい！継続は力なり！',
    'やったね！明日もがんばろう！',
    'きょうも一歩前進！',
    '素敵！勉強習慣が身についてる！',
    'ナイス！調子いいね！',
    'その調子！応援してるよ！'
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}