<script setup>
</script>

<template>
  <header class="header-section">
    <nav class="nav-section">
      <section class="logo-section">VodaCart</section>
      <section class="menu-section">
        <a href="/" class="link-item">Home</a>
        <a href="/login" class="link-item">Login</a>
        <a href="/checkout" class="link-item">Checkout</a>
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