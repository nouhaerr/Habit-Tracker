import { ref } from 'vue'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

const session = ref<Session | null>(null)
const ready = ref(!supabase)
const authError = ref('')
let initialized = false

export function useAuth() {
  if (!initialized && supabase) {
    initialized = true
    // Keep this callback synchronous: Supabase holds an auth lock while calling it.
    supabase.auth.onAuthStateChange((_event, next) => {
      session.value = next
      ready.value = true
    })
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) authError.value = error.message
      session.value = data.session
      ready.value = true
    }).catch(() => {
      authError.value = 'Unable to restore your session. Please reload and try again.'
      ready.value = true
    })
  }
  async function signOut() {
    if (!supabase) return
    authError.value = ''
    const { error } = await supabase.auth.signOut()
    if (error) authError.value = error.message
  }
  return { session, ready, authError, signOut }
}
