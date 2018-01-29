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
          <div class="loader">
            <div class="orbit-spinner">
              <div class="orbit"></div>
              <div class="orbit"></div>
              <div class="orbit"></div>
            </div>
            Please Wait
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-if="!isLoading">
      <br />
      <b-row>
        <b-col>
          <span style="font-weight: bold; font-size: large;">Logs</span>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col xs="12" sm="3" md="2" lg="2">
          <span v-if="logTable.currentCount !== logTable.data.length">{{logTable.currentCount}}/</span>{{logTable.data.length}}&nbsp;Log(s)</b-col>
        <b-col xs="12" sm="6" md="8" lg="4">
          <b-form-input v-model="logTable.filter" type="text" placeholder="Log Filter"></b-form-input>
        </b-col>
        <b-col xs="12" sm="3" md="2" lg="2">
          <b-btn variant="primary" size="sm" v-on:click="clearAll()">Clear</b-btn>
        </b-col>
        <b-col xs="12" sm="12" md="12" lg="4">
          <b-pagination v-model="logTable.currentPage" :per-page="10" :total-rows="logTable.currentCount" align="right" size="md"></b-pagination>
        </b-col>
      </b-row>
      <b-table dark striped hover bordered :items="logTable.data" :fields="logTable.fields" :current-page="logTable.currentPage" :per-page="10" :filter="logTable.filter" @filtered="onFiltered">
        <template slot="time" slot-scope="data">
          {{data.value | time}}
        </template>
        <template slot="action" slot-scope="data">
          {{data.value | camel}}
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import LogService from '@/services/LogService'
import moment from 'moment'
const logService = new LogService()
export default {
  data() {
    return {
      logTable: {
        fields: [
          { key: 'username', sortable: true },
          { key: 'linkName', sortable: true },
          { key: 'time', sortable: true },
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
    this.$nextTick(() => {
      this.getLogs()
    })
  },
  methods: {
    getLogs() {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      logService.getAllLogs(
        response => {
          if (response.data.successful) {
            this.$alert.addAlertList(
              this.alerts,
              'info',
              response.data.messageList
            )
            this.logTable.data = response.data.results
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
    },
    clearAll() {
      this.$alert.clearAlerts(this.alerts)
      this.logTable.filter = null
      this.onFiltered(this.logTable.data)
    },
    onFiltered(filteredItems) {
      this.logTable.currentCount = filteredItems.length
      this.logTable.currentPage = 1
    }
  },
  filters: {
    time(value) {
      return moment(value).format('MM/DD/YYYY hh:mm')
    },
    camel(value) {
      let lowercase = value.toLowerCase()
      return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
    }
  }
}
</script>
