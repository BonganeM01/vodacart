<template>
  <main class="checkout-main-section">
    <section class="form-section">
      <h2>Complete Your Payment</h2>
      <PaymentForm @pay="handlePayment" />
    </section>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PaymentForm from '../components/PaymentForm.vue'

const router = useRouter()

const handlePayment = (details) => {
  alert(`Payment processed with card: ${details.cardNumber}`)
  // In real app: send to payment gateway
  router.push('/')
}
</script>

<style scoped>
.checkout-main-section {
  padding: 2rem;
  text-align: center;
}

@media (min-width: 768px) {
  .checkout-main-section {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>