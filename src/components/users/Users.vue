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
    <b-row>
      <b-col>
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
              <span style="font-weight: bold; font-size: large;">Users</span>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col xs="12" sm="3" md="2" lg="2">
              <span v-if="userTable.currentCount !== userTable.data.length">{{userTable.currentCount}}/</span>{{userTable.data.length}}&nbsp;User(s)</b-col>
            <b-col xs="12" sm="6" md="8" lg="4">
              <b-form-input v-model="userTable.filter" type="text" placeholder="User Filter"></b-form-input>
            </b-col>
            <b-col xs="12" sm="3" md="2" lg="2">
              <b-btn variant="primary" size="sm" v-on:click="clearAll()">Clear</b-btn>
            </b-col>
            <b-col xs="12" sm="12" md="12" lg="4">
              <b-pagination v-model="userTable.currentPage" :per-page="10" :total-rows="userTable.currentCount" align="right" size="md"></b-pagination>
            </b-col>
          </b-row>
          <b-table dark striped hover bordered :items="userTable.data" :fields="userTable.fields" :current-page="userTable.currentPage" :per-page="10" :filter="userTable.filter" @filtered="onFiltered">
            <template slot="active" slot-scope="data">
              {{data.value | yesno}}
            </template>
            <template slot="action" slot-scope="data">
              <b-btn v-if="!data.item.active" variant="success" size="sm" v-on:click="activateUser(data.item, true)">Activate</b-btn>
              <b-btn v-if="data.item.active" variant="warning" size="sm" v-on:click="activateUser(data.item, false)">Deactivate</b-btn>
              <b-btn variant="danger" size="sm" v-on:click="deleteUser(data.item)">Delete</b-btn>
              <b-btn v-if="data.item.roleList.indexOf('ADMIN') === -1" variant="info" size="sm" v-on:click="makeAdmin(data.item)">Make Admin</b-btn>
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UserService from '@/services/UserService'
const userService = new UserService()
export default {
  data() {
    return {
      userTable: {
        fields: [
          { key: 'username', sortable: true },
          { key: 'roleList', label: 'Roles' },
          'active',
          'action'
        ],
        data: [],
        filter: null,
        currentCount: 0,
        currentPage: 1
      },
      alerts: [],
      isLoading: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getUsers()
    })
  },
  methods: {
    getUsers() {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      userService.getAllUsers(this.handleGetUsers, this.handleError)
    },
    handleGetUsers({ data }) {
      this.handleResponse(data, () => {
        this.$alert.addAlertList(this.alerts, 'info', data.messageList)
        this.userTable.data = data.results
      })
    },
    deleteUser(user) {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      userService.deleteUser(
        user.username,
        this.handleDeleteUser,
        this.handleError
      )
    },
    handleDeleteUser({ data }) {
      this.handleResponse(data, () => {
        this.$alert.addAlertList(this.alerts, 'success', data.messageList)
        for (let i = 0; i < this.userTable.data.length; i++) {
          if (this.userTable.data[i].username === data.results.username) {
            this.userTable.data.splice(i, 1)
            break
          }
        }
      })
    },
    activateUser(user, isActive) {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      userService.activateUser(
        user.username,
        isActive,
        this.handleActivateUser,
        this.handleError
      )
    },
    handleActivateUser({ data }) {
      this.handleResponse(data, () => {
        this.$alert.addAlertList(this.alerts, 'success', data.messageList)
        for (let i = 0; i < this.userTable.data.length; i++) {
          if (this.userTable.data[i].username === data.results.username) {
            this.userTable.data.splice(i, 1, data.results)
            break
          }
        }
      })
    },
    makeAdmin(user) {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      userService.addRole(
        user.username,
        'ADMIN',
        this.handleMakeAdmin,
        this.handleError
      )
    },
    handleMakeAdmin({ data }) {
      this.handleResponse(data, () => {
        this.$alert.addAlertList(this.alerts, 'success', data.messageList)
        for (let i = 0; i < this.userTable.data.length; i++) {
          if (this.userTable.data[i].username === data.results.username) {
            this.userTable.data.splice(i, 1, data.results)
            break
          }
        }
      })
    },
    clearAll() {
      this.$alert.clearAlerts(this.alerts)
      this.userTable.filter = null
      this.onFiltered(this.userTable.data)
    },
    onFiltered(filteredItems) {
      this.userTable.currentCount = filteredItems.length
      this.userTable.currentPage = 1
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
  },
  filters: {
    yesno(value) {
      return value ? 'Yes' : 'No'
    }
  }
}
</script>
