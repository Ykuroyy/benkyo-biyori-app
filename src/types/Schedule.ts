export interface ScheduleItem {
  id: string
  dayOfWeek: DayOfWeek
  subject: Subject
  duration: number // 分単位
  completed: boolean
}

export type DayOfWeek = '月' | '火' | '水' | '木' | '金' | '土' | '日'

export type Subject = '英語' | '数学' | '国語' | '理科' | '社会' | '読書' | 'その他'

export const DAYS_OF_WEEK: DayOfWeek[] = ['月', '火', '水', '木', '金', '土', '日']

export const SUBJECTS: Subject[] = ['英語', '数学', '国語', '理科', '社会', '読書', 'その他']

export const SUBJECT_COLORS: Record<Subject, string> = {
  '英語': 'var(--color-primary-pink)',
  '数学': 'var(--color-primary-blue)',
  '国語': 'var(--color-primary-mint)',
  '理科': 'var(--color-primary-peach)',
  '社会': 'var(--color-primary-lavender)',
  '読書': 'var(--color-accent-info)',
  'その他': 'var(--color-text-secondary)'
}

export const DURATION_OPTIONS = [
  { value: 5, label: '5分' },
  { value: 10, label: '10分' },
  { value: 15, label: '15分' },
  { value: 20, label: '20分' },
  { value: 25, label: '25分' },
  { value: 30, label: '30分' }
]