<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="links">Go Links</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item v-if="auth.isAuthenticated()" to="dashboard">Dashboard</b-nav-item>
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

.input-group-btn:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
  height: 100%;
}
.loader {
  margin: 0 auto;
  text-align: center;
  position: fixed;
  top: 30%;
  left: 50%;
}

.inlineLoader {
  margin: 0 auto;
  text-align: center;
}

.orbit-spinner {
  margin: 0 auto;
}

.orbit-spinner * {
  box-sizing: border-box;
}

.orbit-spinner {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  perspective: 800px;
}

.orbit-spinner .orbit {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
  left: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
  border-bottom: 3px solid #ff1d5e;
}

.orbit-spinner .orbit:nth-child(2) {
  right: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
  border-right: 3px solid #2c1dff;
}

.orbit-spinner .orbit:nth-child(3) {
  right: 0%;
  bottom: 0%;
  animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
  border-top: 3px solid #9dff1d;
}

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
