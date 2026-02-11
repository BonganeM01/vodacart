<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cart = ref([])

const loadCart = () => {
  try {
    cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
  } catch (e) {
    cart.value = []
  }
}

const removeItem = (id) => {
  cart.value = cart.value.filter(i => i.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const proceedToCheckout = () => {
  // ensure checkout has access to cart via localStorage
  router.push('/checkout')
}

onMounted(() => {
  loadCart()
})
</script>

<template>
  <main class="cart-main">
    <h2>Your Cart</h2>
    <section v-if="cart.length === 0">Your cart is empty.</section>
    <section v-else class="cart-list">
      <article v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.image" alt="" class="cart-image" />
        <div class="cart-info">
          <h3>{{ item.title }}</h3>
          <p>R {{ item.price }}</p>
        </div>
        <div class="cart-actions">
          <button @click="removeItem(item.id)">Remove</button>
        </div>
      </article>
      <div class="cart-footer">
        <button @click="proceedToCheckout">Proceed to Checkout</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.cart-main { padding: 1rem; text-align: center }
.cart-list { display: flex; flex-direction: column; gap: 1rem; align-items: center }
.cart-item { display: flex; gap: 1rem; align-items: center; width: 100%; max-width: 800px; border: 1px solid #ddd; padding: 0.5rem; border-radius: 6px }
.cart-image { width: 80px; height: auto }
.cart-info { flex: 1; text-align: left }
.cart-actions { display:flex; gap: 0.5rem }
.cart-footer { margin-top: 1rem }
</style>
