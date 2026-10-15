import test from 'node:test'
import assert from 'node:assert/strict'
import { scheduledOn, scheduledStreaks, dayProgress, monthDays } from '../src/lib/habitSchedule.ts'
const habit = (overrides = {}) => ({ createdAt: '2026-10-05', scheduledDays: [1, 3, 5], scheduleHistory: [], completedDates: [], ...overrides })

test('counts only scheduled weekdays after creation', () => {
  const h = habit()
  assert.equal(scheduledOn(h, '2026-10-02'), false)
  assert.equal(scheduledOn(h, '2026-10-05'), true)
  assert.equal(scheduledOn(h, '2026-10-06'), false)
})
test('rest days do not break a streak and today is not overdue', () => {
  const h = habit({ completedDates: ['2026-10-05', '2026-10-07', '2026-10-09'] })
  assert.deepEqual(scheduledStreaks(h, '2026-10-11'), { streak: 3, bestStreak: 3 })
  assert.deepEqual(scheduledStreaks(h, '2026-10-12'), { streak: 3, bestStreak: 3 })
  assert.deepEqual(scheduledStreaks(h, '2026-10-13'), { streak: 0, bestStreak: 3 })
})
test('a missed scheduled day breaks the run but keeps its historical best', () => {
  const h = habit({ completedDates: ['2026-10-05', '2026-10-07', '2026-10-12'] })
  assert.deepEqual(scheduledStreaks(h, '2026-10-13'), { streak: 1, bestStreak: 2 })
})
test('a schedule edit does not recalculate the past with new weekdays', () => {
  const h = habit({ scheduledDays: [2, 4], scheduleHistory: [
    { from: '2026-10-05', days: [1, 3, 5] }, { from: '2026-10-12', days: [2, 4] }
  ], completedDates: ['2026-10-05', '2026-10-07', '2026-10-09', '2026-10-13'] })
  assert.equal(scheduledOn(h, '2026-10-09'), true)
  assert.equal(scheduledOn(h, '2026-10-12'), false)
  assert.equal(scheduledOn(h, '2026-10-13'), true)
  assert.deepEqual(scheduledStreaks(h, '2026-10-14'), { streak: 4, bestStreak: 4 })
})
test('daily progress excludes rest-day habits and habits not yet created', () => {
  const habits = [habit({ completedDates: ['2026-10-05'] }), habit({ scheduledDays: [2] }), habit({ createdAt: '2026-10-10' })]
  assert.deepEqual(dayProgress(habits, '2026-10-05'), { total: 1, completed: 1, rate: 100 })
  assert.deepEqual(dayProgress([], '2026-10-05'), { total: 0, completed: 0, rate: 0 })
})
test('calendar uses Monday-first full weeks and handles leap February', () => {
  const leap = monthDays(2024, 1)
  assert.equal(leap.length % 7, 0)
  assert.deepEqual(leap.slice(0, 4), [null, null, null, '2024-02-01'])
  assert.equal(leap.filter(Boolean).length, 29)
  const feb = monthDays(2026, 1)
  assert.equal(feb[6], '2026-02-01')
  assert.equal(feb.filter(Boolean).length, 28)
  assert.equal(monthDays(2026, 11).includes('2026-12-31'), true)
})

test('future completions do not inflate a current streak', () => {
  const h = habit({ completedDates: ['2026-10-05', '2026-10-07', '2026-10-09'] })
  assert.deepEqual(scheduledStreaks(h, '2026-10-07'), { streak: 2, bestStreak: 2 })
})
test('a new habit scheduled only on Sundays is due on Sunday', () => {
  const h = habit({ createdAt: '2026-10-10', scheduledDays: [0] })
  assert.equal(scheduledOn(h, '2026-10-10'), false)
  assert.equal(scheduledOn(h, '2026-10-11'), true)
})
