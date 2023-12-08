<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Allert Message -->
          <b-alert v-if="showMessage" variant="success" show>{{
            message
          }}</b-alert>
          <!-- b-alert v-if="error" variant="danger" show>{{ error }}</b-alert-->

          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.account-modal
          >
            Create Account
          </button>
          <br /><br />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Account Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">Account Balance</th>
                <th scope="col">Account Currency</th>
                <th scope="col">Account Country</th>
                <th scope="col">Account Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.id">
                <td>{{ account.name }}</td>
                <td>{{ account.account_number }}</td>
                <td>{{ account.balance }}</td>
                <td>{{ account.currency }}</td>
                <td>{{ account.country }}</td>
                <td>
                  <span
                    v-if="account.status == 'Active'"
                    class="badge badge-success"
                    >{{ account.status }}</span
                  >
                  <span v-else class="badge badge-danger">{{
                    account.status
                  }}</span>
                </td>
                <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-info btn-sm"
                    v-b-modal.edit-account-modal
                    @click="editAccount(account)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="deleteAccount(account)"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    v-b-modal.transfer-modal
                    @click="moneyTransfer(account)"
                  >
                    Transfer Money
                  </button>
                </div>
              </td>
              </tr>
            </tbody>
          </table>
          <footer class="text-center">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>
      <b-modal
        ref="addAccountModal"
        id="account-modal"
        title="Create a new account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
            id="form-name-group"
            label="Account Name:"
            label-for="form-name-input"
          >
            <b-form-input
              id="form-name-input"
              type="text"
              v-model="createAccountForm.name"
              placeholder="Account Name"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-currency-group"
            label="Currency:"
            label-for="form-currency-input"
          >
            <b-form-input
              id="form-currency-input"
              type="text"
              v-model="createAccountForm.currency"
              placeholder="$ or €"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-country-group"
            label="Country:"
            label-for="form-country-input"
          >
            <b-form-input
              id="form-country-input"
              type="text"
              v-model="createAccountForm.country"
              placeholder="Country"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create Account-->
      <!-- Start of Modal for Edit Account-->
      <b-modal
        ref="editAccountModal"
        id="edit-account-modal"
        title="Edit the account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group
            id="form-edit-name-group"
            label="Account Name:"
            label-for="form-edit-name-input"
          >
            <b-form-input
              id="form-edit-name-input"
              type="text"
              v-model="editAccountForm.name"
              placeholder="Account Name"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-edit-currency-group"
            label="Currency:"
            label-for="form-edit-currency-input"
          >
            <b-form-input
              id="form-edit-currency-input"
              type="text"
              v-model="editAccountForm.currency"
              placeholder="$ or €"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Edit Account-->
      <!-- Start of Modal for Transfer Money-->
      <b-modal 
        ref="transferModal"
        id="transfer-modal" 
        title="Transfer Money"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitTransfer" class="w-100">
          <b-form-group 
            id="form-sender-account-number-group"
            label="Sender Account Number"
            label-for="form-sender-account-number-input"
          >
            <b-form-input 
              id="form-sender-account-number-input"
              type="text"
              v-model="transferForm.senderAccountNumber" 
              placeholder="Account Number"
              required 
              readonly 
            >
            </b-form-input>
          </b-form-group>

          <b-form-group 
            id="form-receiver-account-number-group"
            label="Receiving Account Number"
            label-for="form-receiver-account-number-input"
          >
            <b-form-input 
              id="form-receiver-account-number-input"
              type="text"
              v-model="transferForm.receiverAccountNumber" 
              placeholder="Account Number"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group 
            id="form-amount-group"
            label="Amount"
            label-for="form-amount-input"
          >
            <b-form-input 
              id="form-amount-input"
              v-model="transferForm.amount" 
              type="number" 
              placeholder="Amount"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Transfer</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Transfer Money-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AppAccounts",
  data() {
    return {
      accounts: [],
      createAccountForm: {
        name: "",
        currency: "",
        country:"",
      },
      editAccountForm: {
        id: "",
        name: "",
      },
      transferForm: {
        senderAccountNumber: '',
        senderAccountId: '',
        receiverAccountNumber: '',
        amount: 0,
      },
      showMessage: false,
      message: "",
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    //GET function
    RESTgetAccounts() {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      axios
        .get(path)
        .then((response) => {
          this.accounts = response.data.accounts;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // POST function
    RESTcreateAccount(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      axios
        .post(path, payload)
        .then((response) => {
          this.RESTgetAccounts();
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
    },

    // Update function
    RESTupdateAccount(payload, accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .put(path, payload)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Updated succesfully!";
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
    },

    // Delete account
    RESTdeleteAccount(accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .delete(path)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Deleted succesfully!";
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
    },
  
    RESTmoneyTransfer(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/transfer`;
      console.log(payload);
      axios.post(path, payload)
        .then((response) => {
          this.message = "Money Transfer successful!";
          this.showMessage = true;

          setTimeout(() => {
            this.showMessage = false;``
          }, 3000);

          this.RESTgetAccounts();
        })
        .catch((error) => {
          console.error(error);
          // Handle errors, update UI, etc.
          this.message = "Money Transfer failed. Please try again.";
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
    },


    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.createAccountForm.name = "";
      this.createAccountForm.currency = "";
      this.createAccountForm.country = "";
      this.editAccountForm.id = "";
      this.editAccountForm.name = "";
      this.transferForm.senderAccountNumber = "";
      this.transferForm.senderAccountId = "";
      this.transferForm.receiverAccountNumber = "";
      this.transferForm.amount = 0;
    },

    // Handle submit event for create account
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.addAccountModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.createAccountForm.name,
        currency: this.createAccountForm.currency,
        country: this.createAccountForm.country,
      };
      this.RESTcreateAccount(payload);
      this.initForm();
    },

    // Handle submit event for edit account
    onSubmitUpdate(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.editAccountModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.editAccountForm.name,
        currency: this.editAccountForm.currency,
      };
      this.RESTupdateAccount(payload, this.editAccountForm.id);
      this.initForm();
    },

    onSubmitTransfer(e) {
      e.preventDefault();
      this.$refs.transferModal.hide();
      const payload = {
        sender_account_id: this.transferForm.senderAccountId,
        receiver_account_number: this.transferForm.receiverAccountNumber,
        amount: this.transferForm.amount,
      }
      this.RESTmoneyTransfer(payload);
      this.initForm();
    },

    // Handle edit button
    editAccount(account) {
      this.editAccountForm.id = account.id;
      this.editAccountForm.name = account.name;
      this.editAccountForm.currency = account.currency;
    },

    // Handle Delete button
    deleteAccount(account) {
      this.RESTdeleteAccount(account.id);
    },

    moneyTransfer(account) {
      this.transferForm.senderAccountId = account.id;
      this.transferForm.senderAccountNumber = account.account_number;
      console.log(this.transferForm.receiverAccountNumber);
    },
  },

  /***************************************************
   * LIFECYClE HOOKS
   ***************************************************/
  created() {
    this.RESTgetAccounts();
  },
};
</script>
