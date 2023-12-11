<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Transaction History</h1>
          <hr />
          <br />

          <!-- Alert Message -->
          <b-alert v-if="showMessage" variant="success" show>{{ message }}</b-alert>

          <br /><br />
          <table class="table table-hover table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Transaction Amount</th>
                <th scope="col">Transaction Currency</th>
                <th scope="col">Transaction Date</th>
                <th scope="col">Account ID</th>
                <th scope="col">Destination Account ID</th>
                <!-- Add more headers as needed -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction.id">
                <td class="text-success">{{ transaction.amount }}</td>
                <td>{{ transaction.currency }}</td>
                <td>{{ transaction.created_at }}</td>
                <td class="text-info">{{ transaction.account_id }}</td>
                <td class="text-info">{{ transaction.destination_account_id }}</td>
                <!-- Add more cells as needed -->
              </tr>
            </tbody>
          </table>

          <footer class="text-center text-muted">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactions: [],
      showMessage: false,
      message: '',
    };
  },
  methods: {
    // Fetch transactions from the server
    RESTgetTransactions() {
      const path = `${process.env.VUE_APP_ROOT_URL}/transactions`;
      axios
        .get(path)
        .then((response) => {
          this.transactions = response.data.transactions;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  /***************************************************
   * LIFECYCLE HOOKS
   ***************************************************/
  created() {
    this.RESTgetTransactions();
  },
};
</script>

<style scoped>
/* Your additional styles here... */
</style>
<style scoped>
  .jumbotron {
    background-color: #8dd5d3; /* Blue Background Color */
    color: #ffffff; /* White Text Color */
    padding: 50px 0; /* Adjust the padding as needed */
  }
</style>