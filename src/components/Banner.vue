<template>
    <div class="banner">
      <div class="left-buttons">
        <router-link v-if="isAdmin" to="/accounts" class="menu-link">Account Management Portal</router-link>
        <router-link v-if="isAdmin" to="/users" class="menu-link">User Management Portal</router-link>
        <router-link v-if="!isAdmin" to="/accounts" class="menu-link">Account Management Portal</router-link>
        <router-link v-if="!isAdmin" to="/transactions" class="menu-link">View Transactions</router-link>
      </div>
      <div class="right-buttons">
        <button class="action-button" @click="logout">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isAdmin: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      logout() {
        // Replace this with your logout logic
        console.log("User logged out");
        // For example, you might call a Vuex action to handle logout
        // this.$store.dispatch('logoutAction');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles for the banner here */
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ffc0cb; /* Banner background color */
    color: #333; /* Banner text color */
  }
  
  .left-buttons {
    display: flex;
    gap: 10px; /* Add spacing between buttons */
  }
  
  .menu-link {
    text-decoration: none;
    color: #fff; /* White text color */
    font-size: 1rem;
    transition: color 0.3s; /* Add a smooth transition effect for color changes */
  }
  
  .menu-link:hover {
    color: #ff69b49e; /* Change the hover color as needed */
  }
  
  .right-buttons {
    display: flex;
  }
  
  .action-button {
    text-decoration: none;
    color: #fff; /* White text color */
    background-color: #ff69b47f; /* Hot Pink Button Color */
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s; /* Add smooth transition effects for color changes */
  }
  
  .action-button:hover {
    background-color: #ff69b4; /* Change the hover color as needed */
    color: #fff; /* Adjust text color on hover */
  }
  </style>
  