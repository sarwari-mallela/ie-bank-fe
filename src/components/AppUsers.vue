<template>
    <div class="jumbotron vertical-center">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1>Users</h1>
            <hr />
            <br />
            <!-- Alert Message -->
            <b-alert v-if="showMessage" variant="success" show>{{ message }}</b-alert>
  
            <button 
                type="button" 
                class="btn btn-success btn-sm" 
                v-b-modal.create-user-modal
            >
                Create User
            </button>

            <br /><br />
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Admin</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.created_at }}</td>
                  <td>{{ user.admin }}</td>
                  <td>
                    <div class="btn-group" role="group">
                        <button 
                            type="button" 
                            class="btn btn-primary btn-sm" 
                            v-b-modal.edit-user-modal
                            @click="editUser(user)"
                        > 
                            Edit
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-danger btn-sm" 
                            @click="deleteUser(user)"
                        >
                            Delete
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
        <!-- Edit User Modal -->
        <b-modal
            ref="editUserModal"
            id="edit-user-modal"
            title="Edit User"
            hide-backdrop
            hide-footer
        >
            <b-form @submit="onSubmitUpdate" class="w-100">
                <b-form-group
                    id="form-username-group"
                    label="Username:"
                    label-for="form-username-input"
                >
                    <b-form-input
                        id="form-username-input"
                        type="text"
                        v-model="editUserForm.username"
                        placeholder="Username"
                        required
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    id="form-email-group"
                    label="Email:"
                    label-for="form-email-input"
                >
                    <b-form-input
                        id="form-email-input"
                        type="email"
                        v-model="editUserForm.email"
                        placeholder="Email"
                        required
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    id="form-password-group"
                    label="Password:"
                    label-for="form-password-input"
                >
                    <b-form-input
                        id="form-password-input"
                        type="password"
                        v-model="editUserForm.password"
                        placeholder="Password"
                        required
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    id="form-admin-group"
                    label-for="form-admin-input"
                >
                    <b-form-checkbox
                        id="form-admin-input"
                        v-model="editUserForm.admin"
                    >
                        Admin
                    </b-form-checkbox>
                </b-form-group>
                <b-button type="submit" variant="outline-info"> Edit </b-button>
            </b-form>
        </b-modal>
        <!-- Create User Modal -->
        <b-modal
            ref="createUserModal"
            id="create-user-modal"
            title="Create User"
            hide-backdrop
            hide-footer
        >
            <b-form @submit="onSubmit" class="w-100">
                <b-form-group
                    id="form-username-group"
                    label="Username:"
                    label-for="form-username-input"
                >
                    <b-form-input
                        id="form-username-input"
                        type="text"
                        v-model="createUserForm.username"
                        placeholder="Username"
                        required
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    id="form-email-group"
                    label="Email:"
                    label-for="form-email-input"
                >
                    <b-form-input
                        id="form-email-input"
                        type="email"
                        v-model="createUserForm.email"
                        placeholder="Email"
                        required
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    id="form-password-group"
                    label="Password:"
                    label-for="form-password-input"
                >
                    <b-form-input
                        id="form-password-input"
                        type="password"
                        v-model="createUserForm.password"
                        placeholder="Password"
                        required
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    id="form-admin-group"
                    label-for="form-admin-input"
                >
                    <b-form-checkbox
                        id="form-admin-input"
                        v-model="createUserForm.admin"
                    >
                        Admin
                    </b-form-checkbox>
                </b-form-group>
                <b-button type="submit" variant="outline-info"> Create </b-button>
            </b-form>
        </b-modal>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        users: [],
        createUserForm: {
            username: '',
            email: '',
            password: '',
            admin: false,
        },
        editUserForm: {
            id: '',
            username: '',
            email: '',
            password: '',
            admin: false,
        },
        showMessage: false,
        message: '',
      };
    },
    methods: {
      // Fetch users from the server
      RESTgetUsers() {
        const path = `${process.env.VUE_APP_ROOT_URL}/users`;
        axios
          .get(path)
          .then((response) => {
            this.users = response.data.users;
          })
          .catch((error) => {
            console.error(error);
          });
      },

      RESTcreateUser(payload) {
        const path = `${process.env.VUE_APP_ROOT_URL}/users`;
        axios
          .post(path, payload)
          .then((response) => {
            this.RESTgetUsers();

            this.message = response.data.message;

            this.showMessage = true;

            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetUsers();
          });
      },

      RESTupdateUser(payload, userId) {
        const path = `${process.env.VUE_APP_ROOT_URL}/users/${userId}`;
        axios
          .put(path, payload)
          .then((response) => {
            this.RESTgetUsers();
            console.log(response.data)
            this.message = 'User updated succesfully!';

            this.showMessage = true;

            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetUsers();
          });
      },

      RESTdeleteUser(userId) {
        const path = `${process.env.VUE_APP_ROOT_URL}/users/${userId}`;
        axios
          .delete(path)
          .then((response) => {
            this.RESTgetUsers();

            this.message = response.data.message;

            this.showMessage = true;

            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetUsers();
          });
      },

      /*********************************
       * * FORM MANAGEMENT
       * *******************************/

      // Initialize forms empty
      initForm() {
        this.createUserForm.username = '';
        this.createUserForm.email = '';
        this.createUserForm.password = '';
        this.createUserForm.admin = false;
        this.editUserForm.id = '';
        this.editUserForm.username = '';
        this.editUserForm.email = '';
        this.editUserForm.password = '';
        this.editUserForm.admin = false;
      },

      // Handle submit for create user
      onSubmit(e) {
        e.preventDefault();
        this.$refs.createUserModal.hide();
        const payload = {
            username: this.createUserForm.username,
            email: this.createUserForm.email,
            password: this.createUserForm.password,
            admin: this.createUserForm.admin,
        }
        this.RESTcreateUser(payload);
        this.initForm();
      },

      onSubmitUpdate(e) {
        e.preventDefault();
        this.$refs.editUserModal.hide();
        const payload = {
            username: this.editUserForm.username,
            email: this.editUserForm.email,
            password: this.editUserForm.password,
            admin: this.editUserForm.admin,
        }
        this.RESTupdateUser(payload, this.editUserForm.id);
        this.initForm();
      },

      // Handle edit button
      editUser(user) {
        this.editUserForm.id = user.id;
        this.editUserForm.username = user.username;
        this.editUserForm.email = user.email;
        this.editUserForm.password = user.password;
        this.editUserForm.admin = user.admin;
      },

      // Handle delete button
      deleteUser(user) {
        this.RESTdeleteUser(user.id);
      },
    },

    /***************************************************
    * LIFECYClE HOOKS
    ***************************************************/
    created() {
      this.RESTgetUsers();
    },
  };
  </script>
  
<style scoped>
  .jumbotron {
    background-color: #6ccbc8; /* Blue Background Color */
    color: #ffffff; /* White Text Color */
    padding: 50px 0; /* Adjust the padding as needed */
  }
</style>