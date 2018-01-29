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
          <span style="font-weight: bold; font-size: large;">Change Password</span>
        </b-col>
      </b-row>
      <form>
        <br />
        <b-row>
          <b-col>
            <b-input-group left="New Password">
              <b-form-input v-model="newPassword" type="password" placeholder="Password" autofocus />
            </b-input-group>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-btn size="sm" v-on:click="changePassword()" type="submit" variant="primary">Change Password</b-btn>
          </b-col>
        </b-row>
      </form>
    </div>
  </b-container>
</template>

<script>
import UserService from '@/services/UserService'
const userService = new UserService()
export default {
  data() {
    return {
      newPassword: null,
      alerts: [],
      isLoading: false
    }
  },
  methods: {
    changePassword() {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      userService.changePassword(
        this.newPassword,
        response => {
          if (response.data.successful) {
            this.$alert.addAlertList(
              this.alerts,
              'success',
              response.data.messageList
            )
            this.newPassword = null
          } else {
            this.$alert.addAlertList(
              this.alerts,
              'danger',
              response.data.messageList
            )
          }
          this.isLoading = false
        },
        e => {
          this.$alert.addError(this.alerts, e)
          this.isLoading = false
        }
      )
    }
  }
}
</script>

