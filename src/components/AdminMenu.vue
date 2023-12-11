<template>
  <div class="admin-menu">
    <h1 class="pretty-font">Admin Menu</h1>

    <div class="menu-options">
      <router-link class="action-button" to="/accounts">Account Management Portal</router-link>
      <router-link class="action-button" to="/users">Users Management Portal</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenu',
};
</script>

<style scoped>
.admin-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(192, 192, 255); /* Baby Pink Background */
  background-image: url("../../images/foto.jpg");
  background-size: 100%; /* Adjust the percentage as needed */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  background-position: center center; /* Center the image */
}

.menu-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
}

.pretty-font {
  font-family: 'Cursive', sans-serif; /* Choose an appropriate pretty font */
  font-size: 3rem;
  color: #fff; /* White Text Color */
}

.action-button {
  text-decoration: none;
  color: #fff; /* White Text Color */
  background-color: rgba(135, 105, 255, 0.498); /* Hot Pink Button Color */
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #ff69b4;
}
</style>
