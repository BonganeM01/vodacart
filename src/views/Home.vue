<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])

const fetchProducts = async () => {
  try {
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    const response = await axios.get(`${base}/api/products`)
    products.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const handleAddToCart = (product) => {
  try {
    const raw = localStorage.getItem('cart') || '[]'
    const current = JSON.parse(raw)
    const existing = current.find(p => p.id === product.id)
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1
    } else {
      current.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(current))
    alert(`Added ${product.title} to cart!`)
    window.dispatchEvent(new CustomEvent('cart-changed'))
  } catch (err) {
    console.error('Failed to add to cart', err)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <main class="home-main-section">
    <section class="hero-section">
      <h1>Welcome to VodaCart</h1>
      <p>Shop the best electronics!</p>
    </section>
    <section class="products-section">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </section>
  </main>
</template>

<style scoped>
.home-main-section {
  padding: 1rem;
}

.hero-section {
  text-align: center;
  background-color: #CCCCCC;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.products-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .products-section {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>