<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()

const handleLogin = (credentials) => {
  alert(`Logged in with username: ${credentials.username}`)
  // In real app: authenticate → save token → redirect
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