<script setup>
</script>

<template>
  <footer class="footer-section">
    <section class="copyright-section">&copy; 2026 VodaCart. All rights reserved.</section>
    <section class="links-section">
      <a href="#" class="link-item">Privacy</a>
      <a href="#" class="link-item">Terms</a>
    </section>
  </footer>
</template>

<style scoped>
.footer-section {
  background-color: #00B0CA;
  color: #FFFFFF;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}

.links-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.link-item {
  color: #FFFFFF;
  text-decoration: none;
}

@media (min-width: 768px) {
  .footer-section {
    padding: 1.5rem;
  }
}
</style>