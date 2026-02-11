<template>
  <article class="product-card-section">
    <section class="image-section">
      <img :src="product.image" alt="Product Image" class="product-image">
    </section>
    <section class="details-section">
      <h3 class="title">{{ product.title }}</h3>
      <p class="price">R {{ product.price }}</p>
      <button class="add-to-cart" @click="emit('add-to-cart', product)">
        Add to Cart
      </button>
    </section>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])
</script>

<style scoped>
.product-card-section {
  border: 1px solid #CCCCCC;
  border-radius: 8px;
  padding: 1rem;
  background-color: #FFFFFF;
  margin-bottom: 1rem;
}

.image-section {
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.details-section {
  margin-top: 1rem;
}

.title {
  font-size: 1.2rem;
  color: #4A4D4E;
}

.price {
  font-weight: bold;
  color: #E60000;
}

.add-to-cart {
  background-color: #00B0CA;
  color: #FFFFFF;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.product-card-section {
  width: 100%;
}

@media (min-width: 768px) {
  .product-card-section {
    width: 30%;
  }
}
</style>