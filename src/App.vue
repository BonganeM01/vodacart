<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <main class="app-main">
    <Header />
    <router-view></router-view>
    <Footer />
  </main>
</template>

<style>
.app-main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #FFFFFF;
  color: #4A4D4E;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (min-width: 768px) {
  .app-main {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>