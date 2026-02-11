<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref(localStorage.getItem('username') || '')
const isLoggedIn = ref(!!username.value)

const updateAuth = () => {
  username.value = localStorage.getItem('username') || ''
  isLoggedIn.value = !!username.value
}

const logout = () => {
  localStorage.removeItem('username')
  updateAuth()
  window.dispatchEvent(new CustomEvent('auth-changed'))
  router.push('/')
}

onMounted(() => {
  window.addEventListener('auth-changed', updateAuth)
  window.addEventListener('cart-changed', () => {})
})
</script>

<template>
  <header class="header-section">
    <nav class="nav-section">
      <section class="logo-section">VodaCart</section>
      <section class="menu-section">
        <a href="/" class="link-item">Home</a>
        <a href="/cart" class="link-item">Cart</a>
        <a href="/checkout" class="link-item">Checkout</a>
        <a v-if="!isLoggedIn" href="/register" class="link-item">Register</a>
        <a v-if="!isLoggedIn" href="/login" class="link-item">Login</a>
        <div v-if="isLoggedIn" class="greeting">Hi, {{ username }}</div>
        <button v-if="isLoggedIn" class="logout-button" @click="logout">Logout</button>
      </section>
    </nav>
  </header>
</template>

<style scoped>
.header-section {
  background-color: #E60000;
  color: #FFFFFF;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  font-size: 1.5rem;
  font-weight: bold;
}

.menu-section {
  display: flex;
  gap: 1rem;
}

.link-item {
  color: #FFFFFF;
  text-decoration: none;
}

@media (max-width: 480px) {
  .menu-section {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (min-width: 768px) {
  .header-section {
    padding: 1.5rem;
  }
}
</style>