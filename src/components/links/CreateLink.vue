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
          <span style="font-weight: bold; font-size: large;">Create Link</span>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="4">
          <b-row>
            <b-col>
              <b-input-group left="Link Name">
                <b-form-input left="Link Name" v-model="createLinkInput.name" type="text" placeholder="Link Name"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="6">
          <b-row>
            <b-col>
              <b-input-group left="URL">
                <b-form-input left="URL" v-model="createLinkInput.url" type="text" placeholder="URL" autofocus></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="2">
          <b-btn size="sm" v-on:click="createLink()" type="submit" variant="primary">Create and Go</b-btn>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div style="text-align: center;">
            <br /> Visit the
            <b-link to="links">Links</b-link> page for more advanced creation features
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import LinkService from '@/services/LinkService'
const linkService = new LinkService()
export default {
  data() {
    return {
      createLinkInput: { name: null, url: null },
      alerts: [],
      isLoading: false
    }
  },
  created() {
    this.createLinkInput.name = this.$route.query.name
    if (this.$route.query.nogo) {
      this.$alert.addAlert(
        this.alerts,
        'warning',
        `Go Link with name "${
          this.createLinkInput.name
        }" does not exist, create it below`
      )
    }
  },
  methods: {
    createLink() {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      linkService.createLink(
        this.createLinkInput,
        response => {
          if (response.data.successful) {
            location.href = response.data.results.url
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
