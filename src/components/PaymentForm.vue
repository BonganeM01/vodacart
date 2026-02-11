<template>
  <form class="payment-form-section" @submit.prevent="handleSubmit">
    <section class="input-section">
      <label for="cardNumber">Card Number:</label>
      <input id="cardNumber" v-model="cardNumber" type="text" required>
    </section>
    <section class="input-section">
      <label for="expiry">Expiry Date:</label>
      <input id="expiry" v-model="expiry" type="text" placeholder="MM/YY" required>
    </section>
    <section class="input-section">
      <label for="cvv">CVV:</label>
      <input id="cvv" v-model="cvv" type="text" required>
    </section>
    <section class="button-section">
      <button type="submit" class="pay-button">Pay Now</button>
    </section>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')

const emit = defineEmits(['pay'])

const handleSubmit = () => {
  emit('pay', {
    cardNumber: cardNumber.value,
    expiry: expiry.value,
    cvv: cvv.value
  })
}
</script>

<style scoped>
.payment-form-section {
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

.pay-button {
  background-color: #00B0CA;
  color: #FFFFFF;
  border: none;
  padding: 0.75rem;
  cursor: pointer;
}

@media (min-width: 768px) {
  .payment-form-section {
    max-width: 400px;
  }
}
</style>