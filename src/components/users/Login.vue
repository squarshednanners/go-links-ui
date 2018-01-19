<template>
  <b-container>
    <b-row>
      <b-col>
        <div v-if="alerts.length">
          <br />
          <div v-for="alert of alerts" v-bind:key="alert.description">
            <b-alert v-if="alert.variant === 'primary'" dismissible variant="primary" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'secondary'" dismissible variant="secondary" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'success'" dismissible variant="success" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'danger'" dismissible variant="danger" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'warning'" dismissible variant="warning" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'info'" dismissible variant="info" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'light'" dismissible variant="light" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'dark'" dismissible variant="dark" show>{{alert.description}}</b-alert>
          </div>
        </div>
      </b-col>
    </b-row>
    <div v-if="isLoading">
      <b-row>
        <b-col offset="5" cols="2">
          <div class="loader"></div>
        </b-col>
      </b-row>
    </div>
    <div v-if="!isLoading">
      <br />
      <b-row>
        <b-col>
          <span style="font-weight: bold; font-size: large;">Sign In</span>
        </b-col>
      </b-row>
      <form>
        <br />
        <b-row>
          <b-col>
            <b-input-group left="Username">
              <b-form-input v-model="loginUserInput.username" type="text" placeholder="Email Address" autofocus></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-input-group left="Password">
              <b-form-input v-model="loginUserInput.password" type="password" placeholder="Password"></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-btn size="sm" v-on:click="login()" type="submit" variant="primary">Login</b-btn>
          </b-col>
        </b-row>
      </form>
      <b-row>
        <b-col>
          <div style="text-align: center;">
            <br /> Don't have an account?
            <b-link to="createUser">Register</b-link>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import AuthService from '@/services/AuthService'
const authService = new AuthService()
export default {
  data() {
    return {
      loginUserInput: { username: null, password: null },
      alerts: [],
      isLoading: false
    }
  },
  created() {
    if (this.$route.query.redirect) {
      this.$alert.addAlert(this.alerts, 'warning', 'Please login to continue')
    }
  },
  methods: {
    login() {
      this.$alert.clearAlerts(this.alerts)
      this.isLoading = true
      authService.login(
        this.loginUserInput,
        () => {
          this.isLoading = false
          this.$router.push('/links')
        },
        e => {
          this.$alert.addError(this.alerts, e)
          this.isLoading = false
        }
      )
    },
    clearCreateInput() {
      this.loginUserInput.username = null
      this.loginUserInput.password = null
    }
  }
}
</script>
