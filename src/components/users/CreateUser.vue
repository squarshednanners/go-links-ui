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
      <div class="loader">
        <div class="orbit-spinner">
          <div class="orbit"></div>
          <div class="orbit"></div>
          <div class="orbit"></div>
        </div>
        Please Wait
      </div>
    </div>
    <div v-if="!isLoading">
      <br />
      <b-row>
        <b-col>
          <span style="font-weight: bold; font-size: large;">Register</span>
        </b-col>
      </b-row>
      <form>
        <br />
        <b-row>
          <b-col>
            <b-input-group left="Username">
              <b-form-input v-model="createUserInput.username" type="text" placeholder="Email Address" autofocus></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-input-group left="Password">
              <b-form-input v-model="createUserInput.password" type="password" placeholder="Password"></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-btn size="sm" v-on:click="createUser()" type="submit" variant="primary">Register</b-btn>
          </b-col>
        </b-row>
      </form>
      <b-row>
        <b-col>
          <div style="text-align: center;">
            <br /> Already have an account?
            <b-link to="login">Login</b-link>
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
      createUserInput: { username: null, password: null },
      alerts: [],
      isLoading: false
    }
  },
  methods: {
    createUser() {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      authService.createUser(
        this.createUserInput,
        this.handleCreateUser,
        this.handleError
      )
    },
    handleCreateUser({ data }) {
      this.handleResponse(data, () => {
        this.$alert.addAlertList(this.alerts, 'success', data.messageList)
        if (!data.results.active) {
          this.$alert.addAlert(
            this.alerts,
            'info',
            'Before you are able to login, please contact an admin to have your account activated'
          )
        }
        this.clearCreateInput()
      })
    },
    clearCreateInput() {
      this.createUserInput.username = null
      this.createUserInput.password = null
    },
    handleResponse(data, successFunc) {
      if (data.successful) {
        successFunc()
      } else {
        this.handleBusinessError(data)
      }
      this.isLoading = false
    },
    handleBusinessError(data) {
      this.$alert.addAlertList(this.alerts, 'danger', data.messageList)
    },
    handleError(e) {
      this.$alert.addError(this.alerts, e)
      this.isLoading = false
    }
  }
}
</script>
