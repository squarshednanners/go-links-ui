<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="links">Go Links</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item v-if="auth.isAuthenticated()" to="links">Links</b-nav-item>
          <b-nav-item v-if="auth.isAdmin()" to="users">Users</b-nav-item>
          <b-nav-item v-if="auth.isAdmin()" to="logs">Logs</b-nav-item>
          <b-nav-item to="faq">FAQ</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form v-if="auth.isAuthenticated()">
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Link Name" v-model="linkName" />
            <b-button size="sm" class="my-2 my-sm-0" v-on:click="searchLink()" v-if="['Links'].indexOf($route.name) === -1" variant="outline-primary">Search</b-button>&nbsp;
            <b-button size="sm" class="my-2 my-sm-0" v-on:click="createLink()" v-if="['CreateLink'].indexOf($route.name) === -1" variant="outline-secondary">Create</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <span v-if="auth.isAuthenticated()">
                <em>{{auth.getUsername()}}</em>
              </span>
              <span v-if="!auth.isAuthenticated()">
                <em>User</em>
              </span>

            </template>
            <b-dropdown-item v-if="auth.isAuthenticated()" to="account">Account</b-dropdown-item>
            <b-dropdown-item v-if="auth.isAuthenticated()" href="#" @click="logout()">Logout</b-dropdown-item>
            <b-dropdown-item v-if="!auth.isAuthenticated()" to="login">Login</b-dropdown-item>
            <b-dropdown-item v-if="!auth.isAuthenticated()" to="createUser">Register</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
const authService = new AuthService()
export default {
  name: 'goLinks',
  data() {
    return {
      auth: authService,
      linkName: null
    }
  },
  methods: {
    logout() {
      authService.resetUser()
      this.$router.push('Login')
    },
    searchLink() {
      this.$router.push({
        name: 'Links',
        query: { name: this.linkName }
      })
      this.resetLinkName()
    },
    createLink() {
      this.$router.push({
        name: 'CreateLink',
        query: { name: this.linkName }
      })
      this.resetLinkName()
    },
    resetLinkName() {
      this.linkName = null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}

.loader {
  border-top: 16px solid blue;
  border-right: 16px solid green;
  border-bottom: 16px solid red;
  border-left: 16px solid pink;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.input-group-btn:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
  height: 100%;
}
</style>
