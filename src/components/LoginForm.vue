<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const emit = defineEmits(['login'])

const handleSubmit = () => {
  emit('login', { username: username.value, password: password.value })
}
</script>

<template>
  <form class="login-form-section" @submit.prevent="handleSubmit">
    <section class="input-section">
      <label for="email">Email:</label>
      <input id="email" v-model="username" type="email" required>
    </section>
    <section class="input-section">
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required>
    </section>
    <section class="button-section">
      <button type="submit" class="login-button">Login</button>
    </section>
  </form>
</template>

<style scoped>
.login-form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
}

.input-section {
  display: flex;
  flex-direction: column;
}

input {
  padding: 0.5rem;
  border: 1px solid #CCCCCC;
}

.login-button {
  background-color: #E60000;
  color: #FFFFFF;
  border: none;
  padding: 0.75rem;
  cursor: pointer;
}

@media (min-width: 768px) {
  .login-form-section {
    max-width: 400px;
  }
}
</style>