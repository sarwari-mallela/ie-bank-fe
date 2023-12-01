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
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Simulate a basic login logic (replace with your actual authentication logic)
      if (this.username === 'demo' && this.password === 'password') {
        // Successful login, navigate to accounts page
        this.$router.push('/accounts');
      } else {
        // Display an error message or handle authentication failure
        alert('Invalid credentials. Please try again.');
      }
    },
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
