<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')

const emit = defineEmits(['register'])

const handleSubmit = () => {
  emit('register', { username: username.value, email: email.value, password: password.value })
}
</script>

<template>
  <form class="register-form-section" @submit.prevent="handleSubmit">
    <section class="input-section">
      <label for="username">Username:</label>
      <input id="username" v-model="username" type="text" required>
    </section>
    <section class="input-section">
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email">
    </section>
    <section class="input-section">
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required>
    </section>
    <section class="button-section">
      <button type="submit" class="register-button">Register</button>
    </section>
  </form>
</template>

<style scoped>
.register-form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
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

.register-button {
  background-color: #E60000;
  color: #FFFFFF;
  border: none;
  padding: 0.75rem;
  cursor: pointer;
}
</style>