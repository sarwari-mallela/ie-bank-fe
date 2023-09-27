<template>
    <div class="home-page">
      <div class="welcome-text">
        <h1 class="pretty-font">Welcome to IE Bank</h1>
        <p>Your Trusted Banking Partner</p>
        <button @click="navigateToAccounts" class ="action-button">View/Create Accounts</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToAccounts() {
        this.$router.push('/accounts');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles for the HomePage.vue component */
  
  .home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffc0cb; /* Baby Pink Background */
  }
  
  .welcome-text {
    text-align: center;
    color: #fff; /* White Text Color */
    padding: 20px;
  }
  
  .pretty-font {
    font-family: 'Cursive', sans-serif; /* Choose an appropriate pretty font */
    font-size: 3rem;
  }
  
  .action-button {
    background-color: #ff69b47f; /* Hot Pink Button Color */
    color: #fff; /* White Text Color */
    border: none;
    padding: 10px 20px;
    font-size: 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #ff149147; /* Darker Pink on Hover */
  }
  </style>
  