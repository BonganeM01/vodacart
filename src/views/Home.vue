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

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/category/electronics')
    products.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const handleAddToCart = (product) => {
  alert(`Added ${product.title} to cart!`)
  // Future: add to cart store / state
}

onMounted(() => {
  fetchProducts()
})
</script>

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