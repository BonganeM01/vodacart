<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import RegisterForm from '../components/RegisterForm.vue'

const router = useRouter()

const handleRegister = async (credentials) => {
  try {
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    await axios.post(`${base}/api/register`, credentials)
    alert('Registration successful. Please log in.')
    router.push('/login')
  } catch (err) {
    console.error(err)
    alert(err?.response?.data?.error || 'Registration failed')
  }
}
</script>

<template>
  <main class="register-main-section">
    <section class="form-section">
      <h2>Create an Account</h2>
      <RegisterForm @register="handleRegister" />
    </section>
  </main>
</template>

<style scoped>
.register-main-section {
  padding: 2rem;
  text-align: center;
}

@media (min-width: 768px) {
  .register-main-section {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>