<template>
  <div class="login-page">
    <div class="login-form">
      <h1 class="pretty-font">Login to IE Bank</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>

        <button type="submit" class="action-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    RESTlogin(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/login`;
      axios
        .post(path, payload)
        .then((response) => {
          const success = response.success
          if (success){
            this.$router.push("/accounts")
          }
          // For message alert
          this.message = "Account Created succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    }
  },
};
</script>




<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffc0cb; /* Baby Pink Background */
}

.login-form {
  text-align: center;
  color: #fff; /* White Text Color */
  padding: 20px;
}

.pretty-font {
  font-family: 'Cursive', sans-serif; /* Choose an appropriate pretty font */
  font-size: 3rem;
}

.form-group {
  margin-bottom: 15px;
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
