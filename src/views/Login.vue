<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()

const handleLogin = (credentials) => {
  // In this demo we store the username locally to represent "logged in" state.
  localStorage.setItem('username', credentials.username)
  window.dispatchEvent(new CustomEvent('auth-changed'))
  alert(`Logged in with username: ${credentials.username}`)
  router.push('/')
}
</script>

<template>
  <main class="login-main-section">
    <section class="form-section">
      <h2>Login to Your Account</h2>
      <LoginForm @login="handleLogin" />
    </section>
  </main>
</template>

<style scoped>
.login-main-section {
  padding: 2rem;
  text-align: center;
}

@media (min-width: 768px) {
  .login-main-section {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>