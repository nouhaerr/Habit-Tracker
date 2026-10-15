import test from 'node:test'
import assert from 'node:assert/strict'
import { localDate, streaks } from '../src/lib/habitDates.ts'

test('uses the local calendar day rather than the UTC day', () => {
  const original = process.env.TZ
  process.env.TZ = 'Africa/Casablanca'
  try { assert.equal(localDate(new Date('2026-10-14T23:30:00Z')), '2026-10-15') }
  finally { if (original === undefined) delete process.env.TZ; else process.env.TZ = original }
})
test('a streak survives until the end of the day after its last completion', () => {
  const dates = ['2026-10-12', '2026-10-13', '2026-10-14']
  assert.deepEqual(streaks(dates, '2026-10-15'), { streak: 3, bestStreak: 3 })
  assert.deepEqual(streaks(dates, '2026-10-16'), { streak: 0, bestStreak: 3 })
})
test('keeps historical best streak, handles unsorted dates and duplicates', () => {
  assert.deepEqual(streaks(['2026-10-14', '2026-10-01', '2026-10-03', '2026-10-02', '2026-10-14'], '2026-10-15'), { streak: 1, bestStreak: 3 })
})
test('handles empty history and consecutive dates across month boundaries', () => {
  assert.deepEqual(streaks([], '2026-10-15'), { streak: 0, bestStreak: 0 })
  assert.deepEqual(streaks(['2026-09-30', '2026-10-01'], '2026-10-01'), { streak: 2, bestStreak: 2 })
})
