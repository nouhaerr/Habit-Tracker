<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
defineProps<{ sessionError?: string }>()
const mode = ref<'signin' | 'signup'>('signin')
const email = ref('')
const password = ref('')
const busy = ref(false)
const error = ref('')
const message = ref('')
async function submit() {
  if (!supabase || busy.value) return
  busy.value = true
  error.value = ''
  message.value = ''
  try {
    const credentials = { email: email.value.trim(), password: password.value }
    const result = mode.value === 'signup'
      ? await supabase.auth.signUp({ ...credentials, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword(credentials)
    if (result.error) throw result.error
    if (mode.value === 'signup' && !result.data.session) message.value = 'Check your email to confirm your account, then sign in.'
    password.value = ''
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Unable to sign in. Please try again.'
  } finally { busy.value = false }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <p class="brand">🌿 HabitFlow</p>
      <p v-if="sessionError" class="error" role="alert">{{ sessionError }}</p>
      <template v-if="supabase">
        <h1>{{ mode === 'signin' ? 'Welcome back' : 'Create your account' }}</h1>
        <p class="intro">Keep your habits and progress with you on every device.</p>
        <form @submit.prevent="submit">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" autocomplete="email" required :disabled="busy" />
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" :autocomplete="mode === 'signup' ? 'new-password' : 'current-password'" :minlength="mode === 'signup' ? 8 : undefined" required :disabled="busy" />
          <p v-if="mode === 'signup'" class="hint">Use at least 8 characters.</p>
          <p v-if="error" class="error" role="alert">{{ error }}</p>
          <p v-if="message" role="status">{{ message }}</p>
          <button class="primary" :disabled="busy">{{ busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account' }}</button>
        </form>
        <button class="switch" :disabled="busy" @click="mode = mode === 'signin' ? 'signup' : 'signin'; error = ''; message = ''">
          {{ mode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in' }}
        </button>
      </template>
      <template v-else>
        <h1>Connect your database</h1>
        <p class="intro">Account storage has not been configured yet. Follow the database setup in this project's README, then restart the app.</p>
      </template>
    </section>
  </main>
</template>

<style scoped>
.auth-page { min-height: 100vh; min-height: 100dvh; display: grid; place-items: center; padding: 1.5rem; }
.auth-card { width: 100%; max-width: 440px; padding: clamp(1.25rem, 5vw, 2rem); border: 1px solid var(--beige-200); border-radius: var(--radius); background: var(--white); box-shadow: var(--shadow-md); }
.brand { font-weight: 700; color: var(--blue-600); margin-bottom: 1.5rem; font-size: 1.25rem; }
h1 { font-size: 1.5rem; line-height: 1.3; }
.intro { color: var(--text-secondary); margin: 0.75rem 0 1.5rem; }
form { display: flex; flex-direction: column; gap: 0.65rem; }
label { font-weight: 600; }
input { width: 100%; padding: 0.75rem; font-size: 16px; border: 1px solid var(--beige-300); border-radius: var(--radius-sm); }
button { min-height: 44px; border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.9rem; }
.primary { border: 0; color: white; background: var(--blue-600); margin-top: 0.75rem; }
.switch { border: 0; background: transparent; color: var(--blue-600); width: 100%; margin-top: 0.75rem; }
.error { color: #b91c1c; }
.hint { font-size: 0.8rem; color: var(--text-secondary); }
button:disabled { opacity: 0.6; cursor: wait; }
</style>
