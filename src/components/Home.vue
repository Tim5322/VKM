<template>
  <div class="home-component">
    <!-- Dit component is verplaatst naar views/HomeView.vue -->
    <!-- De homepage content staat nu direct in HomeView.vue -->
    <p>Dit component is verplaatst naar HomeView. De homepage content staat nu direct in de view.</p>
  </div>
</template>

<style scoped>
.home-component {
  padding: 2rem;
  text-align: center;
  color: #666;
  background: #f9f9f9;
  border-radius: 8px;
  margin: 1rem;
}
</style>

<style scoped>
.homepage {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.register-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.info-section {
  margin-bottom: 3rem;
}

.info-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.info-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.info-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .homepage {
    padding: 1rem;
  }
}
</style>
