<template>
  <v-container fluid class="pa-0 login-wrapper">
    <v-row no-gutters class="full-height">
      <v-col cols="12" md="6" class="left-section d-flex flex-column justify-center px-4 px-md-12">
        <div class="image-container fade-in">
          <v-img src="src/assets/images/gold.png" width="65" height="65" class="mr-3 logo-img" />
          <h2 class="font-weight-bold title-text">MICROSITE PLATFORM</h2>
        </div>

        <div class="margin-top ms-6 fade-in-delay">
          <h1 class="text-h4 text-md-h3 font-weight-bold mt-5 welcome-text">Welcome to<br />Microsite Platform</h1>
          <p class="text-body-1 text-md-body-1 mt-5 subtitle-text">Create your professional microsite in minutes</p>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="right-section d-flex justify-center align-center px-4 px-md-0">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.full-height {
  height: 100%;
}

.left-section {
  background: white;
  height: 100vh;
  position: relative;
}

.image-container {
  position: absolute;
  top: 50px;
  left: 70px;
  z-index: 1; 
}

.margin-top {
  margin-top: 70px;
}

.right-section {
  background: linear-gradient(135deg, #e8f0ff 0%, #f5f9ff 100%);
  height: 100vh;
}

h1,
h2,
p {
  color: #2b2b2b;
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

.fade-in-delay {
  animation: fadeIn 1s ease-in-out 0.5s both; 
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 959px) {
  .left-section {
    height: auto;
    min-height: 50vh;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .right-section {
    height: auto;
    min-height: 50vh;
  }

  .image-container {
    top: 30px;
    left: 40px;
  }

  .margin-top {
    margin-top: 30px;
  }

  .logo-img {
    width: 30px !important;
    height: 30px !important;
  }

  .title-text {
    font-size: 1.2rem !important;
  }

  .welcome-text {
    font-size: 1.8rem !important;
    line-height: 1.2;
  }

  .subtitle-text {
    font-size: 0.9rem !important;
  }
}

@media (max-width: 599px) {
  .left-section {
    min-height: 50vh;
  }

  .right-section {
    min-height: 50vh;
  }

  .welcome-text {
    font-size: 1.5rem !important;
  }

  .subtitle-text {
    font-size: 0.85rem !important;
  }
}
</style>