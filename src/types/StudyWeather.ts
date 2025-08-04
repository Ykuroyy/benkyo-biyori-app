export interface StudyWeather {
  id: string
  mood: 'sunny' | 'cloudy' | 'rainy' | 'rainbow' | 'starry'
  message: string
  emoji: string
  color: string
  motivationLevel: 1 | 2 | 3 | 4 | 5
}

export const STUDY_WEATHER_DATA: StudyWeather[] = [
  {
    id: 'sunny-1',
    mood: 'sunny',
    message: 'やる気の太陽が輝いてるよ！☀️',
    emoji: '☀️',
    color: 'var(--color-primary-peach)',
    motivationLevel: 5
  },
  {
    id: 'sunny-2',
    mood: 'sunny',
    message: '今日は勉強日和！がんばろう！🌻',
    emoji: '🌻',
    color: 'var(--color-primary-peach)',
    motivationLevel: 5
  },
  {
    id: 'cloudy-1',
    mood: 'cloudy',
    message: 'やる気のそよ風がふいてるよ☁️',
    emoji: '☁️',
    color: 'var(--color-primary-blue)',
    motivationLevel: 3
  },
  {
    id: 'cloudy-2',
    mood: 'cloudy',
    message: 'のんびりペースでも大丈夫🌤️',
    emoji: '🌤️',
    color: 'var(--color-primary-blue)',
    motivationLevel: 3
  },
  {
    id: 'rainy-1',
    mood: 'rainy',
    message: 'ちょっと休憩してもいいかも🌧️',
    emoji: '🌧️',
    color: 'var(--color-primary-lavender)',
    motivationLevel: 2
  },
  {
    id: 'rainy-2',
    mood: 'rainy',
    message: '無理しないで、ゆっくりいこう☔',
    emoji: '☔',
    color: 'var(--color-primary-lavender)',
    motivationLevel: 1
  },
  {
    id: 'rainbow-1',
    mood: 'rainbow',
    message: 'がんばった後は虹が出るよ！🌈',
    emoji: '🌈',
    color: 'var(--color-primary-mint)',
    motivationLevel: 4
  },
  {
    id: 'rainbow-2',
    mood: 'rainbow',
    message: '今日もきっと素敵な1日に！✨',
    emoji: '✨',
    color: 'var(--color-primary-mint)',
    motivationLevel: 4
  },
  {
    id: 'starry-1',
    mood: 'starry',
    message: '夜でも星が応援してるよ⭐',
    emoji: '⭐',
    color: 'var(--color-primary-lavender)',
    motivationLevel: 3
  },
  {
    id: 'starry-2',
    mood: 'starry',
    message: '静かな夜は集中タイム🌙',
    emoji: '🌙',
    color: 'var(--color-primary-lavender)',
    motivationLevel: 4
  }
]