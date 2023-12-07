<template>
  <div class="login-page">
    <div class="login-form">
      <h1 class="pretty-font">Login to IE Bank</h1>
      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="loginDetails.email" required>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="loginDetails.password" required>
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
      loginDetails: {
        email: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    RESTlogin(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/login`;
      axios
        .post(path, payload)
        .then((response) => {
          const is_admin = response.data.is_admin;
          if (is_admin) {
            this.$router.push('/admin');
          } else {
            this.$router.push('/menu');
          }
        })
        .catch((error) => {
          const status = error.response.status;
          if (status === 401) {
            this.errorMessage = 'Invalid Credentials';
          } else {
            this.errorMessage = 'Something went wrong. Please try again later.';
          }
        });
    },

    login() {
      const payload = {
        email: this.loginDetails.email,
        password: this.loginDetails.password,
      }
      this.RESTlogin(payload);
    },

    initForm() {
      this.loginDetails.email = "";
      this.loginDetails.password = "";
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
